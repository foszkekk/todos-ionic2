import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {Helpers} from "../../providers/helpers";

@Component({
  selector: 'page-colorpicker',
  templateUrl: 'colorpicker.html'
})
export class ColorpickerPage {

  colors = [];
  picked = null;

  constructor(public helpers: Helpers, public viewCtrl: ViewController) {
    this.helpers.getColors().then(colors => {
      this.colors = colors;
    });
  }

  pickColor(value) {
    this.picked = value;
  }

  chooseColor() {
    if (this.picked)
      this.viewCtrl.dismiss(this.picked);
    else
      this.viewCtrl.dismiss();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  }

}
