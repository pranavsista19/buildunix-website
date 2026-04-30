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
  if (name) name.textContent = data.name.split(' — ')[0];

  const meta = t.querySelector('.tooltip-meta');
  if (meta) {
    const statusLabel = {
      complete: 'Approved',
      in_progress: 'In Progress',
      early_stage: 'Early Stage'
    }[data.status] || data.status;
    
    const floorPart = data.name.includes('Floor') ? data.name.split(' — ')[1] : '';
    const phaseString = data.phaseName ? `${data.phaseName} (Phase ${data.currentPhase})` : `Phase ${data.currentPhase} of Template`;
    
    meta.innerHTML = `
      ${floorPart ? `<div style="margin-bottom: 4px; font-weight: 500;">${floorPart}</div>` : ''}
      <div style="color: ${statusColor}; font-weight: 600;">${phaseString}</div>
      <div style="margin-top: 4px;">Status: ${statusLabel}</div>
    `;
  }

  t.classList.add('visible');
}

export function hideTooltip() {
  const t = document.querySelector('.buildunix-community-tooltip');
  if (t) t.classList.remove('visible');
}
