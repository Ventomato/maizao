

/****************************************
 * 麥灶嘎逼 商城
 ****************************************/
const LIFF_ID ="2010462373-nzIhd1yt";

const GAS_URL =
"https://script.google.com/macros/s/AKfycby0l1Iw5-q-QA1_-49dYDRkyJhUKxdkvef6RK2DXAm6m675PhN1ppJQpF3GgOol-yqf/exec";




/****************************************
 * 商品資料
 ****************************************/

const products = [
  {
    id: "rose",
    name: "泰國玫瑰",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600",
    note: "花香・荔枝・蜜甜",
    tags: ["花香", "荔枝", "蜜甜"],

    bean: {
      "50g": 120,
      "100g": 230,
      "200g": 440
    },

    drip: 40
  },

  {
    id: "gesha",
    name: "天使藝妓",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    note: "白花・佛手柑・柑橘",
    tags: ["白花", "佛手柑", "柑橘"],

    bean: {
      "50g": 120,
      "100g": 230,
      "200g": 440
    },

    drip: 40
  },

  {
    id: "pomelo",
    name: "茉香柚",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600",
    note: "茉莉花・柚香・茶感",
    tags: ["茉莉花", "柚香", "茶感"],

    bean: {
      "50g": 120,
      "100g": 230,
      "200g": 440
    },

    drip: 40
  },

  {
    id: "hongyun",
    name: "柑露紅韻",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
    note: "柑橘・紅茶・蜂蜜",
    tags: ["柑橘", "紅茶", "蜂蜜"],

    bean: {
      "50g": 100,
      "100g": 200,
      "200g": 380
    },

    drip: 35
  },

  {
    id: "brazil",
    name: "巴西喜拉朵",
    image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=600",
    note: "可可・堅果・焦糖",
    tags: ["可可", "堅果", "焦糖"],

    bean: {
      "50g": 80,
      "100g": 150,
      "200g": 280
    },

    drip: 25
  }
];

/****************************************
 * 購物車
 ****************************************/

const cart = {};

/****************************************
 * LIFF
 ****************************************/

async function initLiff() {

  if (!LIFF_ID || LIFF_ID === "YOUR_LIFF_ID") {
    return;
  }

  try {

    await liff.init({
      liffId: LIFF_ID
    });

    if (liff.isLoggedIn()) {

      const profile =
        await liff.getProfile();

      document.getElementById("name").value =
        profile.displayName;

      window.lineName =
        profile.displayName;

    }

  } catch (err) {

    console.error(err);

  }
}

/****************************************
 * 建立商品畫面
 ****************************************/

function renderProducts() {

  const container =
    document.getElementById(
      "productList"
    );

  container.innerHTML = "";

  products.forEach(product => {

    const html = `

    <div class="product-card">

      <div class="product-row">

        <img
          src="${product.image}"
          class="product-image">

        <div class="product-content">

          <div class="product-name">
            ${product.name}
          </div>

          <div class="product-note">
            ${product.note}
          </div>

          <div class="tags">
            ${product.tags.map(
              tag => `<span>${tag}</span>`
            ).join("")}
          </div>

          <div class="option-row">

            <select
              id="type-${product.id}"
              onchange="updatePrice('${product.id}')">

              <option value="bean">
                咖啡豆
              </option>

              <option value="drip">
                濾掛
              </option>

            </select>

          </div>

          <div class="option-row">

            <select
              id="size-${product.id}"
              onchange="updatePrice('${product.id}')">

              <option value="50g">
                50g
              </option>

              <option value="100g">
                100g
              </option>

              <option value="200g">
                200g
              </option>

            </select>

          </div>

          <div class="price-row">

            <div
              class="price"
              id="price-${product.id}">
            </div>

            <div class="qty">

              <button
                onclick="changeQty('${product.id}',-1)">
                -
              </button>

              <span
                id="qty-${product.id}">
                0
              </span>

              <button
                onclick="changeQty('${product.id}',1)">
                +
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

    `;

    container.insertAdjacentHTML(
      "beforeend",
      html
    );

    updatePrice(product.id);

  });

}

/****************************************
 * 更新價格
 ****************************************/

function updatePrice(productId) {

  const product =
    products.find(
      p => p.id === productId
    );

  const type =
    document.getElementById(
      `type-${productId}`
    ).value;

  const size =
    document.getElementById(
      `size-${productId}`
    ).value;

  let price = 0;

  if (type === "bean") {

    price =
      product.bean[size];

  } else {

    price =
      product.drip;

  }

  document.getElementById(
    `price-${productId}`
  ).innerText = `NT$${price}`;

}

/****************************************
 * 數量控制
 ****************************************/

