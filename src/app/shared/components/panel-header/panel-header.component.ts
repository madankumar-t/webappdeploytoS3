import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 's-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.scss'],
})
export class PanelHeaderComponent implements OnInit {
  @Input() pageIcon!: string;
  @Input() pageTitle!: string;

  constructor() {}

  ngOnInit(): void {}
}
