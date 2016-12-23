import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import * as _ from 'lodash';

@Pipe({
  name: 'commandFilter',
  pure: false
})
export class CommandFilterPipe implements PipeTransform {
  transform(commands: Command[]): Command[] {
    return _.sortBy(_.takeRight(commands, 8), 'time');
  }
}
