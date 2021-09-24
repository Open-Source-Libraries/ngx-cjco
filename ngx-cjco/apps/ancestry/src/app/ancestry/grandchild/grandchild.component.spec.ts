import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GrandchildComponent } from './grandchild.component';

describe('RootGrandchildComponent', () => {
  let component: GrandchildComponent;
  let fixture: ComponentFixture<GrandchildComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
