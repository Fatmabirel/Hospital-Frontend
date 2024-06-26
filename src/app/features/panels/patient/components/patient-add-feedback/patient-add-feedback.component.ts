import { Component } from '@angular/core';
import { Patient } from '../../../../Patients/patientModel';
import { Feedback } from '../../../../feedbacks/models/feedback';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../../../feedbacks/services/feedback.service';
import { PatientService } from '../../../../Patients/patient.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientSidebarComponent } from '../sidebar/psidebar.component';

@Component({
  selector: 'app-patient-add-feedback',
  standalone: true,
  imports: [CommonModule,PatientSidebarComponent,ReactiveFormsModule],
  templateUrl: './patient-add-feedback.component.html',
  styleUrl: './patient-add-feedback.component.scss'
})
export class PatientAddFeedbackComponent {
  patient: Patient;
  userID: string;
  feedbacks: Feedback[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  feedbackForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private patientService: PatientService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.feedbackForm = this.formBuilder.group({
      userID: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.patientService.getPatientProfile().subscribe((patient) => {
      this.patient = patient;
      this.userID = patient.id;
      this.feedbackForm.patchValue({
        userID: this.userID
      });
    });
  }

  addFeedback(): void {
    if (this.feedbackForm.valid) {
      this.feedbackService.addFeedback(this.feedbackForm.value).subscribe(
        (response) => {
          this.toastrService.success('Geri bildirim başarıyla eklendi');
          this.router.navigate(['/patient-feedbacks']);
        },
        (error) => {
          this.toastrService.error('Geri bildirim eklenemedi!');
        }
      );
    } else {
      this.toastrService.error('Eksik alanlarını doldurunuz.');
    }
  }
}
