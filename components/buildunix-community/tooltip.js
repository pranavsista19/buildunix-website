export function showTooltip(data) {
  const tooltip = document.querySelector('.buildunix-community-tooltip');
  if (!tooltip) return;

  const nameEl = tooltip.querySelector('.tooltip-building-name');
  const metaEl = tooltip.querySelector('.tooltip-meta');
  const dotEl = tooltip.querySelector('.tooltip-status-dot');

  if (nameEl) nameEl.textContent = data.name || 'Building';
  
  if (dotEl) {
    const statusColor = data.status === 'complete' ? '#4B6F44' : (data.status === 'in_progress' ? '#E8690A' : '#71797E');
    dotEl.style.backgroundColor = statusColor;
    dotEl.style.color = statusColor;
  }

  let metaHtml = `
    <div>Units: ${data.units || 'N/A'}</div>
    <div>Status: ${data.statusLabel || 'Active'}</div>
  `;

  if (data.type === 'floor') {
    metaHtml += `
      <div class="tooltip-floor-info">
        <span class="tooltip-phase">Floor ${data.floorIndex}: ${data.phase}</span>
        <div style="font-size: 11px; color: rgba(255,255,255,0.6)">Current heatmap: Active</div>
      </div>
    `;
  }

  if (metaEl) metaEl.innerHTML = metaHtml;
  
  tooltip.classList.add('visible');
}

export function hideTooltip() {
  const tooltip = document.querySelector('.buildunix-community-tooltip');
  if (tooltip) tooltip.classList.remove('visible');
}
