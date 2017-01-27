import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, MenuController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ListsPage} from '../lists/lists';
import {Settings} from "../../providers/settings";
import set = Reflect.set;

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  @ViewChild(Slides) slides: Slides;

  lastSlide = false;

  constructor(public navCtrl: NavController,
              public settingsService: Settings,
              public menu: MenuController) {
  }

  finish() {
    this.settingsService.getSettings().then(settings => {
      settings.firstLaunch = false;
      this.settingsService.updateSettings(settings);
    });
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

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave(){
    this.menu.enable(true);
  }

}
