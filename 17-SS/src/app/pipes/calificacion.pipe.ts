import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calificacion'
})
export class CalificacionPipe implements PipeTransform {

  transform(value: any): any {
    return (value === null || value === undefined || value === 0) ? '' : value;
  }

}

