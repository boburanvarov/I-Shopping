import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})


export class CategoryEditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router) { }

  createForm = this.fb.group({
    catalogId: ['', Validators.required],
    parentId: null,
    categoryId: ['', Validators.required],
    categoryName: ['', Validators.required],
  })

  categoryId: number = -1;
  categoryList: Array<any> = [];
  parentList: Array<any> = [];

  ngOnInit() {

    let id = this.currentRoute.snapshot.paramMap.get("id");
    if (id != null) {
      this.categoryId = Number.parseInt(id);
    }

    let category = localStorage.getItem("category");

    if (category != null) {

      this.categoryList = JSON.parse(category);

      this.parentList = this.categoryList.filter(c => c.parentId == null);

      let data = this.categoryList.filter(c => c.categoryId == this.categoryId);

      if (data.length == 0) {

        this.router.navigate(['category']);
      }

      this.createForm.get("catalogId")?.setValue(data[0].catalogId);
      this.createForm.get("parentId")?.setValue(data[0].parentId);
      this.createForm.get("categoryId")?.setValue(data[0].categoryId);
      this.createForm.get("categoryName")?.setValue(data[0].categoryName);
    }
  }


  save() {

    if (this.createForm.valid) {

      let data = this.createForm.value;

      let index = this.categoryList.findIndex(c => c.categoryId == data.categoryId);

      this.categoryList[index] = data;

      localStorage.setItem("category", JSON.stringify(this.categoryList));
    }
  }

}
