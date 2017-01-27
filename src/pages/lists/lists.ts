import {Component, Input} from '@angular/core';
import {ModalController, Events} from 'ionic-angular';
import {ListPage} from '../list/list';
import {ListFormPage} from "../list-form/list-form";
import {Lists} from "../../providers/lists";
import {ViewListPage} from "../view-list/view-list";
import {Helpers} from "../../providers/helpers";


@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  lists = [];

  constructor(public modalCtrl: ModalController,
              public listsService: Lists,
              public helpersService: Helpers,
              public events: Events) {
    this.getLists();
  }

  ionViewDidLoad() {
    this.events.subscribe('list:removed', (list)=>{
      this.getLists();
    })
  }

  getLists() {
    this.listsService.getLists().then(data => {
      if (data) {
        this.lists = JSON.parse(data).filter(list => !list.removed);
      }
    });
  }

  newList() {
    let modal = this.modalCtrl.create(ListFormPage, {title: 'New List', mode: 'create'});

    modal.onDidDismiss(data => {
      if (data) {
        this.lists.push(data.modalList);
        this.helpersService.showToast('List successfully added');
      }
    });

    modal.present();
  }

}
