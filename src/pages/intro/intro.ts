import {Component, ViewChild} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ListsPage} from '../lists/lists';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  @ViewChild(Slides) slides: Slides;

  lastSlide = false;

  constructor(public navCtrl: NavController,
              public storage: Storage) {
  }

  finish() {
    this.storage.set('firstLaunch', false);
    this.navCtrl.setRoot(ListsPage, {}, {animate: true, direction: 'forward'});
  }

  skip() {
    this.slides.slideTo(this.slides.length(), 200);
  }

  slideChanged() {
    this.lastSlide = this.slides.isEnd();
  }

  ionViewDidLoad() {
  }

}
