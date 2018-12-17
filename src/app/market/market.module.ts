import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketRoutingModule } from './market-routing.module';
import { MarketListComponent } from './market-list/market-list.component';
import { MaterialModule } from '../shared/material.module';
import { MarketService } from './market.service';

@NgModule({
  declarations: [
    MarketListComponent
  ],
  imports: [
    CommonModule,
    MarketRoutingModule,
    MaterialModule
  ],
  providers: [
    MarketService
  ]
})
export class MarketModule { }
