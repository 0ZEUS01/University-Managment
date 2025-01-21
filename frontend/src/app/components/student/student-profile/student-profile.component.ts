import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ProfileInfo {
  fullName: string;
  email: string;
  username: string;
  enrollmentDate: Date;
  major: string;
  dateOfBirth: Date;
  nationality: string;
  academicStatus: 'Active' | 'Probation' | 'Graduated';
  scholarshipStatus: boolean;
  phoneNumber?: string;
  address?: string;
  personalInfo: {
    gender: 'Male' | 'Female' | 'Other';
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    languages: string[];
  };
  educationBackground: {
    highSchool: string;
    highSchoolGradYear: number;
    previousDegrees: Array<{
      degree: string;
      institution: string;
      graduationYear: number;
    }>;
  };
  contactInfo: {
    personalEmail: string;
    workEmail?: string;
    homePhone?: string;
    socialMedia?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
    };
  };
}

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  profile: ProfileInfo = {
    fullName: 'Amal Hida',
    email: 'amal.hida@emsi-edu.ma',
    username: 'AmalHida',
    enrollmentDate: new Date('2024-09-01'),
    major: 'Computer Science',
    dateOfBirth: new Date('2003-05-15'),
    nationality: 'Moroccan',
    academicStatus: 'Active',
    scholarshipStatus: true,
    phoneNumber: '+212 6 12 34 56 78',
    address: '123 Campus Drive, Casablanca, Morocco',
    personalInfo: {
      gender: 'Female',
      maritalStatus: 'Single',
      languages: ['Arabic', 'English', 'French']
    },
    educationBackground: {
      highSchool: 'Lycée Mohammed V, Casablanca',
      highSchoolGradYear: 2021,
      previousDegrees: [
        {
          degree: 'High School Diploma',
          institution: 'Lycée Mohammed V',
          graduationYear: 2021
        }
      ]
    },
    contactInfo: {
      personalEmail: 'amal.hida@gmail.com',
      workEmail: 'amal.hida@university.edu',
      homePhone: '+212 5 22 33 44 55',
      socialMedia: {
        linkedin: 'linkedin.com/in/amalhida',
        twitter: '@AmalHida',
        facebook: 'facebook.com/amal.hida'
      }
    }
  };

  currentUser: any = {};
  profileForm: FormGroup;
  isEditing = false;
  originalProfile: any = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize form
    this.initForm();

    // Get the current logged-in user
    const user = this.authService.currentUserValue;
    
    if (user) {
      // Fetch full user details
      this.userService.getUserProfile(user.username).subscribe(
        (userData) => {
          this.currentUser = userData;
          this.profile = this.currentUser;
          // Store the initial profile as original
          this.originalProfile = { ...this.currentUser };
          // Update form with fetched user data
          this.updateFormWithUserData();
        },
        (error) => {
          console.error('Error fetching user profile', error);
        }
      );
    }
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      fullName: [this.profile.fullName, Validators.required],
      email: [this.profile.email, [Validators.required, Validators.email]],
      phoneNumber: [this.profile.phoneNumber],
      dateOfBirth: [this.profile.dateOfBirth],
      nationality: [this.profile.nationality],
      major: [this.profile.major],
      address: [this.profile.address],
      gender: [this.profile.personalInfo.gender],
      maritalStatus: [this.profile.personalInfo.maritalStatus],
      languages: [this.profile.personalInfo.languages.join(', ')],
      highSchool: [this.profile.educationBackground.highSchool],
      highSchoolGradYear: [this.profile.educationBackground.highSchoolGradYear],
      personalEmail: [this.profile.contactInfo.personalEmail],
      workEmail: [this.profile.contactInfo.workEmail],
      homePhone: [this.profile.contactInfo.homePhone],
      linkedin: [this.profile.contactInfo.socialMedia?.linkedin],
      twitter: [this.profile.contactInfo.socialMedia?.twitter],
      facebook: [this.profile.contactInfo.socialMedia?.facebook]
    });
  }

  updateFormWithUserData(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        fullName: this.currentUser.fullName || '',
        email: this.currentUser.email || '',
        phoneNumber: this.currentUser.phoneNumber || '',
        dateOfBirth: this.currentUser.dateOfBirth ? 
          new Date(this.currentUser.dateOfBirth).toISOString().split('T')[0] : '',
        nationality: this.currentUser.nationality || '',
        major: this.currentUser.major || '',
        address: this.currentUser.address || '',
        gender: this.currentUser.personalInfo.gender || '',
        maritalStatus: this.currentUser.personalInfo.maritalStatus || '',
        languages: this.currentUser.personalInfo.languages.join(', ') || '',
        highSchool: this.currentUser.educationBackground.highSchool || '',
        highSchoolGradYear: this.currentUser.educationBackground.highSchoolGradYear || '',
        personalEmail: this.currentUser.contactInfo.personalEmail || '',
        workEmail: this.currentUser.contactInfo.workEmail || '',
        homePhone: this.currentUser.contactInfo.homePhone || '',
        linkedin: this.currentUser.contactInfo.socialMedia?.linkedin || '',
        twitter: this.currentUser.contactInfo.socialMedia?.twitter || '',
        facebook: this.currentUser.contactInfo.socialMedia?.facebook || ''
      });
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      // Update profile directly in frontend
      this.profile = {
        ...this.profile,
        fullName: this.profileForm.get('fullName').value,
        email: this.profileForm.get('email').value,
        phoneNumber: this.profileForm.get('phoneNumber').value,
        dateOfBirth: this.profileForm.get('dateOfBirth').value,
        nationality: this.profileForm.get('nationality').value,
        major: this.profileForm.get('major').value,
        personalInfo: {
          ...this.profile.personalInfo,
          gender: this.profileForm.get('gender').value,
          maritalStatus: this.profileForm.get('maritalStatus').value,
          languages: this.profileForm.get('languages').value.split(',').map((lang: string) => lang.trim())
        }
      };

      // Update current user with the same data
      this.currentUser = { ...this.profile };

      // Exit edit mode
      this.isEditing = false;

      // Optional: Show a success message
      console.log('Profile updated successfully');
    }
  }

  toggleEdit(): void {
    // Store the original profile data before entering edit mode
    this.originalProfile = { ...this.profile };
    this.isEditing = true;
    this.updateFormWithUserData();
  }

  cancelEdit(): void {
    // Restore the original profile data
    if (this.originalProfile) {
      this.profile = { ...this.originalProfile };
      this.currentUser = { ...this.originalProfile };
      this.updateFormWithUserData();
    }
    
    // Exit edit mode
    this.isEditing = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
