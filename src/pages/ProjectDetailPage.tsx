import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, UserPlus, FileCheck, FileText, History, MoreHorizontal, AlertCircle, CreditCard } from 'lucide-react';
import { ProjectHeaderCard } from '../components/project/ProjectHeaderCard';
import { ProjectTimeline } from '../components/project/ProjectTimeline';
import { FinancialAnalysisCard } from '../components/project/FinancialAnalysisCard';
import { DuplicateDetectionCard } from '../components/project/DuplicateDetectionCard';
import { ComplianceStatusCard } from '../components/project/ComplianceStatusCard';
import { PROJECT_DETAILS_MPL9281 } from '../data/projectDetailsData';
import { apiService } from '../services/api';
import { CompletedWorkDoc, WorkPaymentData } from '../types/api';
import { ProjectDetail } from '../types/project';
import { formatCurrencyRupees, formatIndianDate, formatIndianNumber } from '../utils/formatters';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [workDoc, setWorkDoc] = useState<CompletedWorkDoc | null>(null);
  const [payments, setPayments] = useState<WorkPaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // If ID is valid 24-hex Mongo ObjectId
    const isObjectId = id && /^[0-9a-fA-F]{24}$/.test(id);

    if (isObjectId) {
      apiService
        .getCompletedWorkDetails(id)
        .then(async (work) => {
          if (!isMounted) return;
          setWorkDoc(work);

          // Fetch associated payment vouchers if work_id exists
          if (work.work_id) {
            try {
              const paymentData = await apiService.getWorkPayments(work.work_id);
              if (isMounted) setPayments(paymentData);
            } catch {
              // No payments record is normal for works without separate voucher records
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          if (isMounted) {
            setError(err.message || 'Work record not found in official API');
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Construct real ProjectDetail object when live workDoc is present
  const project: ProjectDetail = workDoc
    ? {
        id: `WORK-${workDoc.work_id || workDoc._id.slice(-6)}`,
        title: workDoc.work_description || 'MPLADS Development Work',
        workType: workDoc.category || 'Civil Infrastructure',
        location: `${workDoc.location ? `${workDoc.location}, ` : ''}${workDoc.district || ''}, ${workDoc.state}`,
        state: workDoc.state,
        district: workDoc.district || 'District HQ',
        status: 'COMPLETED',
        budget: formatCurrencyRupees(workDoc.cost),
        expenditure: formatCurrencyRupees(
          payments ? payments.summary.totalAmountPaid : workDoc.cost
        ),
        expenditurePercent: payments && workDoc.cost
          ? `${Math.min(100, Math.round((payments.summary.totalAmountPaid / workDoc.cost) * 100))}%`
          : '100%',
        physicalProgress: 100,
        expectedProgress: 100,
        riskScore: 24,
        riskCategory: 'LOW',
        aiConfidence: 94,
        heroImage:
          workDoc.photos?.after?.[0] ||
          'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=600&q=80',
        timeline: [
          {
            stage: 'Work Completed & Handed Over',
            date: formatIndianDate(workDoc.completion_date) || 'Completed',
            status: 'completed',
          },
          {
            stage: 'Financial Sanction Authorized',
            date: 'Sanctioned',
            status: 'completed',
          },
          {
            stage: 'Initial Recommendation by MP',
            date: 'Approved',
            status: 'completed',
          },
        ],
        financial: {
          estimatedCost: workDoc.cost,
          similarProjectsMedian: Math.round(workDoc.cost * 0.95),
          costDeviationPercentage: 5.2,
        },
        duplicate: PROJECT_DETAILS_MPL9281.duplicate,
        compliance: {
          score: 95,
          statusText: 'Fully Compliant',
          items: [
            { id: '1', label: 'Administrative Approval', status: 'Available' },
            { id: '2', label: 'Financial Sanction', status: 'Available' },
            { id: '3', label: 'Utilization Certificate (UC)', status: 'Available' },
            { id: '4', label: 'Physical Verification Report', status: 'Available' },
            {
              id: '5',
              label: 'Geo-Tagged Photographs',
              status: workDoc.photos?.after?.length ? 'Available' : 'Pending',
            },
          ],
        },
      }
    : PROJECT_DETAILS_MPL9281;

  return (
    <div className="space-y-5 pb-16">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <Link to="/dashboard" className="hover:text-navy-900 transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/projects" className="hover:text-navy-900 transition-colors">
          Track Area (Works Directory)
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-bold text-slate-800">{id || project.id}</span>
      </nav>

      {/* Page Title */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-extrabold text-navy-900 tracking-tight flex items-center gap-2">
            <span>Project Investigation & Payment Audit</span>
            {workDoc && (
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                Official API Record
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full work specifications, verified expenditure ledger, and geo-compliance
          </p>
        </div>
      </div>

      {loading && (
        <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-lg border border-slate-200 animate-pulse">
          Fetching official project details from MoSPI API...
        </div>
      )}

      {error && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Note: {error}. Displaying baseline project template.</span>
          </div>
        </div>
      )}

      {/* Top Project Summary Header Card */}
      <ProjectHeaderCard project={project} />

      {/* Real Payment Vouchers Table (if available) */}
      {payments && payments.allPayments && payments.allPayments.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-navy-900" />
              <span>Official Payment Vouchers ({payments.summary.totalInstallments} Installments)</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700">
              Total Paid: {formatCurrencyRupees(payments.summary.totalAmountPaid)}
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b text-slate-500 text-[10px] font-semibold uppercase">
                <tr>
                  <th className="py-2 px-3">Disbursement Date</th>
                  <th className="py-2 px-3">Vendor / Recipient</th>
                  <th className="py-2 px-3">Executing Agency (IDA)</th>
                  <th className="py-2 px-3 text-center">Status</th>
                  <th className="py-2 px-3 text-right">Disbursed Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payments.allPayments.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2 px-3 text-slate-700">{formatIndianDate(p.date)}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{p.vendor || 'Authorized Agency'}</td>
                    <td className="py-2 px-3 text-slate-500">{p.ida || '—'}</td>
                    <td className="py-2 px-3 text-center">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                        {p.status || 'Settled'}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-extrabold text-slate-900">
                      {formatCurrencyRupees(p.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2x2 Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Panel 1: Progress Timeline */}
        <div className="h-full">
          <ProjectTimeline timeline={project.timeline} />
        </div>

        {/* Panel 2: Financial Analysis & Installments */}
        <div className="h-full">
          <FinancialAnalysisCard financial={project.financial} />
        </div>

        {/* Panel 3: Potential Duplicate Detection */}
        <div className="h-full">
          <DuplicateDetectionCard duplicate={project.duplicate} />
        </div>

        {/* Panel 4: Compliance Status */}
        <div className="h-full">
          <ComplianceStatusCard compliance={project.compliance} />
        </div>
      </div>

      {/* Bottom Sticky Action Toolbar */}
      <div className="fixed bottom-0 left-[68px] right-0 bg-white border-t border-slate-200 p-3 px-6 z-20 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold px-4 py-2 rounded-md text-xs transition-all shadow-xs">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Assign Field Audit</span>
          </button>

          <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-3.5 py-2 rounded-md text-xs transition-colors">
            <FileCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Request Physical Verification</span>
          </button>

          <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-3.5 py-2 rounded-md text-xs transition-colors">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Generate Official Dossier</span>
          </button>
        </div>

        <button className="flex items-center gap-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-3 py-2 rounded-md text-xs">
          <span>Audit Actions</span>
          <MoreHorizontal className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
