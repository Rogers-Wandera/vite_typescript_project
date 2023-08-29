import DomListRender from "./DomListRender";
import FullList from "./FullList";
import ListItems from "./ListItem";

const initApp = (): void => {
  const fulllist = FullList.instance;
  const domlist = DomListRender.instance;

  const form = document.getElementById("addlistform") as HTMLFormElement;
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const input = document.getElementById("item") as HTMLInputElement;
    const newEntry: string = input.value.trim();
    if (!newEntry.length) return;
    const itemId: number = fulllist.items.length
      ? parseInt(fulllist.items[fulllist.items.length - 1].id) + 1
      : 1;
    const item = new ListItems(itemId.toString(), newEntry, false);
    fulllist.addItem(item);
    domlist.render(fulllist);
    console.log(fulllist.items);
  });
  fulllist.load();
  domlist.render(fulllist);
};

document.addEventListener("DOMContentLoaded", initApp);
