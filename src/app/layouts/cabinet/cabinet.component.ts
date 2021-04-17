import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.css']
})


export class CabinetComponent implements OnInit {

    section: string = "";
    catalog: any[] = [];
    category: any[] = [];

    constructor(private router: Router) { }


    add(section: string) {
        this.section = section;
    }




    ngOnInit() {

    }

    logout() {
        console.log("CHIQISH");

        localStorage.removeItem("IS_LOGIN");
        this.router.navigate(['/']);
        window.location.reload();
    }




}