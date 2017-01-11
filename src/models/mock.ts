import {List} from './list';
import {ListItem} from './listItem';

export const ITEMS = [
  {
    _id: 'asd',
    text: "item 1",
    author: "topkek",
    isFinished: false,
    createdAt: Date.now(),
  }, {
    _id: 'asd1',
    text: "item 2",
    author: "topkek",
    isFinished: true,
    createdAt: Date.now(),
  }, {
    _id: 'asd2',
    text: "item 3",
    author: "ulucuck",
    isFinished: true,
    createdAt: Date.now(),
  }, {
    _id: 'as3',
    text: "item 4",
    author: "ulucuck",
    isFinished: false,
    createdAt: Date.now(),
  },
];

export const LISTS = [
  {
    _id: 'xyz',
    title: 'List 1',
    items: [ITEMS[0], ITEMS[1]],
    createdAt: Date.now(),
    color: '#FF7043',
    removed: false,
  },
  {
    _id: 'xyz1',
    title: 'List 2',
    items: [ITEMS[2], ITEMS[3]],
    createdAt: Date.now(),
    color: '#29B6F6',
    removed: true,
  },
];


