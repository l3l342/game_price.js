const Url = "https://store.steampowered.com/api/appdetails?appids=252490&cc=de"; 

let widget = await buildWidget();
Script.setWidget(widget);
widget.presentSmall()

async function buildWidget() {
    let widget = new ListWidget();
    
    widget.backgroundImage = await loadImage(await imageUrl(Url));
    
    
    const wheader = widget.addText("Preis:");
    
    wheader.font = Font.mediumRoundedSystemFont(20); 
    wheader.centerAlignText();
    wheader.textColor = Color.white();
    
    const price = await getPrice(Url);
    const wprice = await widget.addText(price);
    
    wprice.centerAlignText();
    wprice.font = Font.mediumRoundedSystemFont(30);
    wprice.textColor = Color.white();

    return widget;
}


async function getPrice(Url) {
    const response = new Request(Url);
    const data = await response.loadJSON()

    const price = data["252490"].data.price_overview.final_formatted;

    return price;
}


async function imageUrl(Url) {
    const response = new Request(Url);
    const data = await response.loadJSON()

    const link = data["252490"].data.screenshots[0].path_thumbnail;
    var linkarray = link.split("?");
    
    const imageurl = linkarray[0];
    
    return imageurl;
}

async function loadImage(imgurl) {
  const req = new Request(imgurl);
  return await req.loadImage()
}


Script.complete();
