import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebnotesComponent } from './webnotes.component';

describe('WebnotesComponent', () => {
  let component: WebnotesComponent;
  let fixture: ComponentFixture<WebnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
