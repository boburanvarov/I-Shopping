import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-announcement-profile',
  templateUrl: './announcement-profile.component.html',
  styleUrls: ['./announcement-profile.component.css']
})
export class AnnouncementProfileComponent implements OnInit {

  constructor(private currentRoute: ActivatedRoute,
    private router: Router) { }

    announcements: any = '';
    id: number = -1;
    announcementsList: Array<any> = [];
    cityList: Array<any> = [];
    regionList: Array<any> = [];
    catalogList: Array<any> = [];
    categoryList: Array<any> = [];

  ngOnInit(): void {

    let id =this.currentRoute.snapshot.paramMap.get("id");

    if(id != null){
      this.id = Number.parseInt(id);
    }

    let announcements = localStorage.getItem("announcements");

    if(announcements != null){

      let catalog = localStorage.getItem("catalog");
      if(catalog != null){
        this.catalogList = JSON.parse(catalog);
      }

      let category = localStorage.getItem("category");
      if(category != null){
        this.categoryList = JSON.parse(category);
      }

      let cities = localStorage.getItem("cities");
      if(cities != null){
        this.cityList = JSON.parse(cities);
      }

      let regions = localStorage.getItem("regions");
      if(regions !=null){
        this.regionList = JSON.parse(regions);
      }

      this.announcementsList = JSON.parse(announcements);

      let data = this.announcementsList.filter(c => c.id == this.id);

      if(data == null || data.length ==0){

        this.router.navigate(["announcements"]);
      }

      this.announcements = {
        id: data[0].id,
        catalogName: this.getCatalogName(this.catalogList, data[0].catalogId),
        categoryName: this.getCategoryName(this.categoryList, data[0].categoryId),
        parentName: data[0].parentId == null ? '-' : this.getParentName(this.categoryList, data[0].parentId),
        date: data[0].cdate,
        adsName: data[0].adsName,
        adsBody: data[0].adsBody,
        price: data[0].price,
        phoneNumber: data[0].phoneNumber,
        cityName: this.getCityName(this.cityList, data[0].cityId),
        regionName: this.getRegionName(this.regionList, data[0].regionId),
        address: data[0].address,
      }
    }
  }

  getCatalogName(catalog: Array<any>, catalogId: number) {
    let data = catalog.filter(c => c.id == catalogId);
    if(data.length > 0){
      return data[0].catalogName;
    }

    return '';
  }

  getCategoryName(category: Array<any>, categoryId: number) {
    let data = category.filter(c => c.categoryId == categoryId);
    if(data.length > 0){
      return data[0].categoryName;
    }

    return '';
  }

  getParentName(category: Array<any>, parentId: number){
    let data = category.filter(c => c.categoryId == parentId);
    if(data.length > 0){
      return data[0].categoryName;
    }

    return '';
  }


  getCityName(city: Array<any>, cityId: number) {
    let data = city.filter(c => c.id == cityId);
    if(data.length > 0){
      return data[0].name;
    }

    return '';
  }

  getRegionName(region: Array<any>, regionId: number) {
    let data = region.filter(c =>c.id == regionId);
    if(data.length >0){
      return data[0].name
    }

    return '';
  }

}
