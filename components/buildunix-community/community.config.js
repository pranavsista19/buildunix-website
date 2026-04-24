export const BUILDINGS = [
  {
    id: 'tower_a',
    name: 'Block A — Tower',
    type: 'tower_a',
    x: -22,
    y: 0,
    z: -8,
    currentPhase: 10,
    status: 'in_progress',
    floors: 14,
    description: 'Phase 10 active: Plastering & waterproofing complete. Client QC snag lane open. 23 snags raised, 18 resolved.',
    phaseBreakdown: [
      'Phase 01-02: Substructure ✓',
      'Phase 03-04: RCC Framework ✓',
      'Phase 05-06: Masonry ✓',
      'Phase 07-08: Plastering ✓',
      'Phase 09-10: MEP Rough-in ✓',
      'Phase 11-14: Finishing → In Progress'
    ],
    isInteractive: true
  },
  {
    id: 'tower_b',
    name: 'Block B — Tower',
    type: 'tower_b',
    x: 18,
    y: 0,
    z: -10,
    currentPhase: 6,
    status: 'in_progress',
    floors: 16,
    description: 'Phase 06 active: Brickwork & masonry ongoing. MEP snag lane auto-activated. Electricians notified before walls close.',
    isInteractive: true
  },
  {
    id: 'tower_c',
    name: 'Block C — Tower',
    type: 'tower_c',
    x: 12,
    y: 0,
    z: 12,
    currentPhase: 3,
    status: 'early_stage',
    floors: 12,
    description: 'Phase 03 active: RCC framework ongoing. Column pour requires GPS-tagged photo within 2 hours. PMC approval gates enforced.',
    isInteractive: true
  },
  {
    id: 'clubhouse',
    name: 'Clubhouse & Amenities',
    type: 'clubhouse',
    x: -8,
    y: 0,
    z: 10,
    currentPhase: 14,
    status: 'complete',
    description: 'All 14 phases complete. AI-generated handover report delivered. Snag count: 0 open. Facility management mode active.',
    isInteractive: true
  },
  {
    id: 'pool',
    name: 'Swimming Pool & Deck',
    type: 'pool',
    x: 2,
    y: 0.05,
    z: -8,
    currentPhase: 14,
    status: 'complete',
    description: 'Pool area complete. Phase 14 QC verified by client. All snag lanes closed. Zero open items.',
    isInteractive: true
  },
  {
    id: 'garden',
    name: 'Landscaping & Garden',
    type: 'garden',
    x: 0,
    y: 0,
    z: 0,
    currentPhase: 13,
    status: 'in_progress',
    description: 'Phase 13 active: External landscaping ongoing. BuildUNIX tracks 8 landscape subcontractor tasks. 3 snags open.',
    isInteractive: true
  }
];
