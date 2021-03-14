import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgFallbackDirective } from './directives/img-fallback.directive';
import { ObjectListComponent } from './components/object-list/object-list.component';
import { ObjectItemCardComponent } from './components/object-item-card/object-item-card.component';
import { PrimengModule } from './modules/primeng/primeng.module';
import { ActionCardsComponent } from './components/action-cards/action-cards.component';
import { PanelHeaderComponent } from './components/panel-header/panel-header.component';
import { TriggeredAlertMapComponent } from './components/triggered-alert-map/triggered-alert-map.component';
import { PopUpDialogComponent } from './components/pop-up-dialog/pop-up-dialog.component';
import { WorkspaceBrowserComponent } from './components/workspace-browser/workspace-browser.component';
import { WorkspaceBrowserDialogComponent } from './components/workspace-browser-dialog/workspace-browser-dialog.component';
import { CommonService } from './services/common.service';
import { OverlayMenuComponent } from './components/overlay-menu/overlay-menu.component';
@NgModule({
  declarations: [
    ImgFallbackDirective,
    ObjectListComponent,
    ObjectItemCardComponent,
    ActionCardsComponent,
    PanelHeaderComponent,
    TriggeredAlertMapComponent,
    PopUpDialogComponent,
    WorkspaceBrowserComponent,
    WorkspaceBrowserDialogComponent,
    OverlayMenuComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimengModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImgFallbackDirective,
    ObjectListComponent,
    ObjectItemCardComponent,
    PanelHeaderComponent,
    ActionCardsComponent,
    TriggeredAlertMapComponent,
    PrimengModule,
    PopUpDialogComponent,
    WorkspaceBrowserComponent,
    WorkspaceBrowserDialogComponent,
    OverlayMenuComponent,
  ],
  providers: [CommonService],
})
export class SharedModule {}
