import { TestBed } from '@angular/core/testing';

import { ChatAppService } from './chat-app.service';

describe('ChatAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatAppService = TestBed.get(ChatAppService);
    expect(service).toBeTruthy();
  });
});
