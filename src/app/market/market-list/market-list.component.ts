import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Market } from '../../shared/models';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {

  markets: Market[] = [];

  categories: string[] = ['Consumer Services', 'Finance', 'Public Utilities'];

  displayedColumns: string[] = ['name', 'price', 'amount', 'action'];
  dataSource = new MatTableDataSource<Market>(this.markets);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.marketService.getMarkets().subscribe((res: Market[]) => {
      console.log('markets', res);
      this.dataSource.data = res;
    });
  }

}

