import { Grade } from '../models/grade.model';
import { ConversionChart } from '../models/conversion-chart.model';
import { Injectable } from '@angular/core';

@Injectable()
export class GradesService {

    gradeConversionChart: ConversionChart[] = [
        { letter: 'A', decimalGrade: 4.00 },
        { letter: 'A-', decimalGrade: 3.75 },
        { letter: 'B+', decimalGrade: 3.50 },
        { letter: 'B', decimalGrade: 3.00 },
        { letter: 'B-', decimalGrade: 2.75 },
        { letter: 'C+', decimalGrade: 2.50 },
        { letter: 'C', decimalGrade: 2.00 },
        { letter: 'C-', decimalGrade: 1.75 },
        { letter: 'D+', decimalGrade: 1.50 },
        { letter: 'D', decimalGrade: 1.00 },
        { letter: 'F', decimalGrade: 0.00 },
    ];

    calculateAverage(grades: Grade[]): string {

        let gradesAverage: number = this.calculateGradesAvg(grades);

        let averageRoundedToTwoDecimalPlaces: string = GradesService.roundGradeToTwoDecimalPlaces(gradesAverage);

        let roundedToDecimalGrades: number = GradesService.roundGradeToConversionChartDecimalGrades(averageRoundedToTwoDecimalPlaces);

        let gradeToReturn: string = null;
        this.gradeConversionChart.forEach(element => {
            if (element.decimalGrade === roundedToDecimalGrades) {
                gradeToReturn = element.letter;
            }
        });

        return gradeToReturn;
    }

    private calculateGradesAvg(grades: Grade[]): number {

        let sumOfGrades: number = 0;
        grades.forEach(grade => {
            this.gradeConversionChart.forEach(element => {
                if (element.letter === grade.letter) {
                    sumOfGrades += element.decimalGrade;
                }
            });
        });

        let average: number = (sumOfGrades / grades.length);

        return average;
    }

    private static roundGradeToTwoDecimalPlaces(average: number): string {
        return average.toFixed(2);
    }

    private static roundGradeToConversionChartDecimalGrades(fixedGrade: string): number {

        let split: string[] = fixedGrade.split('.');
        let integer: number = Number.parseFloat(split[0]);
        let decimal: number = Number.parseFloat(split[1]);

        if (decimal < 25) {
            decimal = 0.00;
        } else if (decimal >= 25 && decimal <= 50) {
            decimal = 0.50;
        } else if (decimal > 50 && decimal <= 75) {
            decimal = 0.75;
        } else if (decimal > 75) {
            integer = +1;
            decimal = 0.00
        }

        return integer + decimal;
    }
}