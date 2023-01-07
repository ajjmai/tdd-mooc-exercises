export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = (this.name === "Sulfuras, Hand of Ragnaros") ? 80 : Math.min(Math.max(quality, 0), 50);
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

  decrementQualityByTwo(item) {
    item.quality = Math.max(item.quality - 2, 0);
  }

  incrementQualityByAmount(item, amount) {
    item.quality = Math.min(item.quality + amount, 50);
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name !== "Sulfuras, Hand of Ragnaros") {
        if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellIn <= 0) {
            item.quality = 0
          } else if (item.sellIn <= 5) {
            this.incrementQualityByAmount(item, 3);
          } else if (item.sellIn <= 10) {
            this.incrementQualityByAmount(item, 2);
          } else {
            this.incrementQualityByAmount(item, 1);
          }
        } else if (item.name === "Aged Brie") {
          this.incrementQualityByAmount(item, 1);
        } else {
          if (item.sellIn <= 0) {
            this.decrementQualityByTwo(item);
          } else {
            this.decrementQualityByOne(item);
          }
        }

        this.decrementSellIn(item);
      }
    }

    return this.items;
  }
}
