import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    const realTime = value / 1000;
    const hours = Math.floor(realTime / 3600);
    const minutes = Math.floor(realTime / 60) - hours * 60;
    const seconds = realTime % 60;
    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    );
  }
}
