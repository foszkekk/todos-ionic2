import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Helpers} from "../../providers/helpers";

@Component({
  selector: 'page-colorpicker',
  templateUrl: 'colorpicker.html'
})
export class ColorpickerPage {

  colors = [];
  picked = "#f4f4f4";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public helpers: Helpers, public viewCtrl: ViewController) {
    this.helpers.getColors().then(colors => {
      this.colors = colors;
    });
  }

  pickColor(value){
    this.picked = value;
  }

  chooseColor(){
    this.viewCtrl.dismiss(this.picked);
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  }

}
