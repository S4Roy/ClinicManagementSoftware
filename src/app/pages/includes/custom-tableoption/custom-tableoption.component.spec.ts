import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableoptionComponent } from './custom-tableoption.component';

describe('CustomTableoptionComponent', () => {
  let component: CustomTableoptionComponent;
  let fixture: ComponentFixture<CustomTableoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTableoptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTableoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
