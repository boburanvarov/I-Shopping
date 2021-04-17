import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog-edit',
  templateUrl: './catalog-edit.component.html',
  styleUrls: ['./catalog-edit.component.css']
})
export class CatalogEditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router) { }

  createForm = this.fb.group({
    catalogName: ['', Validators.required],
    image: ['', Validators.required]
  })

  catalogList: Array<any> = [];
  catalogId: number = -1;
  base64textString: string = "";
  imageType: string = "";
  imageChanged: boolean = false;

  ngOnInit(): void {

    let id = this.currentRoute.snapshot.paramMap.get("id");
    if (id != null) {
      this.catalogId = Number.parseInt(id);
    }

    let catalog = localStorage.getItem("catalog");

    if (catalog != null) {
      this.catalogList = JSON.parse(catalog);

      let data = this.catalogList.filter(c => c.id == this.catalogId);

      console.log(data);
      

      if (data == null) {

        this.router.navigate(['catalog']);
      }

      this.createForm.get("catalogName")?.setValue(data[0].catalogName);
    }
  }

  save() {

    if (this.createForm.valid) {

      let data = this.createForm.value;

      let catalog = this.catalogList.filter(c => c.id == this.catalogId);

      if (catalog != null && catalog.length > 0) {

        catalog[0].catalogName = data.catalogName;

        if (this.imageChanged) {
          catalog[0].catalogImage = this.imageType + this.base64textString;
        }
      }

      localStorage.setItem("catalog", JSON.stringify(this.catalogList));
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

}
