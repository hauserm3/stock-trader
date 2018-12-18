import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioService } from './portfolio.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [
    PortfolioListComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    PortfolioService
  ]
})
export class PortfolioModule { }
