import {Component} from '@angular/core';
import {NavController, NavParams, ModalController, AlertController, ToastController} from 'ionic-angular';
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
              public listsService: Lists,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
    this.listsService.getLists().then(data => {
      this.lists = JSON.parse(data).filter(list => list.removed);
    });
  }

  ionViewDidLoad() {

  }

  deleteAll() {
    let alert = this.alertCtrl.create({
      title: 'Delete forever',
      message: `Delete ${this.lists.length} lists forever?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.showToast(`${this.lists.length} lists has been removed forever`);
            this.lists.forEach(list => {
              this.listsService.deleteList(list);
              console.log('lul');
            });
          }
        }
      ]
    });

    alert.present();
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

}
