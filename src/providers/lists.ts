import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
@Injectable()
export class Lists {

  constructor(public http: Http, private storage: Storage) {
  }

  getLists() {
    return this.storage.get('lists');
  }

  addList(list) {
    let lists;
    let newList = list;
    this.getLists().then(data => {
      lists = JSON.parse(data);
      lists.push(newList);
      this.storage.set('lists', JSON.stringify(lists));
    });
  }

  updateList(list){
    let lists;
    let newList = list;
    this.getLists().then(data =>{
      lists = JSON.parse(data);
      let index = lists.findIndex(x => x._id === newList._id);
      lists[index] = newList;
      this.storage.set('lists', JSON.stringify(lists));
    });
  }

  deleteList(list){
    let lists;
    this.getLists().then(data =>{
      lists = JSON.parse(data);
      let index = lists.findIndex(x => x._id === list._id);
      lists.splice(index, 1);
      this.storage.set('lists', JSON.stringify(lists));
    });
  }

}
