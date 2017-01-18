import {Component, Input} from '@angular/core';
import {NavController, NavParams, ModalController, AlertController, ToastController} from 'ionic-angular';
import {ListFormPage} from "../list-form/list-form";
import {Lists} from "../../providers/lists";
import {ViewListPage} from "../view-list/view-list";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  @Input('list') list = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public listsService: Lists,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
  }

  listStatus(items) {
    return `${items.filter(i => i.isFinished).length} / ${items.length}`;
  }

  editList(list) {
    let editModal = this.modalCtrl.create(ListFormPage, {list: list, mode: 'edit', title: 'Edit List'});

    editModal.onDidDismiss(() => {
      this.showToast('List successfully updated');
    });

    editModal.present();
  }

  toggleRemoved(list) {
    list.removed = !list.removed;
    this.listsService.updateList(list);
    if (list.removed)
      this.showToast(`${list.title} moved to trash`);
    else
      this.showToast(`${list.title} restored from trash`)
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
            this.listsService.deleteList(list);
            this.showToast(`${list.title} has been removed forever`);
          }
        }
      ]
    });
    confirm.present();
  }

  viewList(list) {
    this.navCtrl.push(ViewListPage, {list: list});
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }


  ionViewDidLoad() {

  }

}
