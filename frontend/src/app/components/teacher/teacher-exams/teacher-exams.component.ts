import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherEditExamDialogComponent } from '../teacher-edit-exam-dialog/teacher-edit-exam-dialog.component';
import { TeacherCreateExamDialogComponent } from '../teacher-create-exam-dialog/teacher-create-exam-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Exam {
  courseName: string;
  name: string;
  type: string;
  date: Date;
  duration: number;
  durationUnit: string;
}

@Component({
  selector: 'app-teacher-exams',
  templateUrl: './teacher-exams.component.html',
  styleUrls: ['./teacher-exams.component.css']
})
export class TeacherExamsComponent implements OnInit {
  displayedColumns: string[] = ['course', 'name', 'type', 'date', 'duration', 'actions'];
  
  examsDataSource: MatTableDataSource<Exam>;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    const exams: Exam[] = [
      // Advanced Web Development
      {
        courseName: 'Advanced Web Development',
        name: 'Midterm Exam',
        type: 'Midterm',
        date: new Date('2025-03-15'),
        duration: 120,
        durationUnit: 'minutes'
      },
      {
        courseName: 'Advanced Web Development',
        name: 'Final Exam',
        type: 'Final',
        date: new Date('2025-05-20'),
        duration: 180,
        durationUnit: 'minutes'
      },
      {
        courseName: 'Advanced Web Development',
        name: 'Project',
        type: 'Project',
        date: new Date('2025-04-30'),
        duration: 2,
        durationUnit: 'weeks'
      },
      // Machine Learning Fundamentals
      {
        courseName: 'Machine Learning Fundamentals',
        name: 'Midterm Exam',
        type: 'Midterm',
        date: new Date('2025-03-18'),
        duration: 120,
        durationUnit: 'minutes'
      },
      {
        courseName: 'Machine Learning Fundamentals',
        name: 'Final Exam',
        type: 'Final',
        date: new Date('2025-05-22'),
        duration: 180,
        durationUnit: 'minutes'
      },
      {
        courseName: 'Machine Learning Fundamentals',
        name: 'Quiz 1',
        type: 'Quiz',
        date: new Date('2025-02-15'),
        duration: 30,
        durationUnit: 'minutes'
      },
      // Database Systems and Design
      {
        courseName: 'Database Systems and Design',
        name: 'Midterm Exam',
        type: 'Midterm',
        date: new Date('2025-03-20'),
        duration: 120,
        durationUnit: 'minutes'
      },
      {
        courseName: 'Database Systems and Design',
        name: 'Final Exam',
        type: 'Final',
        date: new Date('2025-05-25'),
        duration: 180,
        durationUnit: 'minutes'
      },
      {
        courseName: 'Database Systems and Design',
        name: 'Quiz 1',
        type: 'Quiz',
        date: new Date('2025-02-20'),
        duration: 30,
        durationUnit: 'minutes'
      },
      {
        courseName: 'Database Systems and Design',
        name: 'Quiz 2',
        type: 'Quiz',
        date: new Date('2025-04-05'),
        duration: 30,
        durationUnit: 'minutes'
      },
      // Software Engineering Principles
      {
        courseName: 'Software Engineering Principles',
        name: 'Midterm Exam',
        type: 'Midterm',
        date: new Date('2025-03-22'),
        duration: 120,
        durationUnit: 'minutes'
      },
      {
        courseName: 'Software Engineering Principles',
        name: 'Final Exam',
        type: 'Final',
        date: new Date('2025-05-28'),
        duration: 180,
        durationUnit: 'minutes'
      },
      {
        courseName: 'Software Engineering Principles',
        name: 'Project',
        type: 'Project',
        date: new Date('2025-05-15'),
        duration: 10,
        durationUnit: 'days'
      }
    ];

    this.examsDataSource = new MatTableDataSource(exams);
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/signin']);
    }
  }

  formatDuration(duration: number, unit: string): string {
    return `${duration} ${unit}`;
  }

  createNewExam(): void {
    const dialogRef = this.dialog.open(TeacherCreateExamDialogComponent, {
      width: '600px',
      height: '700px',
      panelClass: 'edit-exam-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the new exam to the list
        const newExam: Exam = {
          courseName: result.courseName,
          name: result.name,
          type: result.type,
          date: result.date,
          duration: result.duration,
          durationUnit: result.durationUnit
        };
        
        const updatedData = [...this.examsDataSource.data, newExam];
        this.examsDataSource.data = updatedData;
        this.snackBar.open('Exam created successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  editExam(exam: Exam): void {
    const dialogRef = this.dialog.open(TeacherEditExamDialogComponent, {
      data: { ...exam },
      width: '600px',
      height: '700px',
      panelClass: 'edit-exam-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const examIndex = this.examsDataSource.data.findIndex(e => 
          e.courseName === exam.courseName && 
          e.name === exam.name && 
          e.type === exam.type
        );

        if (examIndex !== -1) {
          const updatedData = [...this.examsDataSource.data];
          updatedData[examIndex] = { ...result };
          this.examsDataSource.data = updatedData;
          
          this.snackBar.open('Exam updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      }
    });
  }

  deleteExam(exam: Exam): void {
    const updatedData = this.examsDataSource.data.filter(e => 
      !(e.courseName === exam.courseName && 
        e.name === exam.name && 
        e.type === exam.type)
    );
    
    this.examsDataSource.data = updatedData;
    
    this.snackBar.open('Exam deleted successfully', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  getExamTypeClass(type: string): string {
    switch(type.toLowerCase()) {
      case 'midterm': return 'exam-midterm';
      case 'final': return 'exam-final';
      case 'quiz': return 'exam-quiz';
      case 'project': return 'exam-project';
      default: return '';
    }
  }
}
