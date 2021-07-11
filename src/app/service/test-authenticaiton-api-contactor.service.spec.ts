import { TestBed } from '@angular/core/testing';
import TestAuthenticaitonApiContactorService from './test-authenticaiton-api-contactor.service';

describe('TestAuthenticaitonApiContactorService', () => {
  let service: TestAuthenticaitonApiContactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestAuthenticaitonApiContactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
