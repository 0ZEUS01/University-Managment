import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExamsComponent } from './teacher-exams.component';

describe('TeacherExamsComponent', () => {
  let component: TeacherExamsComponent;
  let fixture: ComponentFixture<TeacherExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherExamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
