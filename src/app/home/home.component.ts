import { Component, OnInit } from '@angular/core';
import { IOService, ApiService } from '../shared';
import { Command } from '../models';
@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private commands: Command[] = [];
  private __volume: number = 100;

  constructor(private io: IOService, private api: ApiService) {
  }
  ngOnInit() {

  }

  private loadFile(resource) {
    this.doCommand('loadFile: ' + resource.name, this.api.loadFile(resource).toPromise());
  }

  private doCommand(name: string, promise : any) {
    var command = new Command();
    command.name = name;
    command.time = Date.now();
    command.status = 0;
    var $index = this.commands.length;
    this.commands.push(command);
    promise.then(result => command.status = result.success ? 1 : 2);
  }

  private play() {
    this.doCommand('play', this.api.play().toPromise());
  }
  private pause() {
    this.doCommand('pause', this.api.pause().toPromise());
  }
  private volume(volume: number) {
    this.doCommand('volume: ' + volume, this.api.volume(volume).toPromise());
  }
  private volume_down(v: number) {
    this.__volume -= v;
    if (this.__volume < 0) this.__volume = 0;
    this.volume(this.__volume);
  }
  private volume_up(v: number) {
    this.__volume += v;
    if (this.__volume > 100) this.__volume = 100;
    this.volume(this.__volume);
  }
  private exit() {
    this.doCommand('exit', this.api.exit().toPromise());
  }
}
