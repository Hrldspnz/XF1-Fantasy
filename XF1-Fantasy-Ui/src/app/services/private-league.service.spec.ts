import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { PrivateLeagueService } from './private-league.service';

describe('PrivateLeagueService', () => {
  let service: PrivateLeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PrivateLeagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
