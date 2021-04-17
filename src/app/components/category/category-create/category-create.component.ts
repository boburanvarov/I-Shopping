import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  createForm = this.fb.group({
    catalogId: ['', Validators.required],
    parentId: null,
    categoryId: ['', Validators.required],
    categoryName: ['', Validators.required],
  })

  allCategoryList: Array<any> = [];
  categoryList: Array<any> = [];
  parentList: Array<any> = [];
  catalogList: Array<any> = [];

  newCategory: boolean = false;
  parentCategory: boolean = false;

  ngOnInit(): void {

    // localStorage.removeItem("category");

    let catalog = localStorage.getItem("catalog");
    if (catalog != null) {
      this.catalogList = JSON.parse(catalog);
    }
  }

  selectCatalog(value: string) {
    let n = Number.parseInt(value);

    let category = localStorage.getItem("category");
    if (category != null) {
      this.allCategoryList = JSON.parse(category);
      this.categoryList = JSON.parse(category);
    }

    this.categoryList = this.categoryList.filter(c => c.catalogId == n && c.parentId == null);
    this.newCategory = false;
    this.parentCategory = false;
  }

  selectCategory(value: string) {
    if (value == "new") {
      this.newCategory = true;
      this.parentCategory = false;
    } else {
      this.newCategory = false;
      this.parentCategory = true;

      let n = Number.parseInt(value);
      this.parentList = this.allCategoryList.filter(c => c.parentId == n);
    }
  }

  selectParent(value: string){
    if (value == "new") {
      this.newCategory = true;
    } else {
      this.newCategory = false;
    }
  }

  create() {

    if (this.createForm.valid) {

      let data = this.createForm.value;    
      
      let newData = {
        catalogId: Number.parseInt(data.catalogId),
        parentId: data.parentId == null ? null : Number.parseInt(data.categoryId),
        categoryId: this.allCategoryList.length + 1,
        categoryName: data.categoryName
      }

      this.allCategoryList.push(newData);

      localStorage.setItem("category", JSON.stringify(this.allCategoryList));

      this.newCategory = false;
      this.parentCategory = false;
      this.createForm.reset();
    }
  }


}
