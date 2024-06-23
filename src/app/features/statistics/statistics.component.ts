import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { AdminSidebarComponent } from '../panels/admin/components/sidebar/adminSidebar.component';
import { DoctorService } from '../doctors/services/doctor.service';
import { PatientService } from '../Patients/patient.service';
import { AppointmentService } from '../appointments/services/appointment.service';




@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  patientCount: number;
  activeUsers: number;
  pageViews: number;
  doctorCount: number; // Doktor sayısı için değişken;
  appointmentCount: number;

  constructor(private doctorService: DoctorService, private patientService: PatientService, private appointmentService: AppointmentService) { // DoctorService inject ediliyor
    // Örnek veriler
    this.patientCount = 0;
    this.activeUsers = 150;
    this.pageViews = 5000;
    this.doctorCount = 0; // Başlangıç değeri
    this.appointmentCount = 0;
  }

  ngOnInit(): void {
    // İstatistikleri almak için API çağrıları burada yapılabilir
    this.getDoctorCount(); // Doktor sayısını almak için metot çağrılıyor
    this.getPatientCount();
    this.getAppointmentCount();
  }

  getDoctorCount(): void {
    this.doctorService.getDoctors(0, 1).subscribe((response) => { // Tüm doktorları getirmek yerine sadece toplam sayıyı almak için sayfalama parametreleri kullanılıyor
      this.doctorCount = response.count; // Toplam doktor sayısını alıyoruz
    });
  }

  getPatientCount(): void {
    this.patientService.getPatients(0, 1).subscribe((response) => { // Tüm doktorları getirmek yerine sadece toplam sayıyı almak için sayfalama parametreleri kullanılıyor
      this.patientCount = response.count; // Toplam doktor sayısını alıyoruz
    });
  }

  getAppointmentCount(): void {
    this.appointmentService.getAppointmentId(0, 1).subscribe((response) => { // Tüm doktorları getirmek yerine sadece toplam sayıyı almak için sayfalama parametreleri kullanılıyor
      this.appointmentCount = response.count; // Toplam doktor sayısını alıyoruz
    });
  }
}