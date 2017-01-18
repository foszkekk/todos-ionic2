import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {ListsPage} from "../pages/lists/lists";
import {TrashPage} from "../pages/trash/trash";
import {Storage} from '@ionic/storage';
import {IntroPage} from "../pages/intro/intro";

const PAGES = [
  {name: 'Lists', component: ListsPage},
  {name: 'Trash', component: TrashPage}
];

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav;
  rootPage;

  constructor(platform: Platform, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      //Splashscreen.hide();
    });

    this.storage.get('firstLaunch').then(v => {
      if (v === null || v === undefined || v === true) {
        this.storage.set('firstLaunch', true);
        this.rootPage = IntroPage;
      } else {
        this.rootPage = ListsPage
      }
    })

    this.storage.get('lists').then(data => {
      if (!data) {
        this.storage.set('lists', JSON.stringify([]));
      }
    })

  }

  openPage(name) {
    let p = PAGES.find(page => page.name === name);
    this.nav.setRoot(p.component, {}, {animate: true, direction: 'forward'});
  }
}
