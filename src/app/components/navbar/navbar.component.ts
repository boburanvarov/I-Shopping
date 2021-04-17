import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { DwLoginComponent } from '../dialogs/dw-login/dw-login.component';

export interface DialogData {
  username: string;
  password: string;
}
interface Language {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;

  ngOnInit() {

  }

  username: string = "";
  password: string = "";

  searchInput: string = "";

  constructor(public dialog: MatDialog,
    private router: Router,
    private searchService: SearchService) { }

  loginDialog(): void {
    const dialogRef = this.dialog.open(DwLoginComponent, {
      width: '250px',
      data: { username: this.username, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        if (result.username === "admin" && result.password === "admin") {

          console.log("WELCOME ADMIN");

          let data = {
            username: "admin",
            fullname: "Admin Adminov"
          }

          localStorage.setItem("IS_LOGIN", JSON.stringify(data));
          this.router.navigate(['/']);
          window.location.reload();
        }
      }
    });
  }

  account() {

  }

  logout() {

  }

  search(f: NgForm) {

    this.searchService.changeMessage({type: 'announcement', filter: f.value.searchInput});
  }

}
