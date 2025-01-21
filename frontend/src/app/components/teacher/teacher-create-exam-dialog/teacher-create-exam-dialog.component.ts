import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-create-exam-dialog',
  templateUrl: './teacher-create-exam-dialog.component.html',
  styleUrls: ['./teacher-create-exam-dialog.component.css']
})
export class TeacherCreateExamDialogComponent implements OnInit {
  examForm: FormGroup;
  examTypes = ['Midterm', 'Final', 'Quiz', 'Project'];
  durationUnits = ['minutes', 'hours', 'days', 'weeks'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TeacherCreateExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.examForm = this.fb.group({
      courseName: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      durationUnit: ['minutes', Validators.required]
    });
  }

  ngOnInit(): void {
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
