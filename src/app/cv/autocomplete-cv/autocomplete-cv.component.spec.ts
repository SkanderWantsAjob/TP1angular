import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteCvComponent } from './autocomplete-cv.component';

describe('AutocompleteCvComponent', () => {
  let component: AutocompleteCvComponent;
  let fixture: ComponentFixture<AutocompleteCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
