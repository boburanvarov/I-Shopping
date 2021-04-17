import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


export interface Category {
  id: string;
  name: string;
  parent: string;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})


export class CategoryListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'parent', 'actions'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoryList: Category[] = this.formatList();
  allCategories: Array<any> = this.getAllCategories();

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource(this.categoryList);
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
    this.router.navigate(['category/profile/', row.id]);
  }

  // edit
  edit(row: any) {
    this.router.navigate(['category/edit/', row.id]);
  }

  // delete
  delete(row: any) {
    let index = this.allCategories.findIndex(c => c.categoryId == row.id);
    
    if (index > -1) {

      this.allCategories.splice(index, 1);
      localStorage.setItem("category", JSON.stringify(this.allCategories));

      // buni o'zgartirish kerak !
      document.location.reload();
    }
  }

  // add
  add() {
    this.router.navigate(['category/create']);
  }

  formatList(): Category[] {
    let array: Category[] = [];
    let category = localStorage.getItem("category");

    if (category != null) {

      let list = JSON.parse(category);

      for (let i = 0; i < list.length; i++) {

        array.push({
          id: list[i].categoryId,
          name: list[i].categoryName,
          parent: list[i].parentId == null ? '-' : this.getParentName(list, list[i].parentId)
        })
      }
    }
    return array;
  }

  getParentName(category: Array<any>, parentId: number) {
    let data = category.filter(c => c.categoryId == parentId);
    if (data.length > 0) {
      return data[0].categoryName;
    }

    return '';
  }

  getAllCategories() {
    let category = localStorage.getItem("category");
    if (category != null) {
      return JSON.parse(category);
    }
    return [];
  }

}

