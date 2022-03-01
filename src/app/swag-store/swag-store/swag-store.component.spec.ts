import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwagStoreComponent } from './swag-store.component';

describe('SwagStoreComponent', () => {
  let component: SwagStoreComponent;
  let fixture: ComponentFixture<SwagStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwagStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwagStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
