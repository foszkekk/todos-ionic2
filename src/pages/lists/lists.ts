import {Component, Input} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {List} from '../../models/list';
import {LISTS, ITEMS} from "../../models/mock";
import {ListPage} from '../list/list';
import {ListFormPage} from "../list-form/list-form";


@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  lists = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
    this.lists = LISTS.filter(list => !list.removed);
  }

  ionViewDidLoad() {

  }

  newList() {
    let modal = this.modalCtrl.create(ListFormPage, {title: 'New List', mode: 'create'});
    modal.present();
  }

}
