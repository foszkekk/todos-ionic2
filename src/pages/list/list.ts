import {Component, Input} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {ListFormPage} from "../list-form/list-form";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  @Input('list') list = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  listStatus(items) {
    return `${items.filter(i => i.isFinished).length} / ${items.length}`;
  }

  editList(list) {
    let editModal = this.modalCtrl.create(ListFormPage, {list: list, mode: 'edit', title: 'Edit List'});
    editModal.present();
  }

  ionViewDidLoad() {

  }

}
