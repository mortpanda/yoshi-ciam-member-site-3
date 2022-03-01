import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCartNotificationComponent } from './empty-cart-notification.component';

describe('EmptyCartNotificationComponent', () => {
  let component: EmptyCartNotificationComponent;
  let fixture: ComponentFixture<EmptyCartNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyCartNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCartNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
