import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})


export class SynopsisComponent implements OnInit {

  /**
   *  Component injects data from MovieCard component using MAT_DIALOG_DATA injection token. Data can be accessed to populate the view and assigned as a property of the class
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
