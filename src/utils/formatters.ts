/**
 * Utility functions for formatting Indian currency, numbers, and dates
 */

export const formatCurrencyRupees = (
  amountInRupees: number | null | undefined,
  options?: { compact?: boolean; fractionDigits?: number }
): string => {
  if (amountInRupees === null || amountInRupees === undefined || isNaN(amountInRupees)) {
    return '₹ 0';
  }

  const fractionDigits = options?.fractionDigits ?? 2;

  // Crore format (1 Crore = 10,000,000)
  if (Math.abs(amountInRupees) >= 10000000) {
    const inCrores = amountInRupees / 10000000;
    return `₹ ${inCrores.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: fractionDigits,
    })} Cr`;
  }

  // Lakh format (1 Lakh = 100,000)
  if (Math.abs(amountInRupees) >= 100000) {
    const inLakhs = amountInRupees / 100000;
    return `₹ ${inLakhs.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: fractionDigits,
    })} Lakh`;
  }

  // Exact Rupees format
  return `₹ ${Math.round(amountInRupees).toLocaleString('en-IN')}`;
};

export const formatIndianNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0';
  }
  return num.toLocaleString('en-IN');
};

export const formatPercentage = (
  value: number | null | undefined,
  decimals: number = 1
): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.0%';
  }
  return `${value.toFixed(decimals)}%`;
};

export const formatIndianDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};
