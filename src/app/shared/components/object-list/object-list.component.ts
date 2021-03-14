import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  TemplateRef,
  AfterContentInit,
  ViewChild,
} from '@angular/core';
import { PrimeTemplate } from 'primeng/api';

import { ObjectItemCard, ObjectCard } from '@app/shared/models/shared.models';

@Component({
  selector: 's-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss'],
})
export class ObjectListComponent implements AfterContentInit {
  @Input() objectList: ObjectItemCard[] = [];
  @Input() objectItemOptions: ObjectCard;
  @Input() scrollHeight?: string = 'calc(39vh - 5px)';
  @Input() rows: number = 3;
  @Input() itemSize: number = 180 / 5;
  @Input() minBufferPx: number = 180 * this.rows;
  @Input() maxBufferPx: number = 180 * this.rows * this.rows;

  @ContentChildren(PrimeTemplate) templates?: QueryList<any>;

  @Output() onLazyLoading: EventEmitter<any> = new EventEmitter<any>();
  @Output() showMoreEvent: EventEmitter<any> = new EventEmitter<any>();

  exposureActionTemplate?: TemplateRef<any>;
  reportActionTemplate?: TemplateRef<any>;
  modelActionTemplate?: TemplateRef<any>;
  analysisActionTemplate?: TemplateRef<any>;

  constructor() {
    this.objectItemOptions = {
      defaultImg: 'https://placehold.it/100x100',
      imagename: 'img',
      hideAlert: false,
    };
  }
  ngAfterContentInit(): void {
    if (this.templates) {
      this.templates.forEach((item) => {
        if (item.getType() == 'exposure_actions') {
          this.exposureActionTemplate = item.template;
        }
        if (item.getType() == 'report_actions') {
          this.reportActionTemplate = item.template;
        }
        if (item.getType() == 'model_actions') {
          this.modelActionTemplate = item.template;
        }
        if (item.getType() == 'analysis_actions') {
          this.analysisActionTemplate = item.template;
        }
      });
    }
  }

  onLoaded(isFallback: boolean) {
    // make somthing based on 'isFallback'
  }

  loadContent(events: any) {
    this.onLazyLoading.emit(events);
  }
}
