import {Component, Input} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {ListFormPage} from "../list-form/list-form";
import {Lists} from "../../providers/lists";
import {ViewListPage} from "../view-list/view-list";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  @Input('list') list = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public listsService: Lists) {
  }

  listStatus(items) {
    return `${items.filter(i => i.isFinished).length} / ${items.length}`;
  }

  editList(list) {
    let editModal = this.modalCtrl.create(ListFormPage, {list: list, mode: 'edit', title: 'Edit List'});
    editModal.present();
  }

  toggleRemoved(list) {
    list.removed = !list.removed;
    this.listsService.updateList(list);
  }

  deleteList(list) {
    this.listsService.deleteList(list);
  }

  viewList(list){
    this.navCtrl.push(ViewListPage, {list: list});
  }

  ionViewDidLoad() {

  }

}
