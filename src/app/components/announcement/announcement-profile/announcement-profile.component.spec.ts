import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementProfileComponent } from './announcement-profile.component';

describe('AnnouncementProfileComponent', () => {
  let component: AnnouncementProfileComponent;
  let fixture: ComponentFixture<AnnouncementProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
