import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  catalogList: Array<any> = [];
  categoryList: Array<any> = [];
  parentList: Array<any> = [];
  allCategoryList: Array<any> = [];

  constructor(private searchService: SearchService){}

  ngOnInit() {

    let catalog = localStorage.getItem("catalog");
    if (catalog != null) {
      this.catalogList = JSON.parse(catalog);
    }

    let category = localStorage.getItem("category");
    if (category != null) {
      this.allCategoryList = JSON.parse(category);
    }
  }

  getCategories(i: number) {
    this.categoryList = this.allCategoryList.filter(c => c.catalogId == i && c.parentId == null);
  }

  getParents(categoryId: number) {
    this.parentList = this.allCategoryList.filter(c => c.parentId == categoryId);
  }

  searchByCategory(categoryId: string) {
    this.searchService.changeMessage({type: 'category', filter: categoryId});
  }

  searchByParent(parentId: string) {
    this.searchService.changeMessage({type: 'parent', filter: parentId});
  }

}
