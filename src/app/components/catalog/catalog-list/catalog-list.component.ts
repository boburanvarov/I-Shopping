import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Catalog {
  id: string;
  name: string;
}

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css']
})

export class CatalogListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Catalog>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  catalogList: Catalog[] = this.formatList();
  allCatalogs: Array<any> = this.getAllCatalogs();

  constructor(private router: Router) {

    this.dataSource = new MatTableDataSource(this.catalogList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // profile
  profile(row: any) {
    this.router.navigate(['catalog/profile/', row.id]);
  }

  // edit
  edit(row: any) {
    this.router.navigate(['catalog/edit/', row.id]);
  }

  // delete
  delete(row: any) {
    let index = this.allCatalogs.findIndex(c => c.id ==row.id);

    if(index > -1) {

      this.allCatalogs.splice(index, 1);
      localStorage.setItem("catalog", JSON.stringify(this.allCatalogs));

      // buni o'zgartirish kerak !
      document.location.reload();
    }
  }

  // add
  add() {
    this.router.navigate(['catalog/create']);
  }

  formatList(): Catalog[] {
    let array: Catalog[] = [];

    let catalog = localStorage.getItem("catalog");

    if (catalog != null) {

      let list = JSON.parse(catalog);      

      for (let i = 0; i < list.length; i++) {

        array.push({
          id: list[i].id,
          name: list[i].catalogName
        })
      }
    }

    return array;
  }

  getAllCatalogs(){
    let catalog = localStorage.getItem('catalog');
    if(catalog != null){
      return JSON.parse(catalog);
    }
    return [];
  }

}

