import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogProfileComponent } from './catalog-profile.component';

describe('CatalogProfileComponent', () => {
  let component: CatalogProfileComponent;
  let fixture: ComponentFixture<CatalogProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
