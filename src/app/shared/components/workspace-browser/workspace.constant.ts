export const TABNAMES = [
  { name: 'all', objectsCount: '0', init: false },
  { name: 'exposure', objectsCount: '0', init: false },
  { name: 'report', objectsCount: '0', init: false },
  { name: 'model', objectsCount: '0', init: false },
  { name: 'analysis', objectsCount: '0', init: false },
];

export const WORKSPACE_SORT = [
  { name: 'Recently Viewed', code: '1' },
  { name: 'Updated Date', code: '2' },
  { name: 'Created Date', code: '3' },
  { name: 'Alphabetical', code: '4' },
];

export const WORKSPACE_FILTER = {
  all: [
    { name: 'Owned by me', code: '1' },
    { name: 'Owned by others', code: '2' },
  ],
  exposure: [
    { name: 'SoV', code: '1' },
    { name: 'Portfolio', code: '2' },
    { name: 'Program', code: '3' },
    { name: 'Archived', code: '4' },
    { name: 'Active', code: '5' },
    { name: 'Has alerts set', code: '6' },
    { name: 'Has recent alerts', code: '7' },
    { name: 'Owned by me', code: '8' },
    { name: 'Owned by others', code: '9' },
  ],
  report: [
    { name: 'Reports', code: '1' },
    { name: 'Report templates', code: '2' },
    { name: 'Owned by me', code: '1' },
    { name: 'Owned by others', code: '2' },
  ],
  analysis: [
    { name: 'Owned by me', code: '1' },
    { name: 'Owned by others', code: '2' },
  ],
  model: [
    { name: 'Owned by me', code: '1' },
    { name: 'Owned by others', code: '2' },
  ],
};

export const PAGINATIONDATA = { from: 0, size: 20, count: 0 };

export const DEFULTLIST = {
  data: [],
  pagination: PAGINATIONDATA,
};

export const DEFULTDATA = {
  all: {
    data: [],
    pagination: PAGINATIONDATA,
  },
  exposures: {
    data: [],
    pagination: PAGINATIONDATA,
  },
  models: {
    data: [],
    pagination: PAGINATIONDATA,
  },
  reports: {
    data: [],
    pagination: PAGINATIONDATA,
  },
  analysis: {
    data: [],
    pagination: PAGINATIONDATA,
  },
};
