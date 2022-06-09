import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PublicLeagueService } from './public-league.service';

describe('PublicLeagueService', () => {
  let service: PublicLeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PublicLeagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
