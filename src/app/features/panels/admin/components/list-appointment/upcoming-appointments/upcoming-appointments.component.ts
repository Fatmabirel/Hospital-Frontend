import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../../appointments/services/appointment.service';
import { DoctorService } from '../../../../../doctors/services/doctor.service';
import { Appointment } from '../../../../../appointments/models/appointmentModel';
import { Doctor } from '../../../../../doctors/models/doctor';
import { ResponseModel } from '../../../../../models/responseModel';
import { AdminSidebarComponent } from '../../sidebar/adminSidebar.component';
import { response } from 'express';

@Component({
  selector: 'app-upcoming-appointments',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent,RouterModule],
  templateUrl: './upcoming-appointments.component.html',
  styleUrls: ['./upcoming-appointments.component.scss']
})
export class UpcomingAppointmentsComponent /* implements OnInit */ {
  upcomingAppointments: Appointment[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  isLoading: boolean = true;
  todayDate: Date = new Date();
  errorMessage: string;

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadUpcomingAppointments();
  }

  loadUpcomingAppointments(): void {

    
    this.appointmentService.getAllAppointments(0, 100).subscribe(
      (response: ResponseModel<Appointment>) => {
        this.upcomingAppointments = response.items.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate > this.todayDate ||
            (appointmentDate.getTime() === this.todayDate.getTime() && appointment.time >= this.todayDate.toTimeString().slice(0, 5));
        });
       
      },
      (error) => {
        console.error('Randevular alınamadı:', error);
        this.errorMessage = error.message;
      }
    );
  }

  confirmDelete(appointmentId: number): void {
    if (confirm('Randevuyu silmek istediğinize emin misiniz?')) {
      this.deleteAppointment(appointmentId);
    }
  }

  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(
      () => {
        this.upcomingAppointments = this.upcomingAppointments.filter(appointment => appointment.id !== appointmentId);
      },
      (error) => {
        console.error('Randevu silinemedi:', error);
        this.errorMessage = error.message;
      }
    );
  }
}