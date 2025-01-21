import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../teacher-courses/teacher-courses.component';

interface CourseDialogData {
  course?: Partial<Course>;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-teacher-create-course-dialog',
  templateUrl: './teacher-create-course-dialog.component.html',
  styleUrls: ['./teacher-create-course-dialog.component.css']
})
export class TeacherCreateCourseDialogComponent implements OnInit {
  courseForm: FormGroup;
  dialogTitle: string;
  submitButtonText: string;

  semesters = [
    { value: '1st', viewValue: '1st Semester' },
    { value: '2nd', viewValue: '2nd Semester' }
  ];

  specialties = [
    'Computer Science',
    'Software Engineering',
    'Data Science',
    'Artificial Intelligence',
    'Cybersecurity',
    'Network Engineering'
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TeacherCreateCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseDialogData
  ) {
    // Initialize form with default or existing values
    const courseData = data?.course || {};
    
    this.courseForm = this.fb.group({
      code: [courseData.code ?? '', [Validators.required, Validators.pattern(/^[A-Z]{3}\d{3}$/)]],
      name: [courseData.name ?? '', [Validators.required, Validators.minLength(5)]],
      specialty: [courseData.specialty ?? '', Validators.required],
      semester: [courseData.semester ?? '', Validators.required],
      students: [courseData.students ?? 30, [Validators.required, Validators.min(10), Validators.max(50)]]
    });

    // Set dialog title and button text based on mode
    this.dialogTitle = data?.mode === 'edit' ? 'Edit Course' : 'Create New Course';
    this.submitButtonText = data?.mode === 'edit' ? 'Update Course' : 'Create Course';
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.dialogRef.close({
        ...this.courseForm.value,
        id: this.data?.course?.id // Preserve the original ID when editing
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Getter methods for easy form validation in template
  get code() { return this.courseForm.get('code'); }
  get name() { return this.courseForm.get('name'); }
  get specialty() { return this.courseForm.get('specialty'); }
  get semester() { return this.courseForm.get('semester'); }
  get students() { return this.courseForm.get('students'); }
}
