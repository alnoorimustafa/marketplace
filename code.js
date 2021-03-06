"use strict";
require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const {
  Category,
  Products,
  Users,
  base,
  Invoices,
  Messages,
} = require("./AirTable");

// from Airtable
let message = [];
let categories = [];
let products = [];
let users = [];
let allUsers = [];

// modified
let newCategories = [];
let selected = "";
let price;
let rate = 0;
let chosenProductName;
let pro;

//from previous arrays
let categoryNames = [];
let productsNames = [];
let chosenCategory;
let chosenProducts = [];
let phone;
let activeInvoices = [];
let deptUsers = [];

function minify(array) {
  let newArray = array.map((item) => {
    return { id: item.id, ...item.fields };
  });
  return newArray;
}

async function getUsers() {
  allUsers = minify(
    await Users
      .select
      // { filterByFormula: `{Status}='active'` }
      ()
      .firstPage()
  );
  users = minify(
    await Users.select({ filterByFormula: `{Status}='active'` }).firstPage()
  );
  deptUsers = minify(
    await Users.select({ filterByFormula: `NOT({Invoices}='')` }).firstPage()
  );

  console.log("Users Downloaded");
}

function organize() {
  newCategories = categories.map((category) => {
    return {
      Name: category.Name,
      Products: products.filter((item) => {
        return category.Products.includes(item.id);
      }),
    };
  });

  let newCat = [];
  newCategories.forEach(function (item) {
    if (item.Products && item.Products.length > 0) {
      newCat.push(item);
    }
  });
  newCategories = newCat;
}

async function startServer() {
  categories = minify(
    await Category.select({ filterByFormula: `NOT({Products}='')` }).firstPage()
  );

  message = minify(await Messages.select().firstPage());
  products = minify(
    await Products.select({
      filterByFormula: `{Status}='available'`,
    }).firstPage()
  );

  getUsers();
  organize();

  categoryNames = newCategories.map((element) => {
    return element.Name;
  });
  productsNames = products.map((element) => {
    return element.Name;
  });
  console.log("Server Started");
}

startServer();

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////BOT STARTS////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
bot.start((ctx) => {
  ctx.reply(
    message.find((m) => {
      return m.Name == "start";
    }).text
  );
});

