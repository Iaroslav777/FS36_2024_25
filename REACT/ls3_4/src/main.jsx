import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import React from "react";

// console.log(App());
function A() {
  console.log(22222);
}
function B() {
  console.log(33333);
  return 333333;
}
const ob = { s: 1 };
const n1 = 111;
// const n2 = true;
const n3 = "Hello";

const ddd = "class My name";

const El = React.createElement("section", { d: 111111 }, <h2>Hello</h2>);

const randomID = "ID-" + Math.random();

createRoot(document.getElementById("root")).render(
  <>
    <div>
      <h1>Hello React</h1>

      {/* class */}
      <div className="bg-red">Hello text</div>
      <App />
    </div>
    <App> </App>
    <App />
    <App variable1="23456">
      <div></div>
    </App>
    {/* {App()} */}
    {/* зробили інтерполяцію ddd */}
    <div className={ddd}>111</div>
    <div>{111}</div>
    <div>{n1}</div>
    <div>{A()}</div>
    <div>
      <h3>{n3}</h3>
    </div>
    <div>
      {(() => {
        console.log(44444);
        return 44444;
      })()}
    </div>
    <div>{B()}</div>
    <div>{ob.s}</div>
    <div>{React.createElement("div", { className: 1 }, <div>2221</div>)}</div>
    {/* так краще не робити */}
    <div>{El}</div>
    <div id={randomID}>{randomID}</div>
  </>
);
