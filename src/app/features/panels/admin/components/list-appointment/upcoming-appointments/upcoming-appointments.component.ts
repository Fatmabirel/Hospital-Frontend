import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../../appointments/services/appointment.service';
import { DoctorService } from '../../../../../doctors/services/doctor.service';
import { Appointment } from '../../../../../appointments/models/appointmentModel';
import { ResponseModel } from '../../../../../models/responseModel';
import { AdminSidebarComponent } from '../../sidebar/adminSidebar.component';
import { PaginationComponent } from '../../../../../../core/paging/components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { FilterAppointmentIdentityPipe } from '../../../../../pipe/filter-appointment-identity.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upcoming-appointments',
  standalone: true,
  imports: [
    CommonModule,
    AdminSidebarComponent,
    RouterModule,
    PaginationComponent,
    FilterAppointmentIdentityPipe,
    FormsModule,
  ],
  templateUrl: './upcoming-appointments.component.html',
  styleUrls: ['./upcoming-appointments.component.scss'],
})
export class UpcomingAppointmentsComponent /* implements OnInit */ {
  upcomingAppointments: Appointment[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  hasNext: boolean = false;
  isLoading: boolean = true;
  todayDate: Date = new Date();
  errorMessage: string;
  filterText: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUpcomingAppointments();
  }
  onPageChanged(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    this.loadUpcomingAppointments();
  }

  loadUpcomingAppointments(): void {
    this.appointmentService
      .getAllAppointments(this.pageIndex, this.pageSize)
      .subscribe(
        (response: ResponseModel<Appointment>) => {
          this.totalPages = response.pages;
          this.hasNext = response.hasNext;
          this.upcomingAppointments = response.items.filter((appointment) => {
            const appointmentDate = new Date(appointment.date);
            return (
              appointmentDate > this.todayDate ||
              (appointmentDate.getTime() === this.todayDate.getTime() &&
                appointment.time >= this.todayDate.toTimeString().slice(0, 5))
            );
          });
          this.totalPages = response.pages;
          this.hasNext = response.hasNext;
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
        this.upcomingAppointments = this.upcomingAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        );
      },
      (error) => {
        console.error('Randevu silinemedi:', error);
        this.errorMessage = error.message;
      }
    );
  }
  viewReport() {
    this.toastrService.warning("Randevu henüz gerçekleşmedi","Rapor bulunamadı");
  }
}
