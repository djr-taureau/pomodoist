import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalTime'
})
export class TotalTimePipe implements PipeTransform {

  transform(value: number): number {

    const time = (value * 50) / 60;
    return time;
  }
}
