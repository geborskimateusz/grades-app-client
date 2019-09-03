import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, ThemePalette } from '@angular/material';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/app/shared/user/user-details.model';

import { horizontalFadeInTrigger } from '../ui/animations';
import { ActivityFeedBottomSheetComponent } from './activity-feed-bottom-sheet/activity-feed-bottom-sheet.component';
import { UserDetailsService } from './service/user-details.service';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

export interface activityModel {
  grade: string;
  subject: string;
  matChip: ChipColor;
  date: Date;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [horizontalFadeInTrigger]
})
export class UserComponent implements OnInit {

  activityFeedDataSource = ACTIVITY_FEED;

  userDetails$: Observable<UserDetails>;

  constructor(private userDetailsService: UserDetailsService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
      this.userDetails$ = this.userDetailsService.getUserDetails();
  }
  

  getAge() {
    return this.userDetailsService.getAge();
  }

  getResidence() {
    return this.userDetailsService.getResidence();
  }

  openBottomSheet(activity: activityModel): void {
    this.bottomSheet.open(ActivityFeedBottomSheetComponent, {
      data: { activity }
    });
  }
}

//TODO split this to external component
export const ACTIVITY_FEED: activityModel[] = [
  {
    grade: 'F',
    subject: 'History',
    matChip: { name: 'Warn', color: 'warn' },
    date: new Date(2014, 1, 1)
  }, {
    grade: 'A',
    subject: 'Mathematics',
    matChip: { name: 'Warn', color: 'primary' },
    date: new Date(2014, 1, 1)
  },
  {
    grade: 'A',
    subject: 'History',
    matChip: { name: 'Warn', color: 'primary' },
    date: new Date(2014, 1, 1)
  },
  {
    grade: 'F',
    subject: 'History',
    matChip: { name: 'Warn', color: 'accent' },
    date: new Date(2014, 1, 1)
  }
]
