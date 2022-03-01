import { TestBed } from '@angular/core/testing';

import { OktaGetUserService } from './okta-get-user.service';

describe('OktaGetUserService', () => {
  let service: OktaGetUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaGetUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
