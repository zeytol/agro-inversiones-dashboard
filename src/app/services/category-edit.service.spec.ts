import { TestBed } from '@angular/core/testing';

import { CategoryEditService } from './category-edit.service';

describe('CategoryEditService', () => {
  let service: CategoryEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
