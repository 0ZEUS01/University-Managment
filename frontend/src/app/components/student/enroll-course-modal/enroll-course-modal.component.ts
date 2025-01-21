import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-enroll-course-modal',
  templateUrl: './enroll-course-modal.component.html',
  styleUrls: ['./enroll-course-modal.component.css']
})
export class EnrollCourseModalComponent implements OnInit {
  enrollForm: FormGroup;

  availableCourses = [
    { 
      code: 'JEE002', 
      name: 'JEE 2', 
      instructor: 'Zini Yahya',
      credits: 3 
    },
    { 
      code: 'INF201', 
      name: 'Structures de Données', 
      instructor: 'Pr. Mohammed Benali',
      credits: 4 
    },
    { 
      code: 'MATH301', 
      name: 'Calcul Avancé', 
      instructor: 'Dr. Aisha Tazi',
      credits: 4 
    },
    { 
      code: 'INF302', 
      name: 'Réseaux et Sécurité', 
      instructor: 'Pr. Youssef Amrani',
      credits: 3 
    },
    { 
      code: 'INF303', 
      name: 'Intelligence Artificielle', 
      instructor: 'Dr. Leila Bouazza',
      credits: 4 
    }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EnrollCourseModalComponent>
  ) { }

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      selectedCourse: [null, Validators.required]
    });

    // Configure dialog size and prevent resizing
    this.dialogRef.updateSize('350px', 'auto');
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      this.dialogRef.close(this.enrollForm.get('selectedCourse').value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
