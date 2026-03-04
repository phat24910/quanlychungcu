import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyCuDanComponent } from './quan-ly-cu-dan.component';

describe('QuanLyCuDanComponent', () => {
  let component: QuanLyCuDanComponent;
  let fixture: ComponentFixture<QuanLyCuDanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanLyCuDanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLyCuDanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
