import { Component, OnInit } from '@angular/core';
import { IO_STATUS } from './models';
import { IOService, ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private IO_STATUS: any;

  constructor(private io: IOService, private api: ApiService) {
    this.IO_STATUS = IO_STATUS;
  }
  ngOnInit() {
    this.io.initialize();
  }
  private uptime() {
      return new Date('2000-01-01 0:00').getTime() + Date.now() - this.io.status.start_time;
  }
}
