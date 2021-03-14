import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'select-exposure',
  templateUrl: './select-exposure.component.html',
  styleUrls: ['./select-exposure.component.scss'],
})
export class SelectExposureComponent implements OnInit {
  @Input() showExposure: boolean = false;
  @Input() visible: boolean = false;

  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  showSideBar: boolean = false;
  defaultTab: string = 'exposure';

  constructor() {}

  ngOnInit(): void {}
}
