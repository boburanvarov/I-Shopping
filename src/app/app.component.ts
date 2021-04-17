import { Component, OnInit } from '@angular/core';
import { DefaultData } from './default-data/default-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'I-Shopping';
  isLogin: boolean = false;

  constructor() { }

  ngOnInit() {

    new DefaultData().loadDefaultData();

    let login = localStorage.getItem("IS_LOGIN");
    if (login != null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