bot.command("begin", (ctx) => {
  showCategories(ctx);
});
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////SHOW CATEGORIES///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function showCategories(ctx) {
  let keyboard = [];
  newCategories.forEach((item) =>
    keyboard.push([{ text: item.Name, callback_data: item.Name }])
  );
  let categoryMessage = message.find((item) => {
    return item.Name == "begin";
  });
  ctx.reply(categoryMessage.text, {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
  bot.action(categoryNames, (ctx) => {
    chosenCategory = newCategories.find((item) => item.Name == ctx.match[0]);
    showProducts(ctx, chosenCategory);
  });
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////SHOW PRODUCTS////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function showProducts(ctx, chosenCategory, notFromPrice = true) {
  chosenProducts = chosenCategory.Products;
  let keyboard = [[{ text: "????????", callback_data: "cat" }]];
  chosenProducts.forEach((item) =>
    keyboard.unshift([{ text: item.Name, callback_data: item.Name }])
  );
  if (notFromPrice) {
    ctx.editMessageText(`${chosenCategory.Name}`, {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } else {
    ctx.reply(`${chosenCategory.Name}`, {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  }
  bot.action("cat", (ctx) => {
    ctx.deleteMessage();
    showCategories(ctx);
  });
  bot.action(productsNames, (ctx) => {
    showPrice(ctx);
  });
}
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////SHOW PRICE////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function showPrice(ctx) {
  let found;
  if (ctx.match) {
    found = products.find((item) => item.Name == ctx.match[0]);
  }
  if (found) {
    pro = found;
  }
  price = pro.price;
  let keyboard = [
    [
      { text: `?????????? ????????????`, callback_data: "g" },
      { text: `?????????? ??????????`, callback_data: "g" },
      {
        text: `?????? ????????????`,
        callback_data: "g",
      },
    ],
    [
      {
        text: `${Math.round((price * 0.09 + price) / 3)} $`,
        callback_data: "3",
      },
      { text: ` ${Math.round(price * 0.09 + price)} $`, callback_data: "3" },
      {
        text: `3 ????????`,
        callback_data: "3",
      },
    ],
    [
      {
        text: `${Math.round((price * 0.18 + price) / 6)} $`,
        callback_data: "6",
      },
      { text: ` ${Math.round(price * 0.18 + price)} $`, callback_data: "6" },
      {
        text: `6 ????????`,
        callback_data: "6",
      },
    ],
    [
      {
        text: `${Math.round((price * 0.36 + price) / 12)} $`,
        callback_data: "12",
      },
      { text: ` ${Math.round(price * 0.36 + price)} $`, callback_data: "12" },
      {
        text: `12 ????????`,
        callback_data: "12",
      },
    ],

    [{ text: "????????", callback_data: "products" }],
  ];
  ctx.deleteMessage();
  let m = message.find((m) => {
    return m.Name == "product";
  });
  let inject = (str, obj) => str.replace(/\${(.*?)}/g, (x, g) => obj[g]);
  let inj = inject(m.text, { Name: pro.Name, Price: pro.price });
  if (pro.image[0]) {
    ctx.replyWithPhoto(
      { url: pro.image[0].url },
      {
        // caption: `
        // ?????? ???????????? ${pro.Name}
        // ?????? ???????????? ???????? ${pro.price}
        // ?????? ???????????? ???????????? ????`,
        caption: inj,
        reply_markup: {
          inline_keyboard: keyboard,
        },
      }
    );
  } else {
    ctx.reply(
      `        
        ?????? ???????????? ${pro.Name}
        ?????? ???????????? ???????? ${pro.price}
        ?????? ???????????? ???????????? ????`,
      {
        reply_markup: {
          inline_keyboard: keyboard,
        },
      }
    );
  }
  bot.action("products", (ctx) => {
    ctx.deleteMessage();
    showProducts(ctx, chosenCategory, false);
  });
  bot.action(["12", "6", "3"], (ctx) => {
    ctx.deleteMessage();
    selectPrice(ctx, pro);
  });
}
////////////////////////////////////////////////////////////////////////////////
///////////////////////SELECT PRICE/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function selectPrice(ctx, pro) {
  selected = ctx.match[0];
  if (selected == "12") {
    rate = 0.36;
  } else if (selected == "6") {
    rate = 0.18;
  } else if (selected == "3") {
    rate = 0.09;
  }
  price = pro.price;
  chosenProductName = pro.Name;
  let keyboard = [
    [
      { text: `??????????`, callback_data: "ok" },
      { text: `??????????`, callback_data: "cancel" },
    ],
  ];
  ctx.reply(
    `
    *****************************
    ----------------------------------------
    ----------------------------------------
  ?????????? ${pro.Name}
  ?????? ?????????????? ${selected} ??????
  ?????????? ?????????? ???? ??????????????  ${price * rate + price} $
  ?????????? ????????????  ${Math.round((price * rate + price) / selected)} $
  ???? ???????? ?????????? ??????????
  ----------------------------------------
  ----------------------------------------
  *****************************
  `,
    {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    }
  );

  bot.action("cancel", (ctx) => {
    showPrice(ctx);
  });

  bot.action("ok", (ctx) => {
    let found = users.find((user) => {
      return user.ID == ctx.from.id && user.Status == "active";
    });
    if (found) {
      let invoiceFields = {
        Name: chosenProductName,
        Status: "In Review",
        months: +selected,
        "original price": Math.round(price * rate + price),
        paid: 0,
        "monthly payment": Math.round((price * rate + price) / selected),
        Users: [`${found.id}`],
      };
      confirm(ctx, invoiceFields, found);
    } else {
      getInfo(ctx);
    }
  });
}

async function confirm(ctx, invoiceFields, found) {
  let added = await base("Invoices").create(invoiceFields);
  if (added) {
    ctx.editMessageText("???? ?????????? ??????????");
    bot.telegram.sendMessage(
      "108945812",
      `
      ?????? ?????????? ????
      ???????????? : ${found.Name}
      ?? ?????? ???????????? : ${found.phone}
      ????????
      ???????????? : ${invoiceFields.Name}
      ?????? : ${invoiceFields.months} ??????
      ???????? : ${invoiceFields["original price"]} $
      ???????? ???????????? ???????? ????????????????
      `
    );
  }
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function getInfo(ctx) {
  ctx.deleteMessage();
  let curUser = allUsers.find((item) => {
    return item.ID == ctx.from.id;
  });
  if (
    allUsers.find((item) => {
      return item.ID == ctx.from.id;
    })
  ) {
    if (curUser.Status == "banned") {
      ctx.reply(
        `
???????? ???? ?????????? ???????????? ?????? ??????????
        `
      );
    } else {
      ctx.reply(
        `
        ?????? ?????? ???????? ??????????
        ?????????? ???????? ?????? ???????????? ??????????
        ???????? ???????????? ????????????????
        `
      );
    }
  } else {
    ctx.reply(
      `
      ???? ?????????? ?????????? ?????????? ??????????
      ???????? ?????? ???????? ??????????
      ???????? ?????? ???????????? ????????
      ??????????????
      `,
      Markup.keyboard([Markup.button.contactRequest("???????? ??????????")]).resize()
    );
    bot.on("contact", async (ctx1) => {
      phone = ctx1.message.contact.phone_number;
      ctx1.reply(
        `???? ???????????? ???????? ??????????
      ?????? ???????? ?????????? ???? ???????? ??????????
      `,
        {
          reply_to_message_id: ctx1.message.id,
        }
      );
      let userFields = {
        Name: ctx1.from.username,
        Status: "pending",
        ID: `${ctx1.from.id}`,
        phone: phone,
      };
      let created = await base("Users").create(userFields);
      if (created) {
        bot.telegram.sendMessage(
          "108945812",
          `
          ${created.fields.Name}
          ${created.fields.phone}
          ?????????? ???????? ?????????????? ???? ??????????
          `,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  Markup.button.callback("??????", "approve"),
                  Markup.button.callback("??????", "disapprove"),
                ],
              ],
            },
          }
        );
        waitforhim(created, ctx1);
        updateServer();
      }
    });
  }
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function waitforhim(created, ctx1) {
  bot.action(["approve", "disapprove"], (ctx) => {
    if (ctx.match[0] == "approve") {
      base("Users").update([
        {
          id: `${created.id}`,
          fields: {
            Status: "active",
          },
        },
      ]);
      bot.telegram.sendMessage(
        ctx1.chat.id,
        `
      ?????? ???? ?????????? , ???????? ?????????? ??????????
      /retry
      `
      );
    } else if (ctx.match[0] == "disapprove") {
      base("Users").update([
        {
          id: `${created.id}`,
          fields: {
            Status: "banned",
          },
        },
      ]);
      bot.telegram.sendMessage(ctx1.chat.id, "???? ?????? ?????? ????????????????");
    }
    getUsers();
    ctx.deleteMessage();
  });
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

async function getInvoices(ID) {
  activeInvoices = minify(
    await Invoices.select({
      filterByFormula: `{ID (from Users)}='${ID}'`,
    }).firstPage()
  );
  return activeInvoices;
}

bot.command("info", async (ctx) => {
  let currentUser = users.find((user) => user.ID == ctx.from.id);
  let activeInvoices = await getInvoices(currentUser.ID);
  let invoice = [];
  activeInvoices.forEach((item) => {
    invoice.push(item.Name);
  });
  let remaining = activeInvoices.map((item) => {
    return item["original price"] - item.paid;
  });

  let text = [];
  let allDept = 0;
  activeInvoices.forEach((element, i) => {
    let remPay = 0;
    if (element.remaining > element["monthly payment"]) {
      remPay = element["monthly payment"];
    } else {
      remPay = element.remaining;
    }
    text.push(`
     ?????? ?????????? ?????????? : ${invoice[i]}
      ???????????? ?????????????? ???????? : ${remaining[i]} $
      ?????? ???????????? ???????????????? : ${element["remaining month"]} 
      ?????????? ???????????? : ${remPay}

      `);

    allDept += Math.round(element["monthly payment"]);
  });
  ctx.reply(
    `
      *********************************************

      ${text.join("      ")}

      ?????????? ?????????? ???????????? ${allDept} $


      *********************************************
      ?????????????????? ???????????????? ?????????? ????????????????
    @RidhaAzeez
    `
  );
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
bot.launch();

bot.command("retry", (ctx) => {
  showPrice(ctx);
});

bot.command("update", async (ctx) => {
  await updateServer();
  bot.telegram.sendMessage("108945812", "server updated");
});

bot.command("users", async (ctx) => {
  await getUsers();
  bot.telegram.sendMessage("108945812", "users updated");
});

bot.command("remind", async (ctx) => {
  await getUsers();
  deptUsers.forEach((user) => {
    bot.telegram.sendMessage(
      user.ID,
      message.find((mes) => mes.Name == "reminder").text
    );
  });
  bot.telegram.sendMessage("108945812", "users reminded");
});

function updateServer() {
  getRecords();
}

bot.on("text", (ctx) => {
  let message = ctx.message.text.split(" ");
  console.log(message);
  if (
    message[0] &&
    message[0] == "pay" &&
    message[1] &&
    message[2] &&
    !message[3]
  ) {
    let payingUser;
    let user = message[1];
    let amount = +message[2];
    payingUser = deptUsers.find((item) => {
      return item.ID == user || item.Name == user;
    });
    if (payingUser) {
      console.log("trying to pay");
      pay(ctx, payingUser, amount);
      return;
    } else {
      ctx.reply("???? ???????? ?????????? ????????????????");
    }
  } else {
    ctx.reply("???????? \n /start");
  }
});

async function pay(ctx, user, amount) {
  let activeUser = users.find((item) => item.ID == user.ID);
  let invoices = await getInvoices(activeUser.ID);
  let keyboard = [];
  invoices.forEach((invoice) => {
    console.log(invoice);
    keyboard.push([
      {
        text: `?????? ???????????? : ${invoice.Name} ?????????????? : ${invoice.remaining} $ ?????????? ???????????? : ${invoice["monthly payment"]} $
    `,
        callback_data: `${invoice.id}`,
      },
    ]);
  });
  bot.telegram.sendMessage(ctx.chat.id, "???????? ????????????", {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
  let invoiceIds = invoices.map((item) => item.id);
  bot.action(invoiceIds, async (ctx) => {
    let actInvoice = invoices.find((item) => item.id == ctx.match[0]);
    if (amount <= actInvoice.remaining) {
      let paid = await paying(amount, actInvoice);
      if (paid[0].fields.remaining == 0) {
        bot.telegram.sendMessage(
          user.ID,
          `
        ?????????? ?????? ???? ?????????? ???????? ?????????? ????????????
        ${actInvoice.Name}
        `
        );
      }
      ctx.editMessageText(`
      ****************************************************
      ****************************************************
      ???????? : ${amount} $
      ???????????? : ${actInvoice.Name}
      ?????????? ?????????????? : ${paid[0].fields.paid}  $
      ?????????????? : ${paid[0].fields.remaining}  $
      ?????? ???????????? ???????????????? : ${paid[0].fields["remaining month"]} 
      ****************************************************
      ****************************************************
      `);
      bot.telegram.sendMessage(
        user.ID,
        `
      ****************************************************
      ****************************************************
      ???????? : ${amount} $
      ???????????? : ${actInvoice.Name}
      ?????????? ?????????????? : ${paid[0].fields.paid}  $
      ?????????????? : ${paid[0].fields.remaining}  $
      ?????? ???????????? ???????????????? : ${paid[0].fields["remaining month"]} 
      ****************************************************
      ****************************************************
      `
      );
    } else if (amount > actInvoice.remaining) {
      ctx.editMessageText("???????????? ???????????? ??????????????");
    }
  });
}

function paying(amount, item) {
  let returned = Invoices.update([
    {
      id: item.id,
      fields: {
        paid: item.paid + amount,
      },
    },
  ]);
  return returned;
}
