import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {ToastController} from "ionic-angular";
import {Settings} from "./settings";
@Injectable()
export class Helpers {

  constructor(private http: Http,
              private toastCtrl: ToastController,
              private settingsService: Settings) {
  }


  public getRandomID(length: number) {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = '';
    for (let i = 0; i < length; i++) {
      id += letters[Math.floor(Math.random() * letters.length) + 1];
    }
    return id;
  }

  public getColors() {
    return this.http.get('assets/colors.json').toPromise()
      .then(res => res.json());
  }

  public showToast(message) {
    this.settingsService.getSettings().then((settings) => {
      if (settings.showToasts) {
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
      }
    });
  }

}
