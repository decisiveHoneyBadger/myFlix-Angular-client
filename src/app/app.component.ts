import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GlobalConstants } from './constants';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';



  constructor(
    public dialog: MatDialog
  ) { }

  /**
   * opens the dialog for registration when the "get registered" button is clicked  
   * @function openUserRegistrationDialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * opens the dialog for login once user clicks "login" button
   * @function openUserLoginDialog
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    })
  }

  /**
   * opens the dialog for movies once the previous steps have been successful 
   * @function openMoviesDialog
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
}

