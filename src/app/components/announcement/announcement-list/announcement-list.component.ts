import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Announcement {
  id: string;
  adsName: string;
  price: number;
  phoneNumber: number;
}

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})

export class AnnouncementListComponent implements AfterViewInit {


  displayedColumns: string[] = ['id', 'adsName', 'price', 'phoneNumber', 'actions'];
  dataSource: MatTableDataSource<Announcement>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  announcementList: Announcement[] = this.formatList();
  allAnnouncements: Array<any> = this.getAllAnnouncements();

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(this.announcementList)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  // profile
  profile(row: any) {
    this.router.navigate(['announcement/profile/', row.id]);
  }

  // edit
  edit(row: any) {
    this.router.navigate(['announcement/edit/', row.id]);
  }

  // delete
  delete(row: any) {
    let index = this.allAnnouncements.findIndex(c => c.id == row.id);

    if (index > -1) {

      this.allAnnouncements.splice(index, 1);
      localStorage.setItem("announcements", JSON.stringify(this.allAnnouncements));

      // buni o'zgartirish kerak !
      document.location.reload();
    }
  }

  // add
  add() {
    this.router.navigate(['announcement/create']);
  }

  formatList(): Announcement[] {
    let array: Announcement[] = [];
    let announcements = localStorage.getItem('announcements');

    if (announcements != null) {

      let list = JSON.parse(announcements);

      for (let i = 0; i < list.length; i++) {
        array.push({
          id: list[i].id,
          adsName: list[i].adsName,
          price: list[i].price,
          phoneNumber: list[i].phoneNumber

        })
      }
    }

    return array;
  }

  getAllAnnouncements() {
    let announcement = localStorage.getItem("announcements");
    if (announcement != null) {
      return JSON.parse(announcement);
    }
    return [];
  }


}
