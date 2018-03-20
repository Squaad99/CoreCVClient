import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardSettingsComponent } from './dash-board-settings.component';

describe('DashBoardSettingsComponent', () => {
  let component: DashBoardSettingsComponent;
  let fixture: ComponentFixture<DashBoardSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
