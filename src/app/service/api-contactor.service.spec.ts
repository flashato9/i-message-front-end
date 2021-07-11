import { TestBed } from '@angular/core/testing';
import { AuthenticationApiContactorService } from './authentication-api-contactor.service';

describe('ApiContactorService', () => {
  let service: AuthenticationApiContactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationApiContactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
