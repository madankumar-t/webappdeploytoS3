import { Component, OnInit } from '@angular/core';
import { DESCRIPTION } from '../../models/home.constant';
@Component({
  selector: 'manage-objects',
  templateUrl: './manage-objects.component.html',
  styleUrls: ['./manage-objects.component.scss'],
})
export class ManageObjectsComponent implements OnInit {
  objectDescription: {
    title: string;
    description: string;
    exploreLink: string;
    newLink: string;
  }[] = [];
  constructor() {}

  ngOnInit(): void {
    this.objectDescription = DESCRIPTION;
  }
}
