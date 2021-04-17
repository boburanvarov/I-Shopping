import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog-create',
  templateUrl: './catalog-create.component.html',
  styleUrls: ['./catalog-create.component.css']
})
export class CatalogCreateComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  createForm = this.fb.group({
    catalogName: ['', Validators.required],
    image: ['', Validators.required]
  })

  catalogList: Array<any> = [];
  base64textString: string = "";
  imageType: string = "";

  ngOnInit(): void {

    let catalog = localStorage.getItem("catalog");

    if (catalog != null) {
      this.catalogList = JSON.parse(catalog);
      console.log(this.catalogList);
    }
  }

  create() {

    if (this.createForm.valid) {

      let data = this.createForm.value;

      if (this.checkUnique(data.catalogName)) {

        let newData = {
          id: this.catalogList.length + 1,
          catalogName: data.catalogName,
          catalogImage: this.imageType + this.base64textString
        }

        this.catalogList.push(newData);

        localStorage.setItem("catalog", JSON.stringify(this.catalogList));

        this.createForm.reset();
      }

      else {
        alert("Katalogda bunday ma'lumot mavjud !")
      }
    }
  }

  checkUnique(catalogName: string) {

    return this.catalogList.filter(c => String(c.catalogName).toLowerCase() == catalogName.toLowerCase()
      .trim()).length == 0;
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


}
