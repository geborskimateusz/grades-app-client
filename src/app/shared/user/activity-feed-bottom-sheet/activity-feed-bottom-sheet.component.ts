import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-activity-feed-bottom-sheet',
  templateUrl: './activity-feed-bottom-sheet.component.html',
  styleUrls: ['./activity-feed-bottom-sheet.component.css']
})
export class ActivityFeedBottomSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<ActivityFeedBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
