import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.css']
})
export class AnnouncementCreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router) { }

  createForm = this.fb.group({
    catalogId: ['', Validators.required],
    parentId: null,
    categoryId: ['', Validators.required],
    adsName: ['', Validators.required],
    adsBody: ['', Validators.required],
    price: ['', Validators.required],
    cityId: ['', Validators.required],
    regionId: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    image: ['', Validators.required],
  })

  allCategoryList: Array<any> = [];
  categoryList: Array<any> = [];
  parentList: Array<any> = [];
  catalogList: Array<any> = [];

  parentCategory: boolean = false;

  allAnnouncements: Array<any> = [];
  citiesList: Array<any> = [];
  allRegions: Array<any> = [];
  regionsList: Array<any> = [];

  base64textString: string = "";
  imageType: string = "";

  ngOnInit(): void {

    let announcements = localStorage.getItem("announcements");
    if (announcements != null) {
      this.allAnnouncements = JSON.parse(announcements);

      console.log(this.allAnnouncements);
      
    }

    let catalog = localStorage.getItem("catalog");
    if (catalog != null) {
      this.catalogList = JSON.parse(catalog);
    }

    let cities = localStorage.getItem("cities");
    if (cities != null) {
      this.citiesList = JSON.parse(cities);
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
    this.parentCategory = false;
  }

  selectCategory(value: string) {
    if (value == "new") {
      this.parentCategory = false;
    } else {
      this.parentCategory = true;

      let n = Number.parseInt(value);
      this.parentList = this.allCategoryList.filter(c => c.parentId == n);
    }
  }

  selectCity(value: string) {

    let regions = localStorage.getItem("regions");
    if (regions != null) {
      this.allRegions = JSON.parse(regions);
    }

    if (this.allRegions.length > 0) {

      let n = Number.parseInt(value);
      this.regionsList = this.allRegions.filter(c => c.cityId == n);
    }
  }

  handleFileSelect(evt: any) {
    let files = evt.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);

      this.imageType = "data:" + file.type + ";base64" + ",";
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  create() {

    if (this.createForm.valid) {

      let data = this.createForm.value;

      let newData = {
        id: this.allAnnouncements.length + 1,
        catalogId: Number.parseInt(data.catalogId),
        parentId: data.parentId == null || data.parentId == 'none' ? null : Number.parseInt(data.categoryId),
        categoryId: Number.parseInt(data.categoryId),
        adsName: data.adsName,
        adsBody: data.adsBody,
        price: data.price,
        cityId: data.cityId,
        regionId: data.regionId,
        address: data.address,
        phoneNumber: data.phoneNumber,
        image: this.imageType + this.base64textString,
        cdate: new Date(),
        status: 0,
      }

      this.allAnnouncements.push(newData);

      localStorage.setItem("announcements", JSON.stringify(this.allAnnouncements));

      this.parentCategory = false;
      this.regionsList = [];
      this.createForm.reset();
      this.router.navigate(['/announcement']);
    }
  }

}
