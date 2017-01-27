import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class Settings {

  constructor(public storage: Storage) {
  }

  getSettings() {
    return Promise.resolve(this.storage.get('settings').then(data => {
      if (data)
        return JSON.parse(data);
      else
        this.resetSettings();
    }));
  }

  resetSettings() {
    return this.storage.set('settings', JSON.stringify({
      firstLaunch: true,
      showToasts: true
    }));
  }

  clearData() {
    this.resetSettings().then(() => this.storage.set('lists', JSON.stringify([])));
  }

  updateSettings(data) {
    this.storage.set('settings', JSON.stringify(data));
  }

}
