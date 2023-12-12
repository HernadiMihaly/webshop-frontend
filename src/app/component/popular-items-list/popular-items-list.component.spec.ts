import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularItemsListComponent } from './popular-items-list.component';

describe('PopularItemsListComponent', () => {
  let component: PopularItemsListComponent;
  let fixture: ComponentFixture<PopularItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularItemsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
