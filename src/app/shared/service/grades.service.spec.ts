
import { GRADES } from 'src/app/test/data-factory/grades-factory';
import { GradesService } from './grades.service';
import { Grade } from '../models/grade.model';
import { TestBed, async } from '@angular/core/testing';


describe('Service: GradesService', () => {

    let gradesService: GradesService;
    const grades: Grade[] = GRADES;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [GradesService]
        })
        gradesService = TestBed.get(GradesService);
    }))

    it('should return correct average of all grades from array.', () => {

        let average: string = gradesService.calculateAverage(grades);

        expect(average).toEqual("C+")
    });

    it('should return wrong average of all grades from array.', () => {

        let average: string = gradesService.calculateAverage(grades);

        expect(average).not.toEqual("A")
    })
})