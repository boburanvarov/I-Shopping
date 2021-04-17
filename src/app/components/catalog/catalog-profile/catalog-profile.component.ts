import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog-profile',
  templateUrl: './catalog-profile.component.html',
  styleUrls: ['./catalog-profile.component.css']
})
export class CatalogProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router) { }

  catalog: any = '';
  catalogList: Array<any> = [];
  catalogId: number = -1;

  ngOnInit(): void {

    let id = this.currentRoute.snapshot.paramMap.get("id");
    if (id != null) {
      this.catalogId = Number.parseInt(id);
    }

    let catalog = localStorage.getItem("catalog");

    if (catalog != null) {
      this.catalogList = JSON.parse(catalog);

      let data = this.catalogList.filter(c => c.id == this.catalogId);

      if (data == null || data.length == 0) {

        this.router.navigate(['catalog']);
      }

      this.catalog = {
        id: data[0].id,
        name: data[0].catalogName
      }
    }
  }

}
