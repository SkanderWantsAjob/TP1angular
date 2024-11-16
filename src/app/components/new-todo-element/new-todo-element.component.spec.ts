import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodoElementComponent } from './new-todo-element.component';

describe('NewTodoElementComponent', () => {
  let component: NewTodoElementComponent;
  let fixture: ComponentFixture<NewTodoElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTodoElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTodoElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
