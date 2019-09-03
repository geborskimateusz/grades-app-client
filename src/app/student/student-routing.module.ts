import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentComponent} from './student.component';
import {GradesComponent} from './grades/grades.component';
import {TeachersComponent} from './teachers/teachers.component';
import {UserComponent} from '../shared/user/user.component';
import {MessagesComponent} from '../shared/messages/messages.component';
import {MessageComponent} from '../shared/messages/message/message.component';

export const routes: Routes = [
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule {
}

