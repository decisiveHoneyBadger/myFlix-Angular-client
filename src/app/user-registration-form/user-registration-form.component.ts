import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// imports the API calls created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
import { GlobalConstants } from '../constants';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * sends registration input to the backend (server) 
   * @returns {string} - snackbar confirmation message
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      if (GlobalConstants.enableDebugOutput) { console.log(response) }
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    }, (response) => {
      if (GlobalConstants.enableDebugOutput) { console.log(response) }
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
