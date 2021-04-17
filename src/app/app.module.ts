import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule,} from '@angular/material/table';
import { MatListModule, } from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './layouts/main/main.component';
import { DwLoginComponent } from './components/dialogs/dw-login/dw-login.component';
import { CabinetComponent } from './layouts/cabinet/cabinet.component';
import { ContentComponent } from './components/contents/content.component';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { CatalogCreateComponent } from './components/catalog/catalog-create/catalog-create.component';
import { CatalogEditComponent } from './components/catalog/catalog-edit/catalog-edit.component';
import { CatalogProfileComponent } from './components/catalog/catalog-profile/catalog-profile.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryProfileComponent } from './components/category/category-profile/category-profile.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { AnnouncementListComponent } from './components/announcement/announcement-list/announcement-list.component';
import { AnnouncementCreateComponent } from './components/announcement/announcement-create/announcement-create.component';
import { AnnouncementEditComponent } from './components/announcement/announcement-edit/announcement-edit.component';
import { AnnouncementProfileComponent } from './components/announcement/announcement-profile/announcement-profile.component';
import { SearchService } from './services/search.service';
import { DwAnnouncementComponent } from './components/dialogs/dw-announcement/dw-announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    MenuComponent,
    DwLoginComponent,
    DwAnnouncementComponent,
    CabinetComponent,
    ContentComponent,
    CatalogListComponent,
    CatalogCreateComponent,
    CatalogEditComponent,
    CatalogProfileComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryProfileComponent,
    AnnouncementListComponent,
    AnnouncementCreateComponent,
    AnnouncementEditComponent,
    AnnouncementProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCarouselModule.forRoot(),
    MatSliderModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule, 
    MatButtonModule,
    MatButtonToggleModule,
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
