import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-profile',
  templateUrl: './category-profile.component.html',
  styleUrls: ['./category-profile.component.css']
})
export class CategoryProfileComponent implements OnInit {


  constructor(private currentRoute: ActivatedRoute,
    private router: Router) { }

  category: any = '';
  catalogList: Array<any> = [];
  categoryList: Array<any> = [];
  categoryId: number = -1;

  ngOnInit(): void {

    let id = this.currentRoute.snapshot.paramMap.get("id");
    if (id != null) {
      this.categoryId = Number.parseInt(id);
    }

    let category = localStorage.getItem("category");

    if (category != null) {
       
      let catalog = localStorage.getItem("catalog");
      if(catalog != null){
        this.catalogList = JSON.parse(catalog);
      }

      this.categoryList = JSON.parse(category);

      let data = this.categoryList.filter(c => c.categoryId == this.categoryId);

      if (data == null || data.length == 0) {

        this.router.navigate(['category']);
      }

      this.category = {
        id: data[0].categoryId,
        name: data[0].categoryName,
        parent: data[0].parentId == null ? '-' : this.getParentName(this.categoryList, data[0].parentId),
        catalogName: this.getCatalogName(this.catalogList, data[0].catalogId)
      }
    }
  }

  getParentName(category: Array<any>, parentId: number){
    let data = category.filter(c => c.categoryId == parentId);
    if(data.length > 0){
      return data[0].categoryName;
    }

    return '';
  }

  getCatalogName(catalog: Array<any>, catalogId: number){
    let data = catalog.filter(c => c.id == catalogId);
    if(data.length > 0){
      return data[0].catalogName;
    }

    return '';
  }

}
