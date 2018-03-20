import { TestBed, inject } from '@angular/core/testing';

import { TitleSettingsService } from './title-settings.service';

describe('TitleSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleSettingsService]
    });
  });

  it('should be created', inject([TitleSettingsService], (service: TitleSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
