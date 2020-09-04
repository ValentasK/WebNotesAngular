import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteByIdComponent } from './note-by-id.component';

describe('NoteByIdComponent', () => {
  let component: NoteByIdComponent;
  let fixture: ComponentFixture<NoteByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
