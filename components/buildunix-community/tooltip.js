export function showTooltip(data) {
  const t = document.querySelector('.buildunix-community-tooltip');
  if (!t) return;

  const statusColor = {
    complete: '#1A7A45',
    in_progress: '#E8690A',
    early_stage: '#71797E'
  }[data.status] || '#E8690A';

  const dot = t.querySelector('.tooltip-status-dot');
  if (dot) {
    dot.style.backgroundColor = statusColor;
    dot.style.color = statusColor;
  }
  
  const name = t.querySelector('.tooltip-building-name');
  if (name) name.textContent = data.name;

  const meta = t.querySelector('.tooltip-meta');
  if (meta) {
    const statusLabel = {
      complete: 'Approved',
      in_progress: 'In Progress',
      early_stage: 'Early Stage'
    }[data.status] || data.status;
    
    meta.innerHTML = `
      <div>${data.name.split(' — ')[0]}</div>
      <div style="margin-top: 4px; color: ${statusColor}; font-weight: 600;">Phase ${data.currentPhase} of Template</div>
      <div style="margin-top: 4px;">Status: ${statusLabel}</div>
    `;
  }

  t.classList.add('visible');
}

export function hideTooltip() {
  const t = document.querySelector('.buildunix-community-tooltip');
  if (t) t.classList.remove('visible');
}
