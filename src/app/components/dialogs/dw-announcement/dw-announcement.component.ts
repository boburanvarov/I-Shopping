import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../navbar/navbar.component';

@Component({
  selector: 'app-dw-announcement',
  templateUrl: './dw-announcement.component.html',
  styleUrls: ['./dw-announcement.component.css']
})
export class DwAnnouncementComponent implements OnInit {

  announcement: any;

  constructor(
    public dialogRef: MatDialogRef<DwAnnouncementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.announcement = this.data.announcement;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
