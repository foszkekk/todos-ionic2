import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
@Injectable()
export class Helpers {

  constructor(private http: Http) {
  }

  public getRandomID(length: number) {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = '';
    for (let i = 0; i < length; i++) {
      id += letters[Math.floor(Math.random() * letters.length) + 1];
    }
    return id;
  }

  public getColors(){
    return this.http.get('assets/colors.json').toPromise()
      .then(res=> res.json());
  }


}
