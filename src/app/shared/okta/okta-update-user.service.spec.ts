import { TestBed } from '@angular/core/testing';

import { OktaUpdateUserService } from './okta-update-user.service';

describe('OktaUpdateUserService', () => {
  let service: OktaUpdateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OktaUpdateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
