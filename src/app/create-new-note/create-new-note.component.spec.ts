import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewNoteComponent } from './create-new-note.component';

describe('CreateNewNoteComponent', () => {
  let component: CreateNewNoteComponent;
  let fixture: ComponentFixture<CreateNewNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
