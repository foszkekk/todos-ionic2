import {ListItem} from "./listItem";
export class List {
  _id: string;
  title: string;
  items: ListItem[];
  createdAt: number;
  color: string;
  removed: boolean;
}
