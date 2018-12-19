import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { SnackBar, URL, User } from './shared/models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  snackBar: SnackBar;

  private balance$: BehaviorSubject<number> = new BehaviorSubject(0);
  balance = this.balance$.asObservable();

  constructor(private http: HttpClient) {
    this.snackBar = new SnackBar();
  }

  getUser() {
    this.http.get<User>(`${URL}/user`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((user: User) => {
        this.updateBalance(user.balance);
      });
  }

  changeBalance(balance) {
    this.http.put(`${URL}/user`, {balance: balance})
      .subscribe((res: User) => {
        this.updateBalance(res.balance);
      });
  }

  updateBalance(balance) {
    this.balance$.next(balance);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
