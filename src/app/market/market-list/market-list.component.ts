import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Stock } from '../../shared/models';
import { MarketService } from '../market.service';
import { AppService } from '../../app.service';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {
  balance = 0;

  categories: string[] = [];

  displayedColumns: string[] = ['name', 'price', 'quantity', 'action'];
  dataSource = new MatTableDataSource<Stock>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private marketService: MarketService,
              private appService: AppService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.appService.balance.subscribe(balance => this.balance = balance);

    this.dataSource.paginator = this.paginator;

    this.marketService.getMarkets().subscribe((res: Stock[]) => {
      this.dataSource.data = res;
      this.categories = this.uniqueCategories(res);
    });
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

  buy(stock: Stock) {
    if (this.validateQuantity(stock.quantity, stock.price)) {
      this.marketService.buyStocks(stock).subscribe(res => {
        this.appService.changeBalance(this.balance - (stock.price * stock.quantity));
        this.openSnackBar('success', false);
      });
    }
  }

  validateQuantity(quantity, price) {
    if (!quantity) {
      this.openSnackBar('quantity is empty', true);
      return false;
    }

    if (isNaN(quantity)) {
      this.openSnackBar('quantity is not a number', true);
      return false;
    }

    if ( +quantity <= 0) {
      this.openSnackBar('quantity must be greater than zero', true);
      return false;
    }

    if (price * quantity > this.balance) {
      this.openSnackBar('you do not have enough cash.', true);
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

