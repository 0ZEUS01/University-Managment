import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-edit-exam-dialog',
  templateUrl: './teacher-edit-exam-dialog.component.html',
  styleUrls: ['./teacher-edit-exam-dialog.component.css']
})
export class TeacherEditExamDialogComponent {
  examForm: FormGroup;
  examTypes = ['Midterm', 'Final', 'Quiz', 'Project'];
  durationUnits = ['minutes', 'days', 'weeks'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TeacherEditExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.examForm = this.fb.group({
      courseName: [data.courseName, Validators.required],
      name: [data.name, Validators.required],
      type: [data.type, Validators.required],
      date: [new Date(data.date), Validators.required],
      duration: [data.duration, [Validators.required, Validators.min(1)]],
      durationUnit: [data.durationUnit, Validators.required]
    });
  }

  onSave(): void {
    if (this.examForm.valid) {
      this.dialogRef.close(this.examForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
