import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ExposureService } from '../../services/exposure.service';
import { importSteps, breadcrumbData } from './add-exposure.constants';

@Component({
  selector: 'add-exposure',
  templateUrl: './add-exposure.component.html',
  styleUrls: ['./add-exposure.component.scss'],
})
export class AddExposureComponent implements OnInit {
  items: MenuItem[] = importSteps;
  breadcrumbData: MenuItem[] = breadcrumbData;
  import_status: string = 'none';

  constructor(private exposureService: ExposureService) {}

  ngOnInit(): void {
    this.exposureService.currentImportStatus.subscribe((status: string) => {
      this.import_status = status;
    });
  }
}
