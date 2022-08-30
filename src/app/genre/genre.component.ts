import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  /**
   * Component injects data from MovieCard component using MAT_DIALOG_DATA injection token. Data can be accessed to populate the view and assigned as a property of the clas
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
    }


  ) { }

  ngOnInit(): void {
  }

}
