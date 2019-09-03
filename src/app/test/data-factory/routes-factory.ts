import { Routes } from '@angular/router';
import { StudentComponent } from 'src/app/student/student.component';
import { UserComponent } from 'src/app/shared/user/user.component';
import { GradesComponent } from 'src/app/student/grades/grades.component';
import { TeachersComponent } from 'src/app/student/teachers/teachers.component';
import { MessagesComponent } from 'src/app/shared/messages/messages.component';
import { MessageComponent } from 'src/app/shared/messages/message/message.component';

export const TEST_ROUTES: Routes = [
    {
        path: '', component: StudentComponent,
        children: [
            {
                path: 'info', component: UserComponent
            },
            {
                path: 'grades', component: GradesComponent
            },
            {
                path: 'teachers', component: TeachersComponent,
            },
            {
                path: 'teachers/:id/info', component: UserComponent,
            },
            {
                path: 'messages', component: MessagesComponent,
                children: [
                    {
                        path: 'message/:messageType/:id', component: MessageComponent
                    }
                ]
            }
        ]
    }
]