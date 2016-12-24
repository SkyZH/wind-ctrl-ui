export class Command {
  name: string;
  status: number;
  time: number;
}

export class Status {
  resource: any = {};
  pause: boolean = true;
  duration: number = 1;
  volume: number = 100;
  position: number = 0;
  device: string = "non";
  free_mem: number = 0;
  total_mem: number = 1;
  cpus: number[] = [];
  cpu_avg: number = 0;
  start_time: number = 0;
};
