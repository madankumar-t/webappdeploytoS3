import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 's-action-cards',
  templateUrl: './action-cards.component.html',
  styleUrls: ['./action-cards.component.scss'],
})
export class ActionCardsComponent implements OnInit {
  @Input() cardsMainTitle!: string;
  @Input() cardsContent!: any;

  @Output() buttonAction: EventEmitter<any> = new EventEmitter<any>();

  showCommingSoon: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toDoBtnAction = (event: any) => {};
}
