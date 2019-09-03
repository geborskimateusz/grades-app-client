import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Teacher } from 'src/app/shared/models/teacher.model';
import { horizontalFadeInTrigger } from 'src/app/shared/ui/animations';

import { AuthService } from '../../auth/auth-service';
import { PostMessageDialogComponent } from '../../shared/messages/post-message-dialog/post-message-dialog.component';
import { StudentService } from '../service/student.service';

@Component({
    selector: 'app-teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss'],
    animations: [horizontalFadeInTrigger]
})
export class TeachersComponent implements OnInit {

    dataSource$: Observable<Teacher[]>;

    constructor(private studentService: StudentService,
        private authService: AuthService,
        public postMessageDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.studentService.trySetTeachers();
        this.initDataSource();
    }

    initDataSource(): void {
        this.dataSource$ = this.studentService.getObservableOfTeachers()
            .pipe(
                map(teachers => {
                    return this.studentService.getUniqueTeachers(teachers);
                })
            );
    }

    openPostMessageDialog(activeSubject: string, teacher: Teacher): void {
        const dialogRef: MatDialogRef<PostMessageDialogComponent> = this.postMessageDialog.open(PostMessageDialogComponent, {
            width: '600px',
            height: '400px',
            data: {
                senderId: this.authService.getCurrentUserId(),
                receiverDetails: {
                    receiverId: teacher.id,
                    subject: activeSubject,
                    name: `${teacher.firstName} ${teacher.lastName}`
                }
            }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.studentService.trySetTeachers();
        });
    }
}






