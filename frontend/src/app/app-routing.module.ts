import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth Components
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';

// Student Components
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { StudentCoursesComponent } from './components/student/student-courses/student-courses.component';
import { StudentGradesComponent } from './components/student/student-grades/student-grades.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';

// Teacher Components
import { TeacherHomeComponent } from './components/teacher/teacher-home/teacher-home.component';
import { TeacherCoursesComponent } from './components/teacher/teacher-courses/teacher-courses.component';
import { TeacherExamsComponent } from './components/teacher/teacher-exams/teacher-exams.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';
import { TeacherLayoutComponent } from './components/teacher/teacher-layout/teacher-layout.component';
import { TeacherCreateCourseComponent } from './components/teacher/teacher-create-course/teacher-create-course.component';
import { TeacherCourseDetailComponent } from './components/teacher/teacher-course-detail/teacher-course-detail.component';
import { TeacherCreateExamComponent } from './components/teacher/teacher-create-exam/teacher-create-exam.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  // Default route
  { path: '', redirectTo: '/signin', pathMatch: 'full' },

  // Authentication Routes
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },

  // Student Routes
  { 
    path: 'student', 
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'STUDENT' },
    children: [
      { path: 'home', component: StudentHomeComponent },
      { path: 'dashboard', component: StudentHomeComponent },
      { path: 'courses', component: StudentCoursesComponent },
      { path: 'courses/enroll', component: StudentCoursesComponent },
      { path: 'courses/:courseCode', component: StudentCoursesComponent },
      { path: 'grades', component: StudentGradesComponent },
      { path: 'profile', component: StudentProfileComponent }
    ]
  },

  // Teacher Routes
  { 
    path: 'teacher', 
    component: TeacherLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'TEACHER' },
    children: [
      { path: 'home', component: TeacherHomeComponent },
      { path: 'courses', component: TeacherCoursesComponent },
      { path: 'courses/create', component: TeacherCreateCourseComponent },
      { path: 'courses/:courseCode', component: TeacherCourseDetailComponent },
      { path: 'exams', component: TeacherExamsComponent },
      { path: 'exams/create', component: TeacherCreateExamComponent },
      { path: 'profile', component: TeacherProfileComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // Catch-all route
  { path: '**', redirectTo: '/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
