import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { CommonModule } from '@angular/common';
import { Feedback } from '../../../../feedbacks/models/feedback';
import { FeedbackService } from '../../../../feedbacks/services/feedback.service';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-feedback',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule,RouterModule],
  templateUrl: './list-feedback.component.html',
  styleUrl: './list-feedback.component.scss',
})
export class ListFeedbackComponent {
  feedbacks: Feedback[] = [];
  pageIndex: number = 0;
  pageSize: number = 12;

  constructor(private feedbackService: FeedbackService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.feedbackService
      .getFeedbacks(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.feedbacks = response.items;
      });
  }

  confirmDelete(feedbackId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'ONAY', message: 'Bu geri bildirimi silmek istediğinizden emin misiniz?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFeedback(feedbackId);
      }
    });
  }
  

  deleteFeedback(feedbackId: number) {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(
      (response) => {
        console.log('Geri bildirim başarıyla silindi:', response);
        this.getFeedbacks();
      },
      (error) => {
        console.error('Geri bildirim silinemedi:', error);
      }
    );
  }
}