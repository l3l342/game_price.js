let detailFontSize = 20;
let statusFontSize = 10;
let detailColor = Color.white();

let widget = await buildWidget();

Script.setWidget(widget);
widget.presentSmall()
Script.complete();

async function buildWidget() {
    let widget = new ListWidget();
    widget.backgroundColor = Color.black();

    // hier schwiering wegen lending
    
    const price = await getPrice();
    
    let wprice = await widget.addText(price);
  
    wprice.font = Font.mediumRoundedSystemFont(detailFontSize);
    wprice.textcolor = detailColor;

    return widget;
}


async function getPrice() {
    const url = "https://store.steampowered.com/api/appdetails?appids=252490";
    const response = new Request(url);
    const data = await response.loadJSON()

    const price = data["252490"].data.price_overview.final_formatted;

    return price;
}
