import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import {List} from "../models/list";
@Injectable()
export class Lists {

  constructor(private storage: Storage) {
  }

  getAllLists(): Promise<List[]> {
    return this.storage.get('lists').then(data => JSON.parse(data));
  }

  getLists(removed: boolean): Promise<List[]> {
    return this.storage.get('lists')
      .then(data => JSON.parse(data).filter(list => removed ? list.removed : !list.removed));
  }

  addList(list: List) {
    this.getAllLists().then((lists) => {
      lists.push(list);
      this.storage.set('lists', JSON.stringify(lists));
    });
  }

  updateList(list: List) {
    this.getAllLists().then((lists) => {
      let index = lists.findIndex(x => x._id === list._id);
      lists[index] = list;
      this.storage.set('lists', JSON.stringify(lists));
    });
  }

  deleteList(list: List) {
    this.getAllLists().then((lists) => {
      let index = lists.findIndex(x => x._id === list._id);
      lists.splice(index, 1);
      this.storage.set('lists', JSON.stringify(lists));
    });
  }

  deleteLists(lists: List[]) {
    this.getAllLists().then(data => {
      for (let list of lists) {
        let index = data.findIndex(x => x._id === list._id);
        data.splice(index, 1);
      }
      this.storage.set('lists', JSON.stringify(data));
    });
  }


}
