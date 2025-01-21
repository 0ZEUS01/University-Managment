import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { StudentCoursesComponent } from './components/student/student-courses/student-courses.component';
import { StudentGradesComponent } from './components/student/student-grades/student-grades.component';
import { StudentProfileComponent } from './components/student/student-profile/student-profile.component';
import { TeacherHomeComponent } from './components/teacher/teacher-home/teacher-home.component';
import { EnrollCourseModalComponent } from './components/student/enroll-course-modal/enroll-course-modal.component';
import { TeacherLayoutComponent } from './components/teacher/teacher-layout/teacher-layout.component';
import { TeacherCoursesComponent } from './components/teacher/teacher-courses/teacher-courses.component';
import { TeacherExamsComponent } from './components/teacher/teacher-exams/teacher-exams.component';
import { TeacherProfileComponent } from './components/teacher/teacher-profile/teacher-profile.component';
import { TeacherCreateCourseComponent } from './components/teacher/teacher-create-course/teacher-create-course.component';
import { TeacherCourseDetailComponent } from './components/teacher/teacher-course-detail/teacher-course-detail.component';
import { TeacherCreateExamComponent } from './components/teacher/teacher-create-exam/teacher-create-exam.component';
import { TeacherCreateCourseDialogComponent } from './components/teacher/teacher-create-course-dialog/teacher-create-course-dialog.component';
import { TeacherEditExamDialogComponent } from './components/teacher/teacher-edit-exam-dialog/teacher-edit-exam-dialog.component';
import { TeacherCreateExamDialogComponent } from './components/teacher/teacher-create-exam-dialog/teacher-create-exam-dialog.component';

// Services
import { AuthService } from './services/auth.service';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    StudentHomeComponent,
    StudentCoursesComponent,
    StudentGradesComponent,
    StudentProfileComponent,
    TeacherHomeComponent,
    EnrollCourseModalComponent,
    TeacherLayoutComponent,
    TeacherCoursesComponent,
    TeacherExamsComponent,
    TeacherProfileComponent,
    TeacherCreateCourseComponent,
    TeacherCourseDetailComponent,
    TeacherCreateExamComponent,
    TeacherCreateCourseDialogComponent,
    TeacherEditExamDialogComponent,
    TeacherCreateExamDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    // Material Modules
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
