import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelComponent } from './components/model.component';

import { PrimengModule } from 'app/shared/modules/primeng/primeng.module';
import { ModelsRoutingModule } from './models-routing.module';

@NgModule({
  imports: [CommonModule, PrimengModule, ModelsRoutingModule],
  declarations: [ModelComponent],
  exports: [],
  providers: [],
})
export class ModelsModule {}
