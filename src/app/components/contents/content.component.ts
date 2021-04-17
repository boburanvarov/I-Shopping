import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { DwAnnouncementComponent } from '../dialogs/dw-announcement/dw-announcement.component';

@Component({
    selector: "content",
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit, OnDestroy {

    allAnnouncements: Array<any> = [];
    filteredAnnouncements: Array<any> = [];
    cities: Array<any> = [];
    regions: Array<any> = [];

    subscription: Subscription = new Subscription();
    filter: string = "";

    defaultTitle: string = "Eng so'ngi e'lonlar";
    title: string = "";

    constructor(private searchService: SearchService,
        private dialog: MatDialog) { }

    ngOnInit() {

        this.subscription = this.searchService.currentMessage.subscribe(message =>
            this.search(message));

        this.title = this.defaultTitle;

        let announcements = localStorage.getItem("announcements");
        if (announcements != null) {
            this.allAnnouncements = JSON.parse(announcements);
            this.filteredAnnouncements = JSON.parse(announcements);
        }

        let cities = localStorage.getItem("cities");
        if (cities != null) {
            this.cities = JSON.parse(cities);
        }

        let regions = localStorage.getItem("regions");
        if (regions != null) {
            this.regions = JSON.parse(regions);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    getAddress(cityId: any, regionId: any) {
        return this.cities.filter(c => c.id == cityId)[0].name + ', '
            + this.regions.filter(r => r.id == regionId)[0].name;
    }

    search(seachedObject: any) {
        this.filteredAnnouncements = this.allAnnouncements;
        this.title = this.defaultTitle;

        let type = seachedObject.type;
        let message = seachedObject.filter;

        if (type == 'announcement' && message.trim().length > 0) {
            this.filteredAnnouncements = this.allAnnouncements.filter(a => a.adsName.toLowerCase().includes(message));

            this.title = "Qidiruv natijalari";
        }

        if (type == 'category') {
            let categoryId = +message;
            this.filteredAnnouncements = this.allAnnouncements.filter(a => a.categoryId == categoryId);

            this.title = "Qidiruv natijalari";
        }

        if (type == 'parent') {
            let categoryId = +message;
            this.filteredAnnouncements = this.allAnnouncements.filter(a => a.parentId == categoryId);

            this.title = "Qidiruv natijalari";
        }
    }


    itemDialog(data: any): void {
        this.dialog.open(DwAnnouncementComponent, {
            width: '400px',
            height: '500px',
            data: { announcement: data }
        });
    }

}