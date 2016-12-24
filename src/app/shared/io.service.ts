import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resource, Log, Status } from '../models';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';
import * as _ from 'lodash';

@Injectable()
export class IOService {
  constructor(private api: ApiService) {
  }

  public resources: Resource[] = [];
  public logs: Log[] = [];
  public status: Status = new Status();
  public io_status: number = 0;
  private socket: any;
  private packet_count: number = 0;

  private __io_events: {} = {};

  private io$(event_name: string) {
    if (event_name in this.__io_events) return this.__io_events[event_name];
    this.__io_events[event_name] = Observable.fromEventPattern(
      f => this.socket.on(event_name, f),
      f => this.socket.off(event_name, f)
    );
    return this.__io_events[event_name];
  }

  public initialize(): any {
    this.socket = io(this.api.wsUrl, { transports: ['websocket'] });
    this.io$('log').subscribe(log => {
      this.logs.push(log);
      this.logs = _.takeRight(this.logs, 500);
      ++this.packet_count;
    });
    this.io$('status').subscribe(status => {
      this.status = status;
      ++this.packet_count;
    });
    this.io$('connect').subscribe(status => {
      this.io_status = 1;
      this.logs = [];
    });
    this.io$('disconnect').subscribe(status => {
      this.io_status = 0;
    });
    this.api.getResources()
       .toPromise()
       .then(resources => this.resources = resources)
  }
}
