import {Component} from '@angular/core';
import {NavParams, ViewController, ModalController} from 'ionic-angular';
import {Helpers} from "../../providers/helpers";
import {ColorpickerPage} from '../colorpicker/colorpicker';
import {Lists} from "../../providers/lists";

@Component({
  selector: 'page-list-form',
  templateUrl: 'list-form.html'
})
export class ListFormPage {
  pageTitle = '';
  list;
  items = [];
  mode = '';

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public helpers: Helpers,
              public modalCtrl: ModalController,
              public listsService: Lists) {
    this.pageTitle = navParams.get('title');
    this.list = navParams.get('list') ||
      {
        _id: this.helpers.getRandomID(16),
        title: '',
        items: [],
        createdAt: null,
        color: '#f4f4f4',
        removed: false,
      };
    this.mode = navParams.get('mode');
    if (this.list) {
      this.items = this.list.items;
    } else {
      this.items = [];
    }
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getFormMode() {
    if (this.mode === 'edit') {
      return 'Save List';
    } else {
      return 'Create List'
    }
  }

  addListItem(event) {
    if (event.which === 13 && event.target.value.trim()) {
      this.items.push({
        _id: this.helpers.getRandomID(16),
        text: event.target.value.trim(),
        author: "author",
        isFinished: false,
        createdAt: Date.now(),
      });
      event.target.value = '';
    }
  }

  removeListItem(id) {
    let index = this.items.findIndex(item => item._id === id);
    this.items.splice(index, 1);
  }

  toggleFinished(item) {
    item.isFinished = !item.isFinished;
    let index = this.items.findIndex(i => i._id === item._id);
    this.items[index] = item;
  }

  openColorPicker(list) {
    let colorpicker = this.modalCtrl.create(ColorpickerPage);
    colorpicker.onDidDismiss((color) => {
      if (color && list.color !== color) {
        list.color = color;
      } else {
        list.color = '#f4f4f4';
      }
    });

    colorpicker.present();
  }

  saveList(list) {
    list.createdAt = Date.now();
    if (this.mode === 'edit') {
      this.listsService.updateList(list);
    } else {
      this.listsService.addList(list);
    }
    this.viewCtrl.dismiss({modalList: list});
  }

}
