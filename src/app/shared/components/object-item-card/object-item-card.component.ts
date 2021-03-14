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
} from '@angular/core';
import { CoreConfigService } from '@app/core/services/config.service';
import { PrimeTemplate } from 'primeng/api';

import { ObjectItemCard, ObjectCard } from '@app/shared/models/shared.models';

@Component({
  selector: 's-object-item-card',
  templateUrl: './object-item-card.component.html',
  styleUrls: ['./object-item-card.component.scss'],
})
export class ObjectItemCardComponent implements AfterContentInit {
  @Input() cardItem!: ObjectItemCard;
  @Input() cardOptions: ObjectCard;

  @ContentChildren(PrimeTemplate) templates: QueryList<any> | undefined;

  @Output() showMoreEvent: EventEmitter<any> = new EventEmitter<any>();

  workspaceItem?: ObjectCard;
  actionTemplate?: TemplateRef<any>;

  constructor(private _coreService: CoreConfigService) {
    this.cardOptions = {
      defaultImg: 'https://placehold.it/100x100',
      imagename: 'image',
      hideAlert: false,
    };
  }
  ngAfterContentInit(): void {
    if (this.templates) {
      this.templates.forEach((item) => {
        if (item.getType() == this.cardItem.object_type + '_actions') {
          this.actionTemplate = item.template;
        }
      });
    }
  }

  onLoaded(isFallback: boolean) {
    // make somthing based on 'isFallback'
  }
  emitContextMenu(event: any, type: any) {
    this._coreService.emitcontextMenuChangeEvent(event, type);
  }
  getTypeImg(type: string) {
    let icon = '';
    switch (type) {
      case 'exposure':
        icon = 'icon-exposures';
        break;
      case 'report':
        icon = 'icon-reports';
        break;
      case 'analysis':
        icon = 'icon-analysis';
        break;
      case 'model':
        icon = 'icon-models';
        break;
      default:
        icon = 'icon-exposures';
        break;
    }
    return icon;
  }

  getSubTypeImg(subType: any) {
    let imgPath = '';
    switch (subType) {
      case 'sov':
      case 'portfolio':
        imgPath = 'assets/images/exposure_sov.png';
        break;
      case 'program':
        imgPath = 'assets/images/exposure_program.png';
        break;
      case 'report':
      case 'analysis':
      case 'report-template':
        imgPath = 'assets/images/report.png';
        break;
      default:
        imgPath = 'assets/images/report.png';
        break;
    }
    return imgPath;
  }
}
