export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  decrementSellIn(item) {
    item.sellIn = item.sellIn - 1;
  }

  decrementQualityByOne(item) {
    item.quality = Math.max(item.quality - 1, 0);
  }

  incrementQualityByAmount(item, amount) {
    item.quality = Math.min(item.quality + amount, 50);
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name != "Sulfuras, Hand of Ragnaros") {

        if (item.name == "Aged Brie") {
          this.incrementQualityByAmount(item, 1);
        } else if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellIn < 6) {
            this.incrementQualityByAmount(item, 3);
          } else if (item.sellIn < 11) {
            this.incrementQualityByAmount(item, 2);
          } else {
            this.incrementQualityByAmount(item, 1);
          }
        } else {
          this.decrementQualityByOne(item)
        }

        this.decrementSellIn(item);

        if (item.sellIn < 0) {
          if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
            this.decrementQualityByOne(item)
          }
        }

        if (item.name == "Backstage passes to a TAFKAL80ETC concert" && item.sellIn < 0) {
          item.quality = 0
        }
      }
    }

    return this.items;
  }
}
