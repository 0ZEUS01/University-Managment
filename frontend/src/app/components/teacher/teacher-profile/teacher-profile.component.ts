import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface TeacherProfile {
  fullName: string;
  email: string;
  username: string;
  hireDate: Date;
  department: string;
  academicRank: 'Assistant Professor' | 'Associate Professor' | 'Full Professor' | 'Lecturer';
  courses: number;
  exams: number;
  phoneNumber?: string;
  address?: string;
  personalInfo: {
    gender: 'Male' | 'Female' | 'Other';
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    dateOfBirth: Date;
    nationality: string;
    languages: string[];
  };
  educationBackground: {
    highestDegree: string;
    institution: string;
    graduationYear: number;
    doctoralDegree?: {
      degree: string;
      institution: string;
      graduationYear: number;
    };
  };
  contactInfo: {
    personalEmail: string;
    workEmail: string;
    homePhone?: string;
    socialMedia?: {
      linkedin?: string;
      twitter?: string;
      researchGate?: string;
    };
  };
  researchInterests: string[];
  publications: Array<{
    title: string;
    journal: string;
    year: number;
  }>;
}

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  isEditing = false;
  profileForm: FormGroup;
  
  // Initial profile data
  profile: TeacherProfile = {
    fullName: 'Yahya Zini',
    email: 'yahya.zini@emsi.ma',
    username: 'YahyaZini',
    hireDate: new Date('2022-09-01'),
    department: 'Computer Science',
    academicRank: 'Lecturer',
    courses: 3,
    exams: 5,
    phoneNumber: '+212 6 87 65 43 21',
    address: '456 University Campus, Casablanca, Morocco',
    personalInfo: {
      gender: 'Male',
      maritalStatus: 'Single',
      dateOfBirth: new Date('1990-03-15'),
      nationality: 'Moroccan',
      languages: ['Arabic', 'English', 'French']
    },
    educationBackground: {
      highestDegree: 'Master in Computer Science',
      institution: 'EMSI University',
      graduationYear: 2018,
      doctoralDegree: {
        degree: 'PhD in Artificial Intelligence',
        institution: 'Mohammed V University',
        graduationYear: 2022
      }
    },
    contactInfo: {
      personalEmail: 'yahya.zini@gmail.com',
      workEmail: 'yahya.zini@university.edu',
      homePhone: '+212 5 22 11 22 33',
      socialMedia: {
        linkedin: 'linkedin.com/in/yahyazini',
        twitter: '@YahyaZini',
        researchGate: 'researchgate.net/profile/yahyazini'
      }
    },
    researchInterests: ['Machine Learning', 'Artificial Intelligence', 'Data Science'],
    publications: [
      {
        title: 'Advanced Machine Learning Techniques',
        journal: 'International Journal of AI Research',
        year: 2021
      },
      {
        title: 'Deep Learning in Computer Vision',
        journal: 'AI and Society Journal',
        year: 2022
      }
    ]
  };

  originalProfile: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      fullName: [this.profile.fullName, Validators.required],
      email: [this.profile.email, [Validators.required, Validators.email]],
      phoneNumber: [this.profile.phoneNumber],
      dateOfBirth: [this.profile.personalInfo.dateOfBirth ? 
        this.formatDate(this.profile.personalInfo.dateOfBirth) : null],
      nationality: [this.profile.personalInfo.nationality],
      department: [this.profile.department],
      academicRank: [this.profile.academicRank],
      address: [this.profile.address],
      gender: [this.profile.personalInfo.gender],
      maritalStatus: [this.profile.personalInfo.maritalStatus],
      languages: [this.profile.personalInfo.languages.join(', ')],
      highestDegree: [this.profile.educationBackground.highestDegree],
      institution: [this.profile.educationBackground.institution],
      graduationYear: [this.profile.educationBackground.graduationYear],
      doctoralDegree: [this.profile.educationBackground.doctoralDegree?.degree],
      personalEmail: [this.profile.contactInfo.personalEmail],
      workEmail: [this.profile.contactInfo.workEmail],
      homePhone: [this.profile.contactInfo.homePhone],
      linkedin: [this.profile.contactInfo.socialMedia?.linkedin],
      twitter: [this.profile.contactInfo.socialMedia?.twitter],
      researchGate: [this.profile.contactInfo.socialMedia?.researchGate],
      researchInterests: [this.profile.researchInterests.join(', ')]
    });

    // Store original profile for cancellation
    this.originalProfile = {...this.profileForm.value};
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    
    if (this.isEditing) {
      // Reset form to current profile when entering edit mode
      this.profileForm.patchValue({
        fullName: this.profile.fullName,
        email: this.profile.email,
        phoneNumber: this.profile.phoneNumber,
        dateOfBirth: this.formatDate(this.profile.personalInfo.dateOfBirth),
        nationality: this.profile.personalInfo.nationality,
        department: this.profile.department,
        academicRank: this.profile.academicRank,
        address: this.profile.address,
        gender: this.profile.personalInfo.gender,
        maritalStatus: this.profile.personalInfo.maritalStatus,
        languages: this.profile.personalInfo.languages.join(', '),
        highestDegree: this.profile.educationBackground.highestDegree,
        institution: this.profile.educationBackground.institution,
        graduationYear: this.profile.educationBackground.graduationYear,
        doctoralDegree: this.profile.educationBackground.doctoralDegree?.degree,
        personalEmail: this.profile.contactInfo.personalEmail,
        workEmail: this.profile.contactInfo.workEmail,
        homePhone: this.profile.contactInfo.homePhone,
        linkedin: this.profile.contactInfo.socialMedia?.linkedin,
        twitter: this.profile.contactInfo.socialMedia?.twitter,
        researchGate: this.profile.contactInfo.socialMedia?.researchGate,
        researchInterests: this.profile.researchInterests.join(', ')
      });
    }
  }

  updateProfile() {
    if (this.profileForm.valid) {
      // Update profile with form values
      const formValue = this.profileForm.value;
      
      this.profile = {
        fullName: formValue.fullName,
        email: formValue.email,
        username: this.profile.username, // Preserve existing username
        hireDate: this.profile.hireDate, // Preserve existing hire date
        phoneNumber: formValue.phoneNumber,
        department: formValue.department,
        academicRank: formValue.academicRank,
        courses: this.profile.courses, // Preserve existing course count
        exams: this.profile.exams, // Preserve existing exam count
        address: formValue.address,
        personalInfo: {
          dateOfBirth: new Date(formValue.dateOfBirth),
          nationality: formValue.nationality,
          gender: formValue.gender,
          maritalStatus: formValue.maritalStatus,
          languages: formValue.languages.split(',').map((lang: string) => lang.trim())
        },
        educationBackground: {
          highestDegree: formValue.highestDegree,
          institution: formValue.institution,
          graduationYear: formValue.graduationYear,
          doctoralDegree: formValue.doctoralDegree ? {
            degree: formValue.doctoralDegree,
            institution: this.profile.educationBackground.doctoralDegree?.institution || '',
            graduationYear: this.profile.educationBackground.doctoralDegree?.graduationYear || null
          } : undefined
        },
        contactInfo: {
          personalEmail: formValue.personalEmail,
          workEmail: formValue.workEmail,
          homePhone: formValue.homePhone,
          socialMedia: {
            linkedin: formValue.linkedin,
            twitter: formValue.twitter,
            researchGate: formValue.researchGate
          }
        },
        researchInterests: formValue.researchInterests.split(',').map((interest: string) => interest.trim()),
        publications: this.profile.publications // Preserve existing publications
      };

      // Exit edit mode
      this.isEditing = false;
    }
  }

  cancelEdit() {
    // Revert to original profile
    this.profileForm.reset(this.originalProfile);
    this.isEditing = false;
  }

  logout(): void {
    // Implement logout logic
    // For now, just navigate to sign-in page
    // In a real app, this would involve clearing tokens, etc.
    window.location.href = '/signin';
  }
}
