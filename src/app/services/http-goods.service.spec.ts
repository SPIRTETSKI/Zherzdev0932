import { TestBed } from '@angular/core/testing';

import { HttpGoodsService } from './http-goods.service';

describe('HttpGoodsService', () => {
  let service: HttpGoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
