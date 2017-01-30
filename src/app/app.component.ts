import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {ListsPage} from "../pages/lists/lists";
import {TrashPage} from "../pages/trash/trash";
import {IntroPage} from "../pages/intro/intro";
import {SettingsPage} from "../pages/settings/settings";
import {Settings} from "../providers/settings";
import {Lists} from "../providers/lists";

const PAGES = [
  {name: 'Lists', component: ListsPage},
  {name: 'Trash', component: TrashPage},
  {name: 'Settings', component: SettingsPage}
];

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav;
  rootPage;

  constructor(platform: Platform,
              public settingsService: Settings,
              public listsService: Lists) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.settingsService.getSettings().then(data => {
      if (data && data.firstLaunch === false)
        this.rootPage = ListsPage;
      else
        this.rootPage = IntroPage;
    });

    this.listsService.getAllLists().then(lists => {
      if (!lists)
        this.settingsService.clearData();
    });
  }

  openPage(name) {
    let p = PAGES.find(page => page.name === name);
    //check if current page is the same as one that user wants to open
    if (!(this.nav.getActive().instance instanceof p.component)) {
      this.nav.setRoot(p.component, {}, {animate: true, direction: 'forward'});
    }

  }
}
