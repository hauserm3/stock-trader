import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Stock, URL, User } from '../shared/models';
import { catchError } from 'rxjs/operators';
import { PortfolioService } from '../portfolio/portfolio.service';

@Injectable()
export class MarketService {

  portfolio: Stock[] = [];

  constructor(private http: HttpClient,
              private portfolioService: PortfolioService) {
    this.portfolioService.getPortfolio();
    this.portfolioService.portfolio.subscribe( stocks => {
      this.portfolio = stocks;
    });
  }

  getMarkets(): Observable<any> {
    return this.http.get<Stock[]>(`${URL}/markets`)
      .pipe(
        catchError(this.handleError)
      );
  }

  buyStocks(val: Stock): Observable<any> {
    const stock = Object.assign(val);
    const portfolioStock = this.checkPortfolio(stock);

    if (portfolioStock) {
      stock.quantity = +stock.quantity + +portfolioStock.quantity;
      return this.portfolioService.updatePortfolio(stock);
    } else {
      stock.quantity = +stock.quantity;
      return this.portfolioService.addPortfolio(stock);
    }
  }

  checkPortfolio(stock) {
    return this.portfolio.find(el => el.id === stock.id);
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
