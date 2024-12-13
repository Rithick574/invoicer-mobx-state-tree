import { getParent, t } from "mobx-state-tree";
import ItemList from "./ItemList";

const Item = t
  .model("Item", {
    quantity: t.number,
    price: t.number,
    name: t.string,
  })
  .actions((self) => ({
    increment() {
      self.quantity += 1;
    },
    decrement() {
      self.quantity -= 1;
    },
    remove() {
      getParent<typeof ItemList>(self, 2).remove(self);
    },
  }))
  .views((self) => ({
    total() {
      return self.quantity * self.price;
    },
  }));

export default Item;
