import {Component, OnInit} from '@angular/core';
import {Subject} from 'src/app/shared/models/subject.model';

import {MatTableDataSource} from '@angular/material';
import {GradesService} from '../../shared/service/grades.service';
import {Grade} from '../../shared/models/grade.model';
import {StudentService} from '../service/student.service';
import {expandTableRowTrigger, horizontalFadeInTrigger, verticalFadeInTrigger} from 'src/app/shared/ui/animations';

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.scss'],
    animations: [
        expandTableRowTrigger,
        horizontalFadeInTrigger,
        verticalFadeInTrigger
    ]
})
export class GradesComponent implements OnInit {
    dataSource = new MatTableDataSource<Subject>();
    columnsToDisplay = ['subject', 'grades', 'average'];
    expandedElement: Grade | null;

    constructor(private studentService: StudentService,
                private gradesService: GradesService) {
    }

    ngOnInit(): void {
        this.setSubjects();
    }

    setSubjects(): void {
        this.studentService.getObservableOfSubjects()
            .subscribe((subjects: Subject[]) => {
                this.dataSource.data = subjects;
            }, err => console.log(err));
    }

    calculateAvg(grades: Grade[]): string {
        return this.gradesService.calculateAverage(grades);
    }

    dataSourceIsEmpty(): boolean {
        return this.dataSource.data.length != 0;
    }

}


