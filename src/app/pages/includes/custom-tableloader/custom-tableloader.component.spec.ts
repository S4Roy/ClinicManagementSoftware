import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableloaderComponent } from './custom-tableloader.component';

describe('CustomTableloaderComponent', () => {
  let component: CustomTableloaderComponent;
  let fixture: ComponentFixture<CustomTableloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTableloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTableloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
