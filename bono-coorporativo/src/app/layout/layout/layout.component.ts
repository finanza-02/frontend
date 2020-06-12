import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  toggle: boolean;
  title: string;

  constructor() {}

  ngOnInit(): void {
    this.toggle = false;
  }

  toggleMenu() {
    this.toggle = !this.toggle;
  }
  changeTitle($event) {
    this.title = $event;
  }
  eventToggle($event) {
    this.toggle = $event;
  }
}
