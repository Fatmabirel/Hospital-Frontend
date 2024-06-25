import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../../appointments/services/appointment.service';
import { DoctorService } from '../../../../../doctors/services/doctor.service';
import { Appointment } from '../../../../../appointments/models/appointmentModel';
import { Doctor } from '../../../../../doctors/models/doctor';
import { ResponseModel } from '../../../../../models/responseModel';
import { AdminSidebarComponent } from '../../sidebar/adminSidebar.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../../../../core/paging/components/pagination/pagination.component';

@Component({
  selector: 'app-past-appointments',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, RouterModule,PaginationComponent],
  templateUrl: './past-appointments.component.html',
  styleUrls: ['./past-appointments.component.scss']
})
export class PastAppointmentsComponent implements OnInit {
  pastAppointments: Appointment[] = [];
  /* doctors: { [key: string]: Doctor } = {}; */
  todayDate: Date = new Date();
  errorMessage: string;
  pageIndex: number = 0;
  pageSize:number = 5;
  totalPages: number = 0;
  hasNext: boolean = false;

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadPastAppointments();
  }
  onPageChanged(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    console.log(this.pageIndex);
    this.loadPastAppointments();
  }

  loadPastAppointments(): void {
    this.appointmentService.getAllAppointments(this.pageIndex,this.pageSize).subscribe(
      (response: ResponseModel<Appointment>) => {
        this.totalPages = response.pages;
        this.hasNext = response.hasNext;
        this.pastAppointments = response.items.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate < this.todayDate ||
            (appointmentDate.getTime() === this.todayDate.getTime() && appointment.time < this.todayDate.toTimeString().slice(0, 5));
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
        this.pastAppointments = this.pastAppointments.filter(appointment => appointment.id !== appointmentId);
      },
      (error) => {
        console.error('Randevu silinemedi:', error);
        this.errorMessage = error.message;
      }
    );
  }
}

