const LIFF_ID =
"2010462373";

const GAS_URL =
"https://script.google.com/macros/s/AKfycbzi31jAeMUvjNX2upyjlFj4rfLFhvLzH5eOYr2Yu2nxnpGxcHe-MiCoU9htwL80BEdG/exec";

// const prices = {

// "玫瑰花茶咖啡":220,

// "天使藝妓":350,

// "巴西喜拉朵":180

// };

// async function init() {

// await liff.init({

// liffId: LIFF_ID

// });

// }



// init();

// document
// .getElementById("product")
// .addEventListener(
// "change",
// updateTotal
// );

// document
// .getElementById("qty")
// .addEventListener(
// "change",
// updateTotal
// );

// function updateTotal(){

// const product =
// document.getElementById("product").value;

// const qty =
// parseInt(
// document.getElementById("qty").value
// );

// document.getElementById("total")
// .innerText =
// prices[product] * qty;

// }

// async function submitOrder(){

// const profile =
// await liff.getProfile();

// const data = {

// userId:
// profile.userId,

// name:
// document.getElementById("name").value,

// phone:
// document.getElementById("phone").value,

// address:
// document.getElementById("address").value,

// product:
// document.getElementById("product").value,

// size:
// document.getElementById("size").value,

// grind:
// document.getElementById("grind").value,

// qty:
// document.getElementById("qty").value,

// total:
// document.getElementById("total").innerText

// };

// await fetch(
// GAS_URL,
// {
// method:"POST",

// headers:{
// "Content-Type":
// "application/json"
// },

// body:
// JSON.stringify(data)
// }
// );

// alert(
// "感謝訂購麥灶嘎逼 ☕"
// );

// liff.closeWindow();

// }

const products = {

rose:220,

gesha:350,

brazil:180

};

function changeQty(id, amount){

let current =
parseInt(
document.getElementById(id).innerText
);

current += amount;

if(current < 0){
current = 0;
}

document.getElementById(id).innerText =
current;

updateTotal();

}

function updateTotal(){

const rose =
parseInt(
document.getElementById("rose").innerText
);

const gesha =
parseInt(
document.getElementById("gesha").innerText
);

const brazil =
parseInt(
document.getElementById("brazil").innerText
);

const total =

rose * products.rose +
gesha * products.gesha +
brazil * products.brazil;

document.getElementById("total")
.innerText = total;

}
