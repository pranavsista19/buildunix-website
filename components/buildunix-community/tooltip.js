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
    
    const parts = data.name.split(' — ');
    const subtitle = parts.length >= 2 && !parts[1].includes('Floor') ? parts[1] : '';
    const floorPart = parts.find(p => p.includes('Floor')) || '';
    const phaseString = data.phaseName ? `${data.phaseName} (Phase ${data.currentPhase})` : `Phase ${data.currentPhase} of Template`;
    
    meta.innerHTML = `
      ${subtitle ? `<div style="margin-bottom: 2px; font-weight: 500; opacity: 0.8;">${subtitle}</div>` : ''}
      ${floorPart ? `<div style="margin-bottom: 6px; font-weight: 700; font-size: 13px;">${floorPart}</div>` : ''}
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
