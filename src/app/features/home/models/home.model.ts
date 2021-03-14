import { EventEmitter } from '@angular/core';
import { ObjectItemCard, Pagination } from '@app/shared/models/shared.models';
import { MenuItem } from 'primeng/api';

export interface RecentActivities {
  activityBy: number;
  description: string;
  activityDate: string;
  activityTo: string;
  activityType: number;
  descriptionString1: string;
  descriptionString2: string;
  isObjectLink: boolean;
  objectName: string;
}

export interface RecentEvent {
  title: string;
  description: string;
  date: Date;
  contentRender: string;
}

export interface WorkSpaces {
  id: number;
  name: string;
  state: number;
  global_flag: string;
  user_id: number;
  description: string;
}

export interface TabItem {
  data: ObjectItemCard[];
  pagination: Pagination;
}

export interface TabList {
  all: TabItem;
  exposure: TabItem;
  model: TabItem;
  report: TabItem;
  analysis: TabItem;
}
