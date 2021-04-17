import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementCreateComponent } from './components/announcement/announcement-create/announcement-create.component';
import { AnnouncementEditComponent } from './components/announcement/announcement-edit/announcement-edit.component';
import { AnnouncementListComponent } from './components/announcement/announcement-list/announcement-list.component';
import { AnnouncementProfileComponent } from './components/announcement/announcement-profile/announcement-profile.component';
import { CatalogCreateComponent } from './components/catalog/catalog-create/catalog-create.component';
import { CatalogEditComponent } from './components/catalog/catalog-edit/catalog-edit.component';
import { CatalogListComponent } from './components/catalog/catalog-list/catalog-list.component';
import { CatalogProfileComponent } from './components/catalog/catalog-profile/catalog-profile.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryProfileComponent } from './components/category/category-profile/category-profile.component';

const routes: Routes = [
  {
    path: 'catalog', component: CatalogListComponent
  },
  {
    path: 'catalog/create', component: CatalogCreateComponent
  },
  {
    path: 'catalog/profile/:id', component: CatalogProfileComponent
  },
  {
    path: 'catalog/edit/:id', component: CatalogEditComponent
  },

  {
    path: 'category', component: CategoryListComponent
  },
  {
    path: 'category/create', component: CategoryCreateComponent
  },
  {
    path: 'category/profile/:id', component: CategoryProfileComponent
  },
  {
    path: 'category/edit/:id', component: CategoryEditComponent
  },

  {
    path: 'announcement', component: AnnouncementListComponent
  },
  {
    path: 'announcement/create', component: AnnouncementCreateComponent
  },
  {
    path: 'announcement/profile/:id', component: AnnouncementProfileComponent
  },
  {
    path: 'announcement/edit/:id', component: AnnouncementEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
