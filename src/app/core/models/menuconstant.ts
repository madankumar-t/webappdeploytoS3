import { MenuItem } from 'primeng/api';

export const exposureMenu: MenuItem[] = [
  {
    label: 'Alerts',
    icon: 'fa fa-bell-o',
    items: [
      { label: 'View triggered alert', icon: '', command: () => {} },
      { label: 'Manage alert', icon: '', command: () => {} },
    ],
  },
  { label: 'Replace', icon: 'fa fa-exchange', command: () => {} },
  {
    label: 'Move/copy',
    icon: 'fa fa-files-o',
    items: [
      { label: 'Move to a different workspace', icon: '', command: () => {} },
      { label: 'Copy to a different workspace', icon: '', command: () => {} },
      { label: 'Copy exposure settings', icon: '', command: () => {} },
    ],
  },
  { label: 'Share', icon: 'fa fa-share-alt', command: () => {} },
  {
    label: 'Download',
    icon: 'fa fa-download',
    items: [
      { label: 'Orginal', icon: '', command: () => {} },
      { label: 'csv', icon: '', command: () => {} },
      { label: 'ETF', icon: '', command: () => {} },
    ],
  },
  {
    label: 'Archive/Delete',
    icon: 'fa fa-trash-o',
    items: [
      { label: 'Archive', icon: '', command: () => {} },
      { label: 'Delete from workspace', icon: '', command: () => {} },
      { label: 'Delete permanently', icon: '', command: () => {} },
    ],
  },
];

export const reportMenu: MenuItem[] = [
  {
    label: 'Move/copy',
    icon: 'fa fa-files-o',
    items: [
      { label: 'Move to a different workspace', icon: '' },
      { label: 'Copy to a different workspace', icon: '', command: () => {} },
      { label: 'Copy exposure settings', icon: '', command: () => {} },
    ],
  },
  { label: 'Share', icon: 'fa fa-share-alt', command: () => {} },
  {
    label: 'Download',
    icon: 'fa fa-download',
    items: [
      { label: 'Orginal', icon: '', command: () => {} },
      { label: 'csv', icon: '', command: () => {} },
      { label: 'ETF', icon: '', command: () => {} },
    ],
  },
  {
    label: 'Delete',
    icon: 'fa fa-trash-o',
    items: [
      { label: 'Delete from workspace', icon: '', command: () => {} },
      { label: 'Delete permanently', icon: '', command: () => {} },
    ],
  },
];

export const quickAddMenu: MenuItem[] = [
  { label: 'Exposures', icon: 'icon-exposures', command: () => {} },
  {
    label: 'Report',
    icon: 'icon-reports',
    command: () => {},
  },
  { label: 'Analytics', icon: 'icon-analysis', command: () => {} },
  { label: 'Models', icon: 'icon-models', command: () => {} },
];

export const supportMenu: MenuItem[] = [
  { label: 'Sample Data', command: () => {} },
  { label: 'Help center', command: () => {} },
  { label: 'About', command: () => {} },
];

export interface supportData {
  visible: boolean;
  header: string;
}

export interface menuData {
  event: any;
  menuList: any;
}
