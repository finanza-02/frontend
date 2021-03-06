import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output()
  eventTitle: EventEmitter<any> = new EventEmitter();

  @Input()
  toggle: boolean;

  @Output()
  eventToggle: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  title(content, router) {
    this.openAndCloseMenu();
    this.eventTitle.emit(content);
    if (router === '/login') {
      this.authenticationService.closeSession();
    }
    this.router.navigate([router]);
  }

  openAndCloseMenu() {
    this.toggle = !this.toggle;
    this.eventToggle.emit(this.toggle);
  }
}
