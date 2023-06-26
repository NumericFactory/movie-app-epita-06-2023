import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printDuration'
})
export class PrintDurationPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value != undefined) {
      let hours = Math.floor(value / 60);
      let minutes: number | string = value % 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return hours + 'h' + minutes + 'm'
    }
    else {
      return '';
    }
  }

}
