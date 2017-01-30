import {Component} from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  ActionSheetController,
  Platform,
  AlertController,
  Events
} from 'ionic-angular';
import {ListFormPage} from "../list-form/list-form";
import {Lists} from "../../providers/lists";
import {ColorpickerPage} from "../colorpicker/colorpicker";
import {Helpers} from "../../providers/helpers";

@Component({
  selector: 'page-view-list',
  templateUrl: 'view-list.html'
})
export class ViewListPage {

  list;

  constructor(public platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public listsService: Lists,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public helpersService: Helpers,
              public events: Events) {
  }

  listStatus() {
    return `${this.list.items.filter(i => i.isFinished).length} / ${this.list.items.length}`;
  }

  editList(list) {
    let editModal = this.modalCtrl.create(ListFormPage, {list: list, mode: 'edit', title: 'Edit List'});

    editModal.onDidDismiss(modalList => {
      if (modalList)
        this.helpersService.showToast('List successfully updated');
    });

    editModal.present();
  }

  toggleFinished(item) {
    item.isFinished = !item.isFinished;
    let index = this.list.items.findIndex(i => i._id === item._id);
    this.list.items[index] = item;
    this.listsService.updateList(this.list);
  }

  removeListItem(id) {
    let index = this.list.items.findIndex(item => item._id === id);
    this.list.items.splice(index, 1);
    this.listsService.updateList(this.list);
  }

  openMenu(list) {
    let menu = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel'
        },
        {
          text: 'Add item',
          icon: !this.platform.is('ios') ? 'add' : null,
          handler: () => {
            this.addListItem(list);
          }
        },
        {
          text: 'Edit list',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.editList(list);
          }
        },
        {
          text: 'Change color',
          icon: !this.platform.is('ios') ? 'color-palette' : null,
          handler: () => {
            this.openColorPicker(list);
          }
        },
        {
          text: 'Move to trash',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            list.removed = true;
            this.events.publish('list:trashed', list);
            this.listsService.updateList(list);
            this.navCtrl.pop();
            this.helpersService.showToast(`${list.title} moved to trash`);
          }
        }
      ]
    });
    menu.present();
  }

  openColorPicker(list) {
    let colorpicker = this.modalCtrl.create(ColorpickerPage);
    colorpicker.onDidDismiss((color) => {
      if (color && list.color !== color) {
        list.color = color;
        this.listsService.updateList(list);
        this.helpersService.showToast('List successfully updated');
      }
    });

    colorpicker.present();
  }

  addListItem(list) {
    let alert = this.alertCtrl.create({
      title: 'New item',
      message: "Enter new item text",
      inputs: [
        {
          name: 'text',
          label: 'Item text',
          placeholder: 'Item text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.list.items.push({
              _id: this.helpersService.getRandomID(16),
              text: data.text.trim(),
              author: "author",
              isFinished: false,
              createdAt: Date.now(),
            });
            this.listsService.updateList(list);
            this.helpersService.showToast('List successfully updated');
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.list = this.navParams.get('list');
  }

}
