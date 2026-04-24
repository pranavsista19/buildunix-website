export function showTooltip(zone) {
  const tooltip = document.querySelector('.buildunix-model-tooltip');
  if (!tooltip) return;
  
  tooltip.querySelector('.tooltip__phase').textContent = zone.phase;
  tooltip.querySelector('.tooltip__title').textContent = zone.title;
  
  const statusEl = tooltip.querySelector('.tooltip__status');
  statusEl.className = 'tooltip__status status--' + zone.status;
  
  const labels = {
    approved: 'Approved',
    in_progress: 'In Progress',
    pending: 'Pending',
    active: 'Live'
  };
  
  tooltip.querySelector('.tooltip__status-label').textContent = labels[zone.status] || zone.status;
  tooltip.querySelector('.tooltip__description').textContent = zone.description;
  
  tooltip.classList.add('visible');
}

export function hideTooltip() {
  const tooltip = document.querySelector('.buildunix-model-tooltip');
  if (tooltip) {
    tooltip.classList.remove('visible');
  }
}