function changeQty(productId, diff) {

  const el =
    document.getElementById(
      `qty-${productId}`
    );

  let qty =
    parseInt(el.innerText);

  qty += diff;

  if (qty < 0) qty = 0;

  el.innerText = qty;

  updateCart();

}

/****************************************
 * 更新購物車
 ****************************************/

function updateCart() {

  let subtotal = 0;

  products.forEach(product => {

    const qty =
      parseInt(
        document.getElementById(
          `qty-${product.id}`
        ).innerText
      );

    if (qty <= 0) return;

    const type =
      document.getElementById(
        `type-${product.id}`
      ).value;

    const size =
      document.getElementById(
        `size-${product.id}`
      ).value;

    let price = 0;

    if (type === "bean") {

      price =
        product.bean[size];

    } else {

      price =
        product.drip;

    }

    subtotal +=
      price * qty;

  });

  const shipping =
    subtotal >= 1000 || subtotal === 0
      ? 0
      : 60;

  const total =
    subtotal + shipping;

  document.getElementById(
    "subtotal"
  ).innerText = subtotal;

  document.getElementById(
    "shippingFee"
  ).innerText = shipping;

  document.getElementById(
    "grandTotal"
  ).innerText = total;

}

/****************************************
 * 建立訂單資料
 ****************************************/

function buildOrderItems() {

  const items = [];

  products.forEach(product => {

    const qty =
      parseInt(
        document.getElementById(
          `qty-${product.id}`
        ).innerText
      );

    if (qty <= 0) return;

    const type =
      document.getElementById(
        `type-${product.id}`
      ).value;

    const size =
      document.getElementById(
        `size-${product.id}`
      ).value;

    let price;

    if (type === "bean") {

      price =
        product.bean[size];

    } else {

      price =
        product.drip;

    }

    items.push({

      product:
        product.name,

      type:
        type === "bean"
          ? "咖啡豆"
          : "濾掛",

      size:
        type === "bean"
          ? size
          : "單包",

      qty,

      price

    });

  });

  return items;

}

/****************************************
 * 送出訂單
 ****************************************/

async function submitOrder() {

  const items =
    buildOrderItems();

  if (items.length === 0) {

    alert(
      "請至少選擇一項商品"
    );

    return;

  }

  const data = {

    lineName:
      window.lineName || "",

    name:
      document.getElementById(
        "name"
      ).value,

    phone:
      document.getElementById(
        "phone"
      ).value,

    address:
      document.getElementById(
        "address"
      ).value,

    shippingMethod:
      document.getElementById(
        "shippingMethod"
      ).value,

    total:
      parseInt(
        document.getElementById(
          "grandTotal"
        ).innerText
      ),

    items

  };

  try {

    // const response =
    //   await fetch(
    //     GAS_URL,
    //     {
    //       method: "POST",

    //       headers: {
    //         "Content-Type":
    //           "application/json"
    //       },

    //       body:
    //         JSON.stringify(data)
    //     }
    //   );
    const formData = new FormData();

        formData.append(
        "data",
        JSON.stringify(data)
        );

        const response =
        await fetch(
        GAS_URL +
            "?data=" +
            encodeURIComponent(
                JSON.stringify(data)
            )
        );
        

    const result =
      await response.json();
      console.log(result);
    showSuccess(result.order);

  } catch (err) {

    console.error(err);

    alert(
      "送出失敗，請稍後再試"
    );

  }

}

/****************************************
 * 成功畫面
 ****************************************/

function showSuccess(order) {

  const info = `

訂單編號：
${order.orderId}

應付金額：
NT$${order.total}

配送方式：
${order.shippingMethod}

`;

  document.getElementById(
    "orderInfo"
  ).innerText = info;

  window.orderText = info;

  document
    .getElementById(
      "successPage"
    )
    .classList
    .remove("hidden");

}

/****************************************
 * 複製資訊
 ****************************************/

function copyOrderInfo() {

  navigator.clipboard.writeText(
    window.orderText || ""
  );

  alert(
    "訂單資訊已複製"
  );

}

/****************************************
 * 啟動
 ****************************************/

renderProducts();

updateCart();

initLiff();

/*免運提示 */
const remain =
1000 - subtotal;

if(remain > 0){

message =
`再差 NT$${remain}
即可免運`;

}else{

message =
"已達免運門檻 🎉";

}

/*訂單送出後line通知 */
function sendLineNotify(order){

  const token = "你的LINE Notify Token";

  const msg =
`☕ 麥灶嘎逼新訂單

訂單編號：
${order.orderId}

姓名：
${order.name}

金額：
NT$${order.total}
`;

  UrlFetchApp.fetch(
    "https://notify-api.line.me/api/notify",
    {
      method:"post",

      headers:{
        Authorization:
          "Bearer " + token
      },

      payload:{
        message:msg
      }
    }
  );
}

