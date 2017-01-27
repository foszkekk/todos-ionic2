import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Settings} from "../../providers/settings";
import {Helpers} from "../../providers/helpers";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  userSettings = {};
  toasts;

  constructor(public settingsService: Settings,
              public helpersService: Helpers,
              public alertCtrl: AlertController) {
    this.getSettings();
  }

  getSettings() {
    this.settingsService.getSettings().then(data => {
      this.userSettings = data;
      this.toasts = data.showToasts;
    });
  }

  clearData() {
    let confirm = this.alertCtrl.create({
      message: `Clear all your data? <p><small>This will erase all your data and restore settings to default</small></p>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Clear',
          handler: () => {
            this.settingsService.clearData();
            this.helpersService.showToast('All data has been removed');
            this.getSettings();
          }
        }
      ]
    });
    confirm.present();
  }

  restoreDefaults() {
    let confirm = this.alertCtrl.create({
      message: `Restore settings to default?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Restore',
          handler: () => {
            this.settingsService.resetSettings();
            this.helpersService.showToast('Settings restored to default');
            this.getSettings();
          }
        }
      ]
    });
    confirm.present();
  }

  updateSettings() {
    this.settingsService.updateSettings(this.userSettings);
  }

  ionViewDidLoad() {
  }

}
