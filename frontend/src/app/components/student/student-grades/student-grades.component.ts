import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

interface Grade {
  courseName: string;
  examName: string;
  score: number;
  maxScore: number;
}

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css']
})
export class StudentGradesComponent implements OnInit {
  gradesDataSource: MatTableDataSource<Grade>;
  displayedColumns: string[] = ['course', 'exam', 'grade', 'performance'];

  constructor(private authService: AuthService) { 
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

    this.gradesDataSource = new MatTableDataSource<Grade>(grades);
  }

  ngOnInit(): void { }

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
  }
}
