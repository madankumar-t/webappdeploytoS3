import { Component, OnInit } from '@angular/core';

import { HomePageService } from '../../services/home.service';
import { RecentEvent } from '../../models/home.model';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  recentEvents: RecentEvent[] = [];
  showDescriptionDialog: boolean = false;
  descriptionContent: any;
  descriptionTitle: string = '';
  constructor(private homePageService: HomePageService) {}

  ngOnInit(): void {
    this.getRecentEvents();
  }

  /**
   * getting The Recent Event From API and Modifying the Response Array To Desired Array Of Objects
   */
  getRecentEvents() {
    this.homePageService.getRecentEvents().subscribe((obj: any) => {
      this.recentEvents = obj;
    });
  }

  showEventDescriptionDialog(content: any, title: string) {
    this.showDescriptionDialog = true;
    this.descriptionTitle = title;
    this.descriptionContent = content.replace(
      /href="http/g,
      'target="_blank" href="http'
    );
  }
}
