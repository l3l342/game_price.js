import fetch from "node-fetch";

let detailFontSize = 20;
let statusFontSize = 10;
let detailColor = Color.white();

let widget = buildWidget();

Script.setWidget(widget);
widget.presentSmall();
Script.complete();

function buildWidget() {
    let widget = new ListWidget();
    widget.backgroundColor = Color.black();

    const price = getPrice();

    let wprice = price.then(price => {widget.addText(price)});

    wprice.font = Font.mediumRoundedSystemFont(detailFontSize);
    wprice.textcolor = detailColor;
    wprice.centerAllignText();

    return widget;
}


async function getPrice() {
    const url = "https://store.steampowered.com/api/appdetails?appids=252490";
    const response = new Request(url);
    const data = await response.loadJSON()

    const price = data["252490"].data.price_overview.final_formatted;

    return price;
}