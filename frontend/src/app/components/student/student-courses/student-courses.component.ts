import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { EnrollCourseModalComponent } from '../enroll-course-modal/enroll-course-modal.component';

interface Course {
  code: string;
  name: string;
  instructor: string;
  description?: string;
  semester?: string;
}

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'instructor', 'actions'];
  courses: Course[] = [
    {
      code: 'CS101',
      name: 'Introduction to Programming',
      instructor: 'Dr. Fatima El Alaoui',
      description: 'Foundational course in programming concepts using Java',
      semester: 'Fall 2024'
    },
    {
      code: 'CS201',
      name: 'Data Structures',
      instructor: 'Prof. Mohammed Benali',
      description: 'Advanced techniques in data organization and algorithm design',
      semester: 'Fall 2024'
    },
    {
      code: 'MATH301',
      name: 'Advanced Calculus',
      instructor: 'Dr. Aisha Tazi',
      description: 'In-depth exploration of advanced mathematical principles',
      semester: 'Fall 2024'
    },
    {
      code: 'CS302',
      name: 'Network Security',
      instructor: 'Prof. Youssef Khattabi',
      description: 'Comprehensive study of network protection and cybersecurity',
      semester: 'Fall 2024'
    },
    {
      code: 'CS303',
      name: 'Artificial Intelligence',
      instructor: 'Dr. Leila Amrani',
      description: 'Introduction to machine learning and intelligent systems',
      semester: 'Fall 2024'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  enrollNewCourse(): void {
    const dialogRef = this.dialog.open(EnrollCourseModalComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the selected course to the courses array
        this.courses = [...this.courses, result];
      }
    });
  }

  removeCourse(courseCode: string): void {
    // Remove the course with the given code
    this.courses = this.courses.filter(course => course.code !== courseCode);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
