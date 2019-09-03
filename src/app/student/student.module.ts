import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';
import { GradesComponent } from './grades/grades.component';
import { StudentRoutingModule } from './student-routing.module';
import { TeachersComponent } from './teachers/teachers.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import {studentReducer} from './student-store/student.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './student-store/student.effects';
import { RouterModule } from '@angular/router';
import { GradesService } from '../shared/service/grades.service';
import { StudentService } from './service/student.service';

@NgModule({
    declarations: [
        StudentComponent,
        GradesComponent,
        TeachersComponent
    ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        RouterModule,
        SharedModule,
        MaterialModule,
        FlexLayoutModule,
        StoreModule.forFeature('student', studentReducer),
        EffectsModule.forFeature([StudentEffects])
    ],
    providers: [
        GradesService,
        StudentService,
    ]
})
export class StudentModule { }