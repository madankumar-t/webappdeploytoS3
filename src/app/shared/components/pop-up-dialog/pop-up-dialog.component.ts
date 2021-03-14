import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 's-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.scss'],
})
export class PopUpDialogComponent implements OnInit {
  @Input() showComingSoon: boolean = false;
  @Output() closeEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
