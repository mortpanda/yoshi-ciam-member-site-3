import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkModalComponent } from './sdk-modal.component';

describe('SdkModalComponent', () => {
  let component: SdkModalComponent;
  let fixture: ComponentFixture<SdkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdkModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
