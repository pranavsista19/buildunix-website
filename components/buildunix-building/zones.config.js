export const COMMUNITY_CONFIG = [
  {
    id: 'tower_a',
    name: 'Tower A',
    type: 'tower',
    x: -5,
    z: -3,
    progressIndex: 4, // 0 to 5
  },
  {
    id: 'tower_b',
    name: 'Tower B',
    type: 'tower',
    x: 0,
    z: -4,
    progressIndex: 2,
  },
  {
    id: 'tower_c',
    name: 'Tower C',
    type: 'tower',
    x: 5,
    z: -3,
    progressIndex: 1,
  },
  {
    id: 'clubhouse',
    name: 'Club House',
    type: 'clubhouse',
    x: -3,
    z: 4,
    progressIndex: 5,
  },
  {
    id: 'pool',
    name: 'Common Pool & Garden',
    type: 'amenity',
    x: 3,
    z: 4,
    progressIndex: 5,
  }
];

export const TOWER_ZONES = [
  {
    id: 'zone_foundation',
    phase: 'PHASE 01–02',
    title: 'Substructure & Civil Works',
    description: 'Foundation phases locked until soil test approval uploaded and verified by PMC. Zero verbal approvals.',
    height: 0.8,
    width: 3.5,
    depth: 2.5,
  },
  {
    id: 'zone_rcc',
    phase: 'PHASE 03–04',
    title: 'Column & RCC Framework',
    description: 'Each column pour requires a GPS-tagged photo within 2 hours. PMC engineer approves before next pour begins.',
    height: 0.8,
    width: 3.35,
    depth: 2.5,
  },
  {
    id: 'zone_masonry',
    phase: 'PHASE 05–06',
    title: 'Brickwork & Masonry',
    description: 'MEP snag lane auto-activates at this phase. Electricians and plumbers notified before walls are closed.',
    height: 0.8,
    width: 3.2,
    depth: 2.5,
  },
  {
    id: 'zone_plastering',
    phase: 'PHASE 07–08',
    title: 'Plastering & Waterproofing',
    description: 'Client QC snag lane opens. Clients raise finish defects before next layer goes on.',
    height: 0.8,
    width: 3.05,
    depth: 2.5,
  },
  {
    id: 'zone_finishing',
    phase: 'PHASE 09–12',
    title: 'Finishing & Interior',
    description: 'At 9 PM, AI reads all phase completions and generates the night report. Zero manual effort.',
    height: 0.8,
    width: 2.9,
    depth: 2.5,
  },
  {
    id: 'zone_command',
    phase: 'PMC LAYER',
    title: 'Project Command',
    description: 'Every tower, every phase, every snag in one live heatmap. Updated in under 2 seconds.',
    height: 0.5,
    width: 2.7,
    depth: 2.5,
  }
];
