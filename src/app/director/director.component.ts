import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  /**
   * component injects data from MovieCard using MAT_DIALOG_DATA injection token. Data can be accessed to populate the view and assigned as a property of the class
   * @param data 
   * 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birthday: Date,
    }
  ) { }

  ngOnInit(): void {
  }

}
