import {Component} from '@angular/core';
import {AlertController, Events} from 'ionic-angular';
import {Lists} from "../../providers/lists";
import {Helpers} from "../../providers/helpers";

@Component({
  selector: 'page-trash',
  templateUrl: 'trash.html'
})
export class TrashPage {

  lists = [];

  constructor(public listsService: Lists,
              public alertCtrl: AlertController,
              public helpersService: Helpers,
              public events: Events) {
    this.getLists();
    this.events.subscribe('list:removedForever', (list) => {
      this.getLists();
      console.log('list removed\n' + list);
      this.lists.splice(this.lists.findIndex(l => l._id === list._id), 1);
    });
  }

  ionViewDidLoad() {

  }

  deleteAll() {
    let msgs = [`Delete ${this.lists.length === 1 ? '1 list' : `${this.lists.length} lists`} forever?`, `${this.lists.length === 1 ? '1 list' : `${this.lists.length} lists`} removed forever`];
    let alert = this.alertCtrl.create({
      title: 'Delete forever',
      message: msgs[0],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.helpersService.showToast(msgs[1]);
            this.lists.forEach(list => {
              this.listsService.deleteList(list);
            });
          }
        }
      ]
    });

    alert.present();
  }

  getLists() {
    this.listsService.getLists().then(data => {
      this.lists = JSON.parse(data).filter(list => list.removed);
    });
  }

}
