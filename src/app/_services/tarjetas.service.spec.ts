import { TestBed } from '@angular/core/testing';

import { TarjetasService } from './tarjetas.service';

describe('TarjetasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TarjetasService = TestBed.get(TarjetasService);
    expect(service).toBeTruthy();
  });
});
