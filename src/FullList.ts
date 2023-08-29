import ListItems from "./ListItem";

export interface List {
  items: ListItems[];
  load(): void;
  save(): void;
  clear(): void;
  addItem(itemObj: ListItems): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  constructor(private _list: ListItems[] = []) {}

  get items(): ListItems[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("mylist");
    if (typeof storedList !== "string") return;
    const parsedList: { id: string; item: string; checked: boolean }[] =
      JSON.parse(storedList);
    console.log(storedList);
    parsedList.forEach((item) => {
      const newListItem = new ListItems(item.id, item.item, item.checked);
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem("mylist", JSON.stringify(this._list));
  }

  clear(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItems): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
