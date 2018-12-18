import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  error: boolean;
  message: string;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.message = this.appService.snackBar.msg;
    this.error = this.appService.snackBar.err;
  }

}
