import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Stock, URL } from '../shared/models';
import { catchError, tap } from 'rxjs/operators';
import { AppService } from '../app.service';

@Injectable()
export class PortfolioService {

  balance = 0;

  private portfolio$: BehaviorSubject<Stock[]> = new BehaviorSubject([]);
  portfolio = this.portfolio$.asObservable();

  constructor(private http: HttpClient,
              private appService: AppService) {
    this.appService.balance.subscribe(balance => this.balance = balance);
  }

  getPortfolio() {
    this.http.get<Stock[]>(`${URL}/portfolio`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((res: Stock[]) => {
        this.portfolio$.next(res);
      });
  }

  addPortfolio(stock: Stock): Observable<any> {
    return this.http.post(`${URL}/portfolio`, stock)
      .pipe(
        tap( res => this.getPortfolio()),
        catchError(this.handleError)
      );
  }

  updatePortfolio(stock: Stock): Observable<any> {
    return this.http.put(`${URL}/portfolio/${stock.id}`, stock)
      .pipe(
        tap( res => this.getPortfolio()),
        catchError(this.handleError)
      );
  }

  deletePortfolio(stock: Stock): Observable<any> {
    return this.http.delete(`${URL}/portfolio/${stock.id}`)
      .pipe(
        tap( res => {
            this.getPortfolio();
          }),
        catchError(this.handleError)
      );
  }

  sellStocks(val: Stock): Observable<any> {
    const stock = Object.assign(val);

    if (stock.quantity === +stock.amount) {
      delete stock.amount;
      return this.deletePortfolio(stock);
    } else {
      stock.quantity = +stock.amount;
      delete stock.amount;
      return this.updatePortfolio(stock);
    }
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
