import { Component, OnInit } from '@angular/core';

import { IOService, ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  constructor(private io: IOService, private api: ApiService) {

  }
  ngOnInit() {
    this.io.initialize();
  }
}
