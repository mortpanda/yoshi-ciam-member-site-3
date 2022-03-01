import { TestBed } from '@angular/core/testing';

import { OktaSDKAuthService } from './okta-auth.service';

describe('OktaAuthService', () => {
  let service: OktaAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
