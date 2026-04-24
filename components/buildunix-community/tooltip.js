export function showTooltip(data) {
  const t = document.querySelector('.buildunix-community-tooltip');
  if (!t) return;

  const statusColor = {
    complete: '#1A7A45',
    in_progress: '#A06B0A',
    early_stage: '#4A4A4A'
  }[data.status] || '#A06B0A';

  const dot = t.querySelector('.tooltip-status-dot');
  if (dot) dot.style.backgroundColor = statusColor;
  
  const name = t.querySelector('.tooltip-building-name');
  if (name) name.textContent = data.name;

  const meta = t.querySelector('.tooltip-meta');
  if (meta) {
    const statusLabel = {
      complete: 'Approved',
      in_progress: 'In Progress',
      early_stage: 'Early Stage'
    }[data.status] || data.status;
    
    meta.textContent = `${data.name.split(' — ')[0]} · Phase ${data.currentPhase} · ${statusLabel}`;
  }

  t.classList.add('visible');
}

export function hideTooltip() {
  const t = document.querySelector('.buildunix-community-tooltip');
  if (t) t.classList.remove('visible');
}
