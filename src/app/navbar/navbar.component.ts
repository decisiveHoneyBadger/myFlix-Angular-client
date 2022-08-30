import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // navigates movies (main page )
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  // navigates to user profile
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  // logs out user and clears out local storage to reset token
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('successfully logged out', "OK", { duration: 2000 });
    this.router.navigate(['welcome']);
  }

}
