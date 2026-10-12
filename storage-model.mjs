const number = value => Math.max(0, Number(value) || 0);
const format = value => value.toLocaleString('ja-JP', { maximumFractionDigits: 2 });

export function storageUsage(company) {
  const used = number(company.used_bytes), limit = number(company.storage_limit_gb) * 1e9;
  return { used, limit, remaining: limit > 0 ? Math.max(0, limit - used) : null,
    percent: limit > 0 ? used / limit * 100 : null,
    status: limit <= 0 ? 'unset' : used >= limit ? 'exceeded' : used >= limit * .8 ? 'warning' : 'normal' };
}

export function formatBytes(value) {
  const bytes = number(value);
  if (bytes >= 1e9) return format(bytes / 1e9) + ' GB';
  if (bytes >= 1e6) return format(bytes / 1e6) + ' MB';
  if (bytes >= 1e3) return format(bytes / 1e3) + ' KB';
  return format(bytes) + ' B';
}

export function formatPercent(value) {
  if (value === null) return '上限未設定';
  if (value > 0 && value < .1) return '0.1%未満';
  return value.toLocaleString('ja-JP', { maximumFractionDigits: 1 }) + '%';
}
