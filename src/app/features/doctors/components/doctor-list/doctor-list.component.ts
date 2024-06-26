import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';
import { BasicLayoutComponent } from '../../../../shared/components/basic-layout/basic-layout.component';
import { FilterDoctorBranchPipe } from '../../../pipe/filter-doctor-branch.pipe';
import { FormsModule } from '@angular/forms';
import { Branch } from '../../../branches/models/branch';
import { BranchService } from '../../../branches/services/branch.service';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule,BasicLayoutComponent,FilterDoctorBranchPipe,FormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[] = [];
  branches: Branch[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  isLoading: boolean = true;
  selectedBranch: any | null = null;

  constructor(private doctorService: DoctorService,private branchService:BranchService) {}

  ngOnInit(): void {
    this.getDoctors();
    this.getBranches();
  }

  getBranches() {
    this.branchService
      .getBranches(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.branches = response.items;
      });
  }
  getDoctors() {
    this.doctorService.getDoctors(this.pageIndex, this.pageSize).subscribe((response) => {
      this.doctors = response.items;
    });
  }
  onBranchFilterChange(event: any) {
    const selectedBranch = event.target.value;
  }

}
