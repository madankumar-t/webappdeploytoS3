export interface SmMenuItem {
  name: string;
  code: string;
}

export interface Pagination {
  count: number;
  from: number;
  size: number;
}

export interface ObjectItemCard {
  id: string;
  name: string;
  description: string;
  image: string;
  typeimg: string;
  alert_configured: boolean;
  object_type: string;
  object_sub_type: string;
}

export interface ObjectCard {
  key?: string;
  defaultImg: string;
  imagename: string;
  hideAlert?: boolean;
  object_type?: string;
}
