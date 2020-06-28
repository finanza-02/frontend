import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {};

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async enter() {
    try {
      if (this.user.nombre !== '' && this.user.contrasena !== '') {
        const user: User = await this.authenticationService.authentication(
          this.user
        );
        this.authenticationService.saveUser(user);
        this.router.navigate(['finanzas']);
      }
    } catch (error) {
      this.matSnackBar.open(
        `El usuario o contraseña introducido es incorrecto!`,
        null
      );
    }
  }
}
