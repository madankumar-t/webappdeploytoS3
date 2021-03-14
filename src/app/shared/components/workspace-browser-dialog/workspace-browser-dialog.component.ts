import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 's-workspace-browser-dialog',
  templateUrl: './workspace-browser-dialog.component.html',
  styleUrls: ['./workspace-browser-dialog.component.scss'],
})
export class WorkspaceBrowserDialogComponent implements OnInit {
  constructor() {}
  @Input() defaultTab: string = 'all';
  @Input() visible: boolean = false;

  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    let data = changes.visible.currentValue;
  }
}
