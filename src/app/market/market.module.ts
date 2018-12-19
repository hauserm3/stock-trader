import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketRoutingModule } from './market-routing.module';
import { MarketListComponent } from './market-list/market-list.component';
import { MaterialModule } from '../shared/material.module';
import { MarketService } from './market.service';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../portfolio/portfolio.service';

@NgModule({
  declarations: [
    MarketListComponent
  ],
  imports: [
    CommonModule,
    MarketRoutingModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    MarketService,
    PortfolioService
  ]
})
export class MarketModule { }
