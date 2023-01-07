import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  it("shop can be initialised", () => {
    const gildedRose = new Shop([new Item("item", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("item");
  });

  it("item sell in and quality values should decrease by 1 per day", () => {
    const gildedRose = new Shop([new Item("item", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(9);
  });

  it("item quality value decreases by 2 per day after sell in date has passed", () => {
    const gildedRose = new Shop([new Item("item", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(8);
  });

  it("item quality value cannot be more than 50", () => {
    const gildedRose = new Shop([new Item("item", 10, 100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(49);
  });

  it("item quality value cannot be less than 0", () => {
    const gildedRose = new Shop([new Item("item", 10, -50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(0);
  });

  it("Aged Brie quality value increases by 1 per day", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(11);
  });

  it("Aged Brie quality value increases by 1 per day even after sell in date has passed", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(11);
  });

  it("Aged Brie quality value cannot increase above 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(50);
  });

  it("Sulfuras sell in and quality values never change", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(80);
  });

  it("Sulfuras quality value is always 80", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 70)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(80);
  });

  it("Backstage passes quality increases by 1 per day when the sell in value is more that 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(11);
  });

  it("Backstage passes quality increases by 2 per day when the sell in value is between 5 and 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(12);
  });

  it("Backstage passes quality increases by 3 per day when the sell in value is less than 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(13);
  });

  it("Backstage passes quality increases by 3 per day when the sell in value is above 1", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(13);
  });

  it("Backstage passes quality drops to 0 when sell in value is below 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  it("Conjured item quality decreases by 2 per day when sell in value is above 0", () => {
    const gildedRose = new Shop([new Item("item", 10, 10, true)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(8);
  });

  it("Conjured item quality decreases by 4 per day when sell in value is below 0", () => {
    const gildedRose = new Shop([new Item("item", 0, 10, true)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(6);
  });


});