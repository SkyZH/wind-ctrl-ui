import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Resource } from '../models';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class IOService {
  constructor(private api: ApiService) {
  }

  public resources: Resource[];
  private socket: any;

  private ioevent(event_name: string): any {
    return Observable.fromEventPattern(
      f => this.socket.on(event_name, f),
      f => this.socket.off(event_name, f)
    );
  }

  public initialize(): any {
    this.socket = io(this.api.baseUrl, {transports: ['websocket']});

    this.ioevent('log').subscribe((log) => {
      console.log(log);
    })

    this.api.getResources()
       .toPromise()
       .then(resources => this.resources = resources)
  }
}
