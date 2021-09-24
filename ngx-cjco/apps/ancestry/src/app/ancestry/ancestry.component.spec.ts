import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AncestryComponent } from './ancestry.component';

describe('GenericHttpComponent', () => {
  let component: AncestryComponent;
  let fixture: ComponentFixture<AncestryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AncestryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AncestryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
