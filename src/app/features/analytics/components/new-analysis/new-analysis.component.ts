import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'new-analysis',
  templateUrl: './new-analysis.component.html',
  styleUrls: ['./new-analysis.component.scss'],
})
export class NewAnalysisComponent implements OnInit {
  @Input() visible: boolean = false;

  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLaunch: EventEmitter<any> = new EventEmitter<any>();

  show: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  compareMode() {
    this.show = !this.show;
  }
}
