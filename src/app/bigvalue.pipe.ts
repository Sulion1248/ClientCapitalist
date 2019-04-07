import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bigvalue'
})
export class BigvaluePipe implements PipeTransform {

  transform(value: number, args?: any): String {

    let res : string;
    if (value < 1000)
      res = value.toFixed(2);
    else if (value < 1000000)
      res = value.toFixed(0);
    else if (value >= 1000000)
      res = value.toPrecision(4);
      res = res.replace(/e\+(.*)/, " 10^$1");

    return res;
  }

}
