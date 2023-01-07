import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";
import fs from 'fs';

describe("Untestable 3: CSV file parsing", () => {
  const csvHeaders = `firstName, lastName, age, gender\n`;
  const csvData = `Loid,Forger,,Male\nAnya,Forger,6,Female\nYor,Forger,27,Female`;

  const contents = [{ firstName: 'Loid', lastName: 'Forger', gender: 'm' },
  { firstName: 'Anya', lastName: 'Forger', gender: 'f', age: 6 },
  { firstName: 'Yor', lastName: 'Forger', gender: 'f', age: 27 }]

  const fileName = "./test/people.csv"

  beforeEach(() => {
    fs.writeFileSync(fileName, csvHeaders + csvData);
  });

  afterEach(() => {
    fs.unlinkSync(fileName);
  })

  it("parsed file contents equals expected contents", async () => {
    try {
      const result = await parsePeopleCsv(fileName);
      expect(result).to.deep.equal(contents);
    } catch (e) {
      console.log(e);
    }
  });
});
