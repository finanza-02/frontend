import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleMenu = new EventEmitter<any>(true);

  @Input()
  title: string;

  constructor() {}

  ngOnInit(): void {}

  click() {
    this.toggleMenu.emit();
  }
}
