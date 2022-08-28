import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalConstants } from './constants';
//Declaring the api url that will provide data for the client app
const apiUrl = 'https://desolate-basin-26751.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient) {
  }


  /**
   * registers new users
   * @method post
   * @param userDetails 
   * @returns newly created JSON user data 
   */
  public userRegistration(userDetails: any): Observable<any> {
    if (GlobalConstants.enableDebugOutput) { console.log(userDetails) }
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * logs in regsitered users 
   * @param userCredentials 
   * @returns {string} JSON user data objects 
   */
  public userLogin(userCredentials: any): Observable<any> {
    if (GlobalConstants.enableDebugOutput) { console.log(userCredentials) }
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(catchError(this.handleError));
  }

  /**
   * gets all movies from the API
   * @method get
   * @params moviesd
   * @returns JSON objects of movie arrays  
   */
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  /**
   * gets a single movie from the API
   * @param title of the movie
   * @returns {string} JSON - object of a movie 
   */
  getSingleMovie(title: any): Observable<any> {

    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * gets a single director from the API
   * @param name 
   * @method get
   * @returns {string} JSON - object of a director
   */
  getDirector(name: any): Observable<any> {

    return this.http
      .get(apiUrl + `movies/director/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * gets a specific genre from the API
   * @method get
   * @returns {string} JSON - object of a genre
   */
  getGenre(): Observable<any> {

    return this.http
      .get(apiUrl + 'genre', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * gets a single user from the database
   * @method get
   * @param username 
   * @returns {} JSON - object of user data  
   */
  getUser(username: any): Observable<any> {

    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * gets user's list of favorite movies from the database
   * @method get
   * @returns {} JSON - object of user data  
   */
  getFavoriteMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }



  /**
   * adds a selected movie by its ID to the user's favorite movies list  
   * @method post
   * @param movieId 
   * @returns {} JSON - array of favorite movies
   */
  addFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieId}`, {}, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * deletes a selected movie from the user's favorite movies list
   * @method delete
   * @param movieID 
   * @returns {} JSON - array of updated favorite movies list
   */
  removeFavoriteMovie(movieID: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * updates user data
   * @method put
   * @param updateDetails 
   * @returns {} JSON - object of user data
   */
  editUser(updateDetails: any): Observable<any> {
    const username = localStorage.getItem('username');
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.getToken(),
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * deletes user profile (de-registering) from the databse
   * @method delete 
   */
  deleteUser(): Observable<any> {
    // gets authorization token stored in local storage
    const token = localStorage.getItem('token');
    // gets username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


  // extracts data response
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }
}
