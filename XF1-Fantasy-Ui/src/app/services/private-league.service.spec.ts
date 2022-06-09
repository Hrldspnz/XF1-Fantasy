import { TestBed } from '@angular/core/testing';

import { PrivateLeagueService } from './private-league.service';

describe('PrivateLeagueService', () => {
  let service: PrivateLeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateLeagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
