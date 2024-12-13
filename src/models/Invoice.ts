import { t } from "mobx-state-tree";
import ItemList from "./ItemList";

export const Invoice = t
  .model("Invoice", {
    currency: t.string,
    is_paid: t.optional(t.boolean, false),
    ItemList: t.optional(ItemList, { items: [] }),
  })
  .actions((self) => ({
    markPaid() {
      self.is_paid = true;
    },
  }))
  .views((self) => ({
    status() {
      return self.is_paid ? "Paid" : "Not Paid";
    },
  }));
