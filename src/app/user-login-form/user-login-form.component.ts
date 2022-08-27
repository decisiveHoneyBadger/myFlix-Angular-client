import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalConstants } from '../constants';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router

  ) { }

  ngOnInit(): void {
  }

  /**
   * sends login form inputs to the backend via fetchApiData 
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close(); // Close the modal on success
      if (GlobalConstants.enableDebugOutput) { console.log(response) }
      // Add token and username to local Storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.Username);
      // this.snackBar.open('Hey ' + response.user.Username + ' you have successfully logged in!', "OK", { duration: 2000 });
      this.snackBar.open('Successfully logged in, ' + response.user.Username, "OK", { duration: 2000 });

      // Redirects to movies (main page)
      this.router.navigate(['movies']);
    }, (response) => {
      if (GlobalConstants.enableDebugOutput) { console.log(response) }

    });
  }

}
