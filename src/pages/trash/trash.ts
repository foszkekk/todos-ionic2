import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {LISTS} from "../../models/mock";
import {Lists} from "../../providers/lists";

@Component({
  selector: 'page-trash',
  templateUrl: 'trash.html'
})
export class TrashPage {

  lists = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public listsService: Lists) {
    this.listsService.getLists().then(data => {
      this.lists = JSON.parse(data).filter(list => list.removed);
    });
  }

  ionViewDidLoad() {

  }

}
