import { TestBed } from '@angular/core/testing';

import { RecursosService } from './recursos.service';

describe('RecursosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecursosService = TestBed.get(RecursosService);
    expect(service).toBeTruthy();
  });
});
