import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { Invoice } from "./models/Invoice.ts";
import { onPatch } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst"


const invoice = Invoice.create({ currency: "INR" });

onPatch(invoice, (patch) => {
  console.log("Patch applied:", patch);
});

makeInspectable(invoice)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App invoice={invoice} />
  </StrictMode>
);
