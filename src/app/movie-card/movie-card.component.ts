import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalConstants } from '../constants';
// movie-card components
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';




@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * displays all movies within the API
   * @returns {object} - movie datas
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      if (GlobalConstants.enableDebugOutput) { console.log(this.movies) }
      return this.movies;
    });
  }

  /**
   * gets the user's list of favorite movies
   * @returns {string} - favorite movies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      if (GlobalConstants.enableDebugOutput) { console.log(this.favoriteMovies) }
      return this.favoriteMovies;
    });
  }

  /**
   * returns favorite movies based on ID
   * @method isFav
   * @param id of selected movie
   * @returns {boolean}
   */
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  /**
   * opens the genre dialog in movie-card
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * opens the director dialog in movie-card
   * @param name 
   * @param bio 
   * @param birthday 
   */
  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      width: '500px'
    });
  }

  /**
   * opens the synopsis dialog in movie-card 
   * @param title 
   * @param description 
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * adds a selected single movie to the user's favorite movies's list 
   * @param id of the selected movie
   */
  addToFavoriteMovies(id: string): void {
    if (GlobalConstants.enableDebugOutput) { console.log(id) }
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      if (GlobalConstants.enableDebugOutput) { console.log(result) }
      this.ngOnInit();
    })
  }

  /**
   * removes a selected single movie from the user's favorite movies's list
   * @param id of the selected movie
   */
  removeFromFavoriteMovies(id: string): void {
    if (GlobalConstants.enableDebugOutput) { console.log(id) };
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      if (GlobalConstants.enableDebugOutput) { console.log(result) }
      this.ngOnInit();
    })
  }

}