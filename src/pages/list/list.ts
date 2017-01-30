import {Component, Input} from '@angular/core';
import {NavController, ModalController, AlertController, Events} from 'ionic-angular';
import {ListFormPage} from "../list-form/list-form";
import {Lists} from "../../providers/lists";
import {ViewListPage} from "../view-list/view-list";
import {Helpers} from "../../providers/helpers";
import {List} from "../../models/list";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',

})
export class ListPage {

  @Input('list') list: List;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public listsService: Lists,
              public alertCtrl: AlertController,
              public helpersService: Helpers,
              public events: Events) {
  }

  listStatus(items) {
    return `${items.filter(i => i.isFinished).length} / ${items.length}`;
  }

  editList(list) {
    let editModal = this.modalCtrl.create(ListFormPage, {list: list, mode: 'edit', title: 'Edit List'});

    editModal.onDidDismiss(modalList => {
      if (modalList)
        this.helpersService.showToast('List successfully updated');
    });

    editModal.present();
  }

  toggleRemoved(list) {
    list.removed = !list.removed;
    this.listsService.updateList(list);
    if (list.removed) {
      this.helpersService.showToast('List moved to trash');
      this.events.publish('list:trashed', list)
    }
    else {
      this.helpersService.showToast('List restored from trash');
      this.events.publish('list:restored', list);
    }
  }

  deleteList(list) {
    let confirm = this.alertCtrl.create({
      title: 'Delete forever',
      message: `Delete ${list.title} forever?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.events.publish('list:removed', list);
            this.listsService.deleteList(list);
            this.helpersService.showToast('List removed forever');
          }
        }
      ]
    });
    confirm.present();
  }

  viewList(list) {
    this.navCtrl.push(ViewListPage, {list: list});
  }


}
