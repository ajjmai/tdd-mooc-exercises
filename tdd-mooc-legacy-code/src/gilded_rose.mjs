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

  decrementQualityByAmount(item, amount) {
    item.quality = Math.max(item.quality - amount, 0);
  }

  incrementQualityByAmount(item, amount) {
    item.quality = Math.min(item.quality + amount, 50);
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          if (item.sellIn <= 0) item.quality = 0
          else if (item.sellIn <= 5) this.incrementQualityByAmount(item, 3);
          else if (item.sellIn <= 10) this.incrementQualityByAmount(item, 2);
          else this.incrementQualityByAmount(item, 1);
          break;

        case "Aged Brie":
          this.incrementQualityByAmount(item, 1);
          break;

        default:
          if (item.sellIn <= 0) {
            this.decrementQualityByAmount(item, 2);
          } else {
            this.decrementQualityByAmount(item, 1);
          }
          break;
      }

      if (item.name !== "Sulfuras, Hand of Ragnaros") {
        this.decrementSellIn(item);
      }
    }

    return this.items;
  }
}
