import {Component, Input} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {List} from '../../models/list';
import {LISTS, ITEMS} from "../../models/mock";
import {ListPage} from '../list/list';
import {ListFormPage} from "../list-form/list-form";
import {Lists} from "../../providers/lists";
import {ViewListPage} from "../view-list/view-list";


@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  lists = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public listsService: Lists) {
    this.getLists();
  }

  ionViewDidLoad() {

  }

  getLists(){
    this.listsService.getLists().then(data=>{
      this.lists = JSON.parse(data).filter(list => !list.removed);
    });
  }

  newList() {
    let modal = this.modalCtrl.create(ListFormPage, {title: 'New List', mode: 'create'});

    modal.onDidDismiss(data => {
      if(data){
        this.lists.push(data.list);
      }
    });

    modal.present();
  }

}
