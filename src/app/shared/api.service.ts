import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Resource } from '../models';

@Injectable()
export class ApiService {
  title = 'Wind Controller';
  public baseUrl = '//localhost:3000/api';
  constructor (private http: Http) {

  }
  getResources(): Observable<Resource[]> {
    return this.http.get(this.baseUrl + '/resources')
                    .map((res: Response) => (res.json().resources || {}))
                    .catch(this.handleError);
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
