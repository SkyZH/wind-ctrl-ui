import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class IOService {
  private static instance: any;

  // Return the instance of the service
  public static getInstance(): IOService {
    if (IOService.instance === null) {
       IOService.instance = [];
    }
    return IOService.instance;
  }

  constructor() {}
}

export const IO_SERVICE_PROVIDER = [
  {
    provide: IOService,
    useFactory: (): IOService => { return IOService.getInstance(); }
  }
];
