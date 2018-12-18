import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Stock } from '../../shared/models';
import { PortfolioService } from '../portfolio.service';
import { AppService } from '../../app.service';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';


@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {
  balance = 0;
  total = 0;

  categories: string[] = [];

  displayedColumns: string[] = ['name', 'price', 'quantity', 'amount', 'action'];
  dataSource = new MatTableDataSource<Stock>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private portfolioService: PortfolioService,
              private appService: AppService,
              public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.appService.balance.subscribe(balance => this.balance = balance);

    this.dataSource.paginator = this.paginator;

    this.portfolioService.getPortfolio();
    this.portfolioService.portfolio.subscribe((stocks) => {
      if (stocks.length) {
        this.countTotalPrice(stocks);
      } else {
        this.total = 0;
      }
      this.dataSource.data = stocks;
      this.categories = this.uniqueCategories(stocks);
    });
  }

  countTotalPrice(stocks: Stock[]) {
    let totalPrice = 0;
    stocks.forEach((current) => {
      totalPrice += current.quantity * current.price;
    });
    this.total = totalPrice;
  }

  uniqueCategories(arr: Stock[]) {
    const obj = {};

    for (let i = 0; i < arr.length; i++) {
      const str = arr[i].category;
      obj[str] = true;
    }

    return Object.keys(obj);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sell(stock: Stock) {
    if (this.validateQuantity(stock.amount, stock.quantity)) {
      const amount = stock.amount;
      this.portfolioService.sellStocks(stock).subscribe(res => {
        this.appService.changeBalance(this.balance + (stock.price * amount));
        this.openSnackBar('success', false);
      });
    }
  }

  validateQuantity(amount, quantity) {
    if (!amount) {
      this.openSnackBar('amount is empty', true);
      return false;
    }

    if (isNaN(amount)) {
      this.openSnackBar('amount is not a number', true);
      return false;
    }

    if ( +amount <= 0) {
      this.openSnackBar('amount must be greater than zero', true);
      return false;
    }

    if (amount > quantity) {
      this.openSnackBar('amount must be greater than the quantity', true);
      return false;
    }

    return true;
  }

  openSnackBar(message, error: boolean) {
    this.appService.snackBar.msg = message;
    this.appService.snackBar.err = error;
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['dark-snackbar']
    });
  }

}
