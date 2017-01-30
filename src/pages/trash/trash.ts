import {Component} from '@angular/core';
import {AlertController, Events} from 'ionic-angular';
import {Lists} from "../../providers/lists";
import {Helpers} from "../../providers/helpers";
import {List} from "../../models/list";

@Component({
  selector: 'page-trash',
  templateUrl: 'trash.html'
})
export class TrashPage {

  lists: List[] = [];

  constructor(public listsService: Lists,
              public alertCtrl: AlertController,
              public helpersService: Helpers,
              public events: Events) {
  }

  ionViewDidLoad() {
    this.events.subscribe('list:removed', (list) => {
      this.removeList(list);
    });

    this.events.subscribe('list:restored', (list) => {
      this.removeList(list);
    });
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
            this.listsService.deleteLists(this.lists);
            this.lists = [];
          }
        }
      ]
    });
    alert.present();
  }

  getLists() {
    this.listsService.getLists(true).then((lists) => {
      this.lists = lists;
    })
      .catch(err => console.log(err));
  }

  ngOnInit() {
    this.getLists();
  }

  removeList(list) {
    let index = this.lists.findIndex(x => x._id === list._id);
    this.lists.splice(index, 1);
  }

}
