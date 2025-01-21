import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-course-detail',
  templateUrl: './teacher-course-detail.component.html',
  styleUrls: ['./teacher-course-detail.component.css']
})
export class TeacherCourseDetailComponent implements OnInit {
  courseCode: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseCode = this.route.snapshot.paramMap.get('courseCode') || '';
  }
}
