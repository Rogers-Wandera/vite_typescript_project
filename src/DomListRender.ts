import FullList from "./FullList";

export interface DomUi {
  ui: HTMLUListElement;
  clear(): void;
  render(fulllist: FullList): void;
}

export default class DomListRender implements DomUi {
  ui: HTMLUListElement;
  static instance: DomListRender = new DomListRender();
  private constructor() {
    this.ui = document.getElementById("listitems") as HTMLUListElement;
  }
  clear(): void {
    this.ui.innerHTML = "";
  }
  render(fulllist: FullList): void {
    this.clear();
    fulllist.items.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      const checkbox = document.createElement("input") as HTMLInputElement;
      checkbox.id = item.id;
      checkbox.type = "checkbox";
      checkbox.checked = item.checked;
      li.append(checkbox);
      checkbox.addEventListener("change", () => {
        item.checked = !item.checked;
        fulllist.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      const button = document.createElement("button");
      button.textContent = "X";
      li.append(button);

      button.addEventListener("click", () => {
        fulllist.removeItem(item.id);
        this.render(fulllist);
      });

      this.ui.append(li);
    });
  }
}
