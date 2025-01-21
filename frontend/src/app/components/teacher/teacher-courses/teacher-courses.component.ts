import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherCreateCourseDialogComponent } from '../teacher-create-course-dialog/teacher-create-course-dialog.component';

export interface Course {
  id: string;
  code: string;
  name: string;
  specialty: string;
  semester: '1st' | '2nd';
  students: number;
}

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'specialty', 'semester', 'students', 'actions'];
  
  coursesDataSource: MatTableDataSource<Course>;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    const courses: Course[] = [
      {
        id: '1',
        code: 'CSC301',
        name: 'Advanced Web Development',
        specialty: 'Computer Science',
        semester: '1st',
        students: 35
      },
      {
        id: '2',
        code: 'CSC302',
        name: 'Machine Learning Fundamentals',
        specialty: 'Computer Science',
        semester: '2nd',
        students: 32
      },
      {
        id: '3',
        code: 'CSC303',
        name: 'Database Systems and Design',
        specialty: 'Computer Science',
        semester: '1st',
        students: 38
      },
      {
        id: '4',
        code: 'CSC304',
        name: 'Software Engineering Principles',
        specialty: 'Computer Science',
        semester: '2nd',
        students: 33
      }
    ];

    this.coursesDataSource = new MatTableDataSource<Course>(courses);
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/signin']);
    }
  }

  viewCourseDetails(course: Course): void {
    this.router.navigate(['/teacher/courses', course.id]);
  }

  createNewCourse(): void {
    const dialogRef = this.dialog.open(TeacherCreateCourseDialogComponent, {
      width: '500px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Generate a unique ID for the new course
        const newCourse: Course = {
          ...result,
          id: (this.coursesDataSource.data.length + 1).toString()
        };

        // Add the new course to the data source
        const currentData = this.coursesDataSource.data;
        this.coursesDataSource.data = [...currentData, newCourse];

        // Show success notification
        this.snackBar.open('Course created successfully', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  editCourse(course: Course): void {
    const dialogRef = this.dialog.open(TeacherCreateCourseDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { 
        course: course, 
        mode: 'edit' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Find and update the course in the data source
        const currentData = this.coursesDataSource.data;
        const updatedData = currentData.map(c => 
          c.id === result.id ? { ...c, ...result } : c
        );
        this.coursesDataSource.data = updatedData;

        // Show success notification
        this.snackBar.open('Course updated successfully', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  deleteCourse(course: Course): void {
    // Remove course from the data source
    const currentData = this.coursesDataSource.data;
    const updatedData = currentData.filter(c => c.id !== course.id);
    this.coursesDataSource.data = updatedData;

    // Show a snackbar notification
    this.snackBar.open(`Deleted course: ${course.name}`, 'Close', {
      duration: 2000,
    });
  }
}
