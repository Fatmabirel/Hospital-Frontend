import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Patient } from '../../../../Patients/patientModel';
import { PatientService } from '../../../../Patients/patient.service';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-sidebar',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './psidebar.component.html',
  styleUrl: './psidebar.component.scss'

})
export class PatientSidebarComponent implements OnInit{ 
  patient: Patient;
  patientName: string = '';


  errorMessage: string;

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
    private toastrService:ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    //this.getPatientProfile();
    this.patientService.getPatientProfile().subscribe((aaa) => {
      this.patientName = aaa.firstName + ' ' + aaa.lastName;
    });
  }

  getPatientProfile() {
    
  }
  logout(): void {
    this.authService.logout();
    this.toastrService.success('Başarıyla çıkış yaptınız. Giriş sayfasına yönlendiriliyorsunuz', 'Başarılı');
    this.router.navigate(['/']); // Giriş sayfasına yönlendir
  }
}
