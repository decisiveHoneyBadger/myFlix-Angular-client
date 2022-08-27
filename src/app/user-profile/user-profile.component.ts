import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalConstants } from '../constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  userData: any = {};


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  // gets user data from API call 
  getUser(): void {
    // this.fetchApiData.getUser().subscribe((resp: any) => {
    //   this.user = resp;
    //   console.log(this.user);
    //   return this.user;
    // })
  }

  // opens the user profile dialog
  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '300px'
    })
  }

  // enables user to edit given data
  editUser(): void {
    if (GlobalConstants.enableDebugOutput) { console.log(this.userData) }
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      if (GlobalConstants.enableDebugOutput) { console.log(result) }
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000
      });
      // Logs out user once 'username' or 'password' has been updated to avoid errors
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Please login again with your new credentials', 'OK', {
          duration: 2000
        });
      }
    })
  }

  // deletes user profile ( and redirects to the main page)
  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your account? This cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      // this.fetchApiData.deleteUser().subscribe((result) => {
      //   console.log(result);
      //   localStorage.clear();
      // });
    }
  }
}
