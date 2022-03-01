import { TestBed } from '@angular/core/testing';

import { OktaAuthenticationService } from './okta-authentication.service';

describe('OktaAuthenticationService', () => {
  let service: OktaAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
