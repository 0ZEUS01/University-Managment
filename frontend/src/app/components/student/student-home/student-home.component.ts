import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

interface Course {
  name: string;
  code: string;
  description?: string;
  instructor: string;
  semester?: string;
}

interface Grade {
  courseName: string;
  examName: string;
  score: number;
  maxScore: number;
}

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  username: string = '';
  
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
    }
  ];

  gradesDataSource: MatTableDataSource<Grade>;
  gradeColumns: string[] = ['course', 'exam', 'grade', 'performance'];
  totalGradesCount: number;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    const grades = [
      {
        courseName: 'Introduction to Programming',
        examName: 'Midterm Exam',
        score: 14,
        maxScore: 20
      },
      {
        courseName: 'Data Structures',
        examName: 'Quiz 1',
        score: 16,
        maxScore: 20
      },
      {
        courseName: 'Web Development Fundamentals',
        examName: 'Practical Assignment',
        score: 12,
        maxScore: 20
      },
      {
        courseName: 'Database Management',
        examName: 'Midterm Exam',
        score: 15,
        maxScore: 20
      },
      {
        courseName: 'Computer Networks',
        examName: 'Quiz 2',
        score: 13,
        maxScore: 20
      }
    ];

    // Store total count and slice to 3 items
    this.totalGradesCount = grades.length;
    const limitedGrades = grades.slice(0, 3);

    this.gradesDataSource = new MatTableDataSource<Grade>(limitedGrades);
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    this.username = currentUser ? currentUser.username : 'Student';
  }

  calculatePerformance(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Very Good';
    if (percentage >= 70) return 'Good';
    if (percentage >= 60) return 'Satisfactory';
    return 'Needs Improvement';
  }

  getGradeBadgeClass(score: number): string {
    const percentage = (score / 20) * 100;
    if (percentage >= 90) return 'grade-excellent';
    if (percentage >= 80) return 'grade-very-good';
    if (percentage >= 70) return 'grade-good';
    if (percentage >= 60) return 'grade-satisfactory';
    return 'grade-needs-improvement';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
