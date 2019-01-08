import { TestBed } from '@angular/core/testing';

import { PuestoscontrolService } from './puestoscontrol.service';

describe('PuestoscontrolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuestoscontrolService = TestBed.get(PuestoscontrolService);
    expect(service).toBeTruthy();
  });
});
