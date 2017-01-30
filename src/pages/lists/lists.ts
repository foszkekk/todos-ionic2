import {Component} from '@angular/core';
import {ModalController, Events} from 'ionic-angular';
import {ListFormPage} from "../list-form/list-form";
import {Lists} from "../../providers/lists";
import {Helpers} from "../../providers/helpers";
import {List} from "../../models/list";

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {
  lists: List[] = [];

  constructor(public modalCtrl: ModalController,
              public listsService: Lists,
              public helpersService: Helpers,
              public events: Events) {
  }

  ionViewDidLoad() {
    this.events.subscribe('list:removed', (list) => {
      this.removeList(list);
    });

    this.events.subscribe('list:trashed', (list) => {
      this.removeList(list);
    });

  }

  getLists() {
    this.listsService.getLists(false).then(lists => this.lists = lists);
  }

  newList() {
    let modal = this.modalCtrl.create(ListFormPage, {title: 'New List', mode: 'create'});

    modal.onDidDismiss(data => {
      if (data) {
        this.helpersService.showToast('List successfully added');
        this.lists.push(data.modalList);
      }
    });

    modal.present();
  }

  ngOnInit() {
    this.getLists();
  }

  removeList(list) {
    let index = this.lists.findIndex(x => x._id === list._id);
    this.lists.splice(index, 1);
  }

}
