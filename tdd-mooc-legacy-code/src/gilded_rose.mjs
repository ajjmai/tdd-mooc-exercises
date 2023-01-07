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

  decrementQualityByAmount(item, amount) {
    item.quality = item.quality - amount;
  }

  decrementQualityByOne(item) {
    this.decrementQualityByAmount(item, 1);
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
        if (item.quality > 0) {
          if (item.name != "Sulfuras, Hand of Ragnaros") {
            this.decrementQualityByOne(item)
          }
        }
      } else {
        if (item.quality < 50) {
          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            if (item.sellIn < 6) {
              item.quality = Math.min(item.quality + 3, 50);
            } else if (item.sellIn < 11) {
              item.quality = Math.min(item.quality + 2, 50);
            } else {
              item.quality = item.quality + 1;
            }
          } else {
            item.quality = item.quality + 1;
          }
        }
      }

      if (item.name != "Sulfuras, Hand of Ragnaros") {
        this.decrementSellIn(item);
      }

      if (item.sellIn < 0) {
        if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
          if (item.quality > 0) {
            if (item.name != "Sulfuras, Hand of Ragnaros") {
              this.decrementQualityByOne(item)
            }
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }

      if (item.name == "Backstage passes to a TAFKAL80ETC concert" && item.sellIn < 0) {
        item.quality = 0
      }
    }

    return this.items;
  }
}
