import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.css']
})
export class AnnouncementEditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router) { }

  createForm = this.fb.group({
    id: [''],
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
    image: [''],
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
  imageChanged: boolean = false;
  defaultImage: string = "";

  announcementId: number = 0;

  ngOnInit(): void {

    let id = this.currentRoute.snapshot.paramMap.get("id");
    if (id != null) {
      this.announcementId = Number.parseInt(id);
    }

    let announcements = localStorage.getItem("announcements");
    if (announcements != null) {
      this.allAnnouncements = JSON.parse(announcements);
    }

    let catalog = localStorage.getItem("catalog");
    if (catalog != null) {
      this.catalogList = JSON.parse(catalog);

      let category = localStorage.getItem("category");
      if (category != null) {
        this.allCategoryList = JSON.parse(category);
      }
    }

    let cities = localStorage.getItem("cities");
    if (cities != null) {
      this.citiesList = JSON.parse(cities);
    }

    let regions = localStorage.getItem("regions");
    if (regions != null) {
      this.allRegions = JSON.parse(regions);
      this.regionsList = this.allRegions;
    }

    let data = this.allAnnouncements.filter(a => a.id == this.announcementId);

    this.categoryList = this.allCategoryList.filter(c => c.parentId == null && c.catalogId == data[0].catalogId);

    if (data[0].parentId != null) {
      this.parentCategory = true;
      this.parentList = this.allCategoryList.filter(c => c.parentId == data[0].categoryId);
    }

    this.defaultImage = data[0].image;

    this.createForm.get("id")?.setValue(data[0].id);
    this.createForm.get("catalogId")?.setValue(data[0].catalogId);
    this.createForm.get("parentId")?.setValue(data[0].parentId);
    this.createForm.get("categoryId")?.setValue(data[0].categoryId);
    this.createForm.get("adsName")?.setValue(data[0].adsName);
    this.createForm.get("adsBody")?.setValue(data[0].adsBody);
    this.createForm.get("price")?.setValue(data[0].price);
    this.createForm.get("cityId")?.setValue(data[0].cityId);
    this.createForm.get("regionId")?.setValue(data[0].regionId);
    this.createForm.get("address")?.setValue(data[0].address);
    this.createForm.get("phoneNumber")?.setValue(data[0].phoneNumber);
  }

  selectCatalog(value: string) {
    let n = Number.parseInt(value);
    this.categoryList = this.allCategoryList.filter(c => c.catalogId == n && c.parentId == null);
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

    if (this.allRegions.length > 0) {

      let n = Number.parseInt(value);
      this.regionsList = this.allRegions.filter(c => c.cityId == n);
    }
  }

  handleFileSelect(evt: any) {
    this.imageChanged = true;

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

  save() {
    if (this.createForm.valid) {

      let data = this.createForm.value;

      let index = this.allAnnouncements.findIndex(c => c.id == data.id);

      if (this.imageChanged) {
        this.defaultImage = this.imageType + this.base64textString;
      }

      this.allAnnouncements[index] = data;
      this.allAnnouncements[index].image = this.defaultImage;
      this.allAnnouncements[index].cdate = new Date();

      localStorage.setItem("announcements", JSON.stringify(this.allAnnouncements));

      this.router.navigate(['/announcement']);
    }
  }

}
