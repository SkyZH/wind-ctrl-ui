import { Component, OnInit } from '@angular/core';

import { IOService, ApiService } from '../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  constructor(private io: IOService, private api: ApiService) {
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
