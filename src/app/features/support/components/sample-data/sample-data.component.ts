import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';
@Component({
  selector: 'sample-data',
  templateUrl: './sample-data.component.html',
  styleUrls: ['./sample-data.component.scss'],
})
export class SampleDataComponent implements OnInit {
  samples = [];
  rowArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cols: any;
  constructor(public supportService: SupportService) {}

  ngOnInit(): void {
    this.supportService.getSampleData().subscribe((obj: any) => {
      this.samples = obj;
    });
    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'File Type', header: 'File Type' },
      { field: 'Version', header: 'Version' },
      { field: 'Modules', header: 'Modules' },
      { field: 'Modified date', header: 'Modified date' },
    ];
  }
}
