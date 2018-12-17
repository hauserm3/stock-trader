import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { User } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  balance = 0;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getUser().subscribe((res: User) => {
      this.balance = res.balance;
    });
  }
}
