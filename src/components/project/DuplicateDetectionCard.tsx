import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { DuplicateMatch } from '../../types/project';

interface DuplicateDetectionCardProps {
  duplicate: DuplicateMatch;
}

export const DuplicateDetectionCard: React.FC<DuplicateDetectionCardProps> = ({ duplicate }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
          3. Potential Duplicate Detection
        </h3>
        <span className="text-[10px] font-semibold text-slate-400 cursor-help" title="GIS and NLP similarity matching engine">ⓘ</span>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-11 gap-2 items-center my-2">
        {/* Current Project */}
        <div className="col-span-5 border border-slate-200 p-2 rounded bg-slate-50 text-xs space-y-1.5 flex flex-col justify-between h-full">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Current Project</span>
            <h4 className="font-bold text-slate-800 leading-tight">{duplicate.currentProject.name}</h4>
            <p className="text-[10px] text-slate-500">{duplicate.currentProject.location}</p>
            <div className="font-bold text-navy-900 mt-0.5">{duplicate.currentProject.amount}</div>
            <div className="text-[10px] text-slate-500">Length: {duplicate.currentProject.length}</div>
            <div className="text-[10px] text-slate-400">Sanctioned: {duplicate.currentProject.sanctionDate}</div>
          </div>
          {duplicate.currentProject.image && (
            <div className="h-16 rounded overflow-hidden border border-slate-200 mt-1">
              <img src={duplicate.currentProject.image} alt={duplicate.currentProject.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Similarity Badge */}
        <div className="col-span-1 flex flex-col items-center justify-center text-center">
          <div className="bg-red-50 border border-red-200 p-1 rounded text-center">
            <span className="text-[9px] font-bold text-red-600">Similarity</span>
            <div className="text-sm font-black text-red-700">{duplicate.similarityScore}%</div>
            <span className="text-[8px] font-extrabold text-red-600 block">HIGH MATCH</span>
          </div>
        </div>

        {/* Similar Project */}
        <div className="col-span-5 border border-slate-200 p-2 rounded bg-slate-50 text-xs space-y-1.5 flex flex-col justify-between h-full">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Similar Project</span>
            <h4 className="font-bold text-slate-800 leading-tight">{duplicate.similarProject.name}</h4>
            <p className="text-[10px] text-slate-500">{duplicate.similarProject.location}</p>
            <div className="font-bold text-navy-900 mt-0.5">{duplicate.similarProject.amount}</div>
            <div className="text-[10px] text-slate-500">Length: {duplicate.similarProject.length}</div>
            <div className="text-[10px] text-slate-400">Sanctioned: {duplicate.similarProject.sanctionDate}</div>
          </div>
          {duplicate.similarProject.image && (
            <div className="h-16 rounded overflow-hidden border border-slate-200 mt-1">
              <img src={duplicate.similarProject.image} alt={duplicate.similarProject.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Similarity Factors */}
      <div className="space-y-1 bg-slate-50 p-2 rounded border border-slate-100 text-[11px]">
        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Similarity Factors</span>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <div className="flex justify-between font-medium">
              <span>Location</span>
              <span className="font-bold text-red-600">{duplicate.similarityFactors.location}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1 mt-0.5">
              <div className="bg-red-500 h-1 rounded-full" style={{ width: `${duplicate.similarityFactors.location}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between font-medium">
              <span>Description</span>
              <span className="font-bold text-amber-600">{duplicate.similarityFactors.description}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1 mt-0.5">
              <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${duplicate.similarityFactors.description}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between font-medium">
              <span>Work Category</span>
              <span className="font-bold text-red-600">{duplicate.similarityFactors.workCategory}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1 mt-0.5">
              <div className="bg-red-500 h-1 rounded-full" style={{ width: `${duplicate.similarityFactors.workCategory}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between font-medium">
              <span>Beneficiary</span>
              <span className="font-bold text-red-600">{duplicate.similarityFactors.beneficiaryArea}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1 mt-0.5">
              <div className="bg-red-500 h-1 rounded-full" style={{ width: `${duplicate.similarityFactors.beneficiaryArea}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner & View Link */}
      <div className="mt-2 flex items-center justify-between bg-red-50 border border-red-200 p-2 rounded text-xs">
        <span className="font-bold text-red-700 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          Possible Duplicate – Requires Verification
        </span>
        <button className="text-xs font-bold text-navy-900 hover:underline">
          View All Matched Projects
        </button>
      </div>
    </div>
  );
};
