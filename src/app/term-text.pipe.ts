import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText'
})
export class TermTextPipe implements PipeTransform {

  transform(text:string): string {
    return text.split(' ').slice(0,2).join(' ');
  }

}
