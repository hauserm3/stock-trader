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

  categories: string[] = [];

  displayedColumns: string[] = ['name', 'price', 'quantity', 'amount', 'action'];
  dataSource = new MatTableDataSource<Stock>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private portfolioService: PortfolioService,
              private appService: AppService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.appService.balance.subscribe(balance => this.balance = balance);

    this.dataSource.paginator = this.paginator;

    this.portfolioService.getPortfolio();
    this.portfolioService.portfolio.subscribe((stocks) => {
      this.dataSource.data = stocks;
      this.categories = this.uniqueCategories(stocks);
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
