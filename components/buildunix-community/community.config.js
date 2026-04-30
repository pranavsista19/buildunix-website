export const BUILDINGS = [
  {
    id: 'tower_a',
    name: 'Block A — Tower',
    type: 'tower_a',
    x: -24,
    y: 0,
    z: -18,
    currentPhase: 5,
    status: 'in_progress',
    floors: 14,
    description: 'Phase 5 active: Plastering & internal work complete. Client QC snag lane open.',
    phaseBreakdown: [
      'Phase 01: Substructure ✓',
      'Phase 02: RCC Framework ✓',
      'Phase 03: Masonry ✓',
      'Phase 04: MEP Rough-in ✓',
      'Phase 05+: Finishing → In Progress'
    ],
    isInteractive: true
  },
  {
    id: 'tower_b',
    name: 'Block B — Tower',
    type: 'tower_b',
    x: 20,
    y: 0,
    z: -18,
    currentPhase: 3,
    status: 'in_progress',
    floors: 16,
    description: 'Phase 03 active: Brickwork & masonry ongoing. MEP snag lane auto-activated.',
    isInteractive: true
  },
  {
    id: 'tower_c',
    name: 'Block C — Tower',
    type: 'tower_c',
    x: -24,
    y: 0,
    z: 18,
    currentPhase: 2,
    status: 'early_stage',
    floors: 12,
    description: 'Phase 02 active: RCC framework ongoing. PMC approval gates enforced.',
    isInteractive: true
  },
  {
    id: 'clubhouse',
    name: 'Clubhouse & Amenities',
    type: 'clubhouse',
    x: 20,
    y: 0,
    z: 18,
    currentPhase: 8,
    status: 'complete',
    description: 'All phases complete. AI-generated handover report delivered. Snag count: 0 open. Facility management mode active.',
    isInteractive: true
  },
  {
    id: 'pool',
    name: 'Swimming Pool & Deck',
    type: 'pool',
    x: -14,
    y: 0.05,
    z: -18,
    currentPhase: 8,
    status: 'complete',
    description: 'Pool area complete. Final QC verified by client. All snag lanes closed. Zero open items.',
    isInteractive: true
  },
  {
    id: 'garden',
    name: 'Landscaping & Garden',
    type: 'garden',
    x: 0,
    y: 0,
    z: 0,
    currentPhase: 7,
    status: 'in_progress',
    description: 'Phase 07 active: External landscaping ongoing. 3 snags open.',
    isInteractive: true
  }
];
