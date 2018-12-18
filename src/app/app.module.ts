import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { PortfolioService } from './portfolio/portfolio.service';

@NgModule({
  declarations: [
    AppComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  entryComponents: [
    SnackBarComponent
  ],
  providers: [
    AppService,
    PortfolioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
