import { Pipe, PipeTransform } from '@angular/core';
import { Log } from '../models';
import * as _ from 'lodash';

@Pipe({
  name: 'logFilter',
  pure: false
})
export class LogFilterPipe implements PipeTransform {
  transform(logs: Log[], name: string): Log[] {
    return _.sortBy(_.takeRight(logs.filter(log => log.name == name), 12), 'time');
  }
}
