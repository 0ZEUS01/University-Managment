import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {
  username: string = '';
  fullName: string = '';
  totalStudents: number = 0;
  totalCoursesCount: number = 0;
  totalExamsCount: number = 0;
  
  recentCourses = [
    {
      id: 1,
      name: 'Advanced Web Development',
      code: 'CSC301',
      description: 'Learn modern web development techniques and frameworks',
      studentCount: 35,
      examCount: 3,
      color: '#2196F3',
      specialty: 'Computer Science',
      semester: '1st'
    },
    {
      id: 2,
      name: 'Machine Learning Fundamentals',
      code: 'CSC302',
      description: 'Introduction to machine learning concepts and algorithms',
      studentCount: 32,
      examCount: 3,
      color: '#FF4081',
      specialty: 'Computer Science',
      semester: '2nd'
    },
    {
      id: 3,
      name: 'Database Systems and Design',
      code: 'CSC303',
      description: 'Learn database design principles and SQL',
      studentCount: 28,
      examCount: 2,
      color: '#4CAF50',
      specialty: 'Computer Science',
      semester: '1st'
    }
  ];

  recentExams = [
    {
      id: 1,
      name: 'Quiz 1',
      courseName: 'Machine Learning Fundamentals',
      type: 'Quiz',
      date: new Date('2025-02-15'),
      duration: 30,
      durationUnit: 'minutes'
    },
    {
      id: 2,
      name: 'Midterm Exam',
      courseName: 'Advanced Web Development',
      type: 'Midterm',
      date: new Date('2025-03-15'),
      duration: 120,
      durationUnit: 'minutes'
    },
    {
      id: 3,
      name: 'Project',
      courseName: 'Advanced Web Development',
      type: 'Project',
      date: new Date('2025-04-30'),
      duration: 2,
      durationUnit: 'weeks'
    }
  ];

  courses: Course[] = [
    {
      name: 'Advanced Web Development',
      code: 'CSC301',
      description: 'Learn modern web development techniques and frameworks',
      studentCount: 35,
      semester: '1st',
      instructor: ''
    },
    {
      name: 'Machine Learning Fundamentals',
      code: 'CSC302',
      description: 'Introduction to machine learning concepts and algorithms',
      studentCount: 32,
      semester: '2nd',
      instructor: ''
    },
    {
      name: 'Database Systems and Design',
      code: 'CSC303',
      description: 'Learn database design principles and SQL',
      studentCount: 28,
      semester: '1st',
      instructor: ''
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // Calculate total students
    this.totalStudents = this.recentCourses.reduce((total, course) => total + course.studentCount, 0);
    // Set total courses count
    this.totalCoursesCount = 3;
    // Set total exams count (Advanced Web Dev: 3, Machine Learning: 3, Database: 2)
    this.totalExamsCount = 8;
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.username = currentUser.username;
      // Use username as fullName since AuthResponse doesn't have first/last name
      this.fullName = this.username;

      // Update course instructors to use the full name
      this.courses = this.courses.map(course => ({
        ...course,
        instructor: this.fullName
      }));
    }
  }

  private formatUsername(username: string): string {
    // Split camel case or add spaces between words
    return username
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}

interface Course {
  name: string;
  code: string;
  description: string;
  studentCount: number;
  semester: string;
  instructor: string;
}
