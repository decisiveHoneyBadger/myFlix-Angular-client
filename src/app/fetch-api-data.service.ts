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
   * Inject the HttpClient module to the constructor params. This will provide HttpClient module to the entire class making it available via this.http
   */

  /**
   * registers new users (POST API)
   * @service POST
   * @function userRegistration
   * @param {any} userDetails
   * @returns new user object in JSON  
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
   * @service POST
   * @param userCredentials 
   * @returns user data in JSON 
   */
  public userLogin(userCredentials: any): Observable<any> {
    if (GlobalConstants.enableDebugOutput) { console.log(userCredentials) }
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(catchError(this.handleError));
  }

  /**
   * gets all movies from the API
   * @service GET
   * @function getAllMovies
   * @params any
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
   * @service GET
   * @param title of the movie
   * @returns  JSON object of a movie 
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
   * @service GET
   * @function getDirector
   * @param {any} name 
   * @returns  director object in JSON
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
   * @service GET
   * @function getGenre
   * @returns genre object in JSON
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
   * @service GET
   * @function getUser
   * @returns user object in JSON  
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
   * @service GET
   * @function getFavoriteMovies 
   * @returns movie object in JSON   
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
   * @service GET
   * @function addFavoriteMovie
   * @param {string | number} movieID 
   * @returns JSON array of favorite movies
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
   * @service DELETE
   * @function removeFavoriteMovie
   * @param {string | number} movieID
   * @returns {} JSON - removed favorite movie
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
   * @service PUT
   * @function editUser
   * @param {any} updateDetails
   * @returns {} JSON - object of updated user data
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
   * @service DELETE
   * @function deleteUser
   * @returns removed user object in JSON 
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


  /**
   * handles error function
   * @param {HttpErrorResponse} error
   * @function handleError 
   */
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
