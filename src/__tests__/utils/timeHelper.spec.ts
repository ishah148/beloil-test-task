import {Formatter} from "../../utils/timeHelper.ts";

describe("Formatter", () => {
  describe("getDateDDMMYY", () => {
    it("should return the correct date format with leading zeros", () => {
      const date = new Date("2022-01-01");
      const result = Formatter.getDateDDMMYY(date);
      expect(result).toEqual("01.01.22");
    });

    it("should return the correct date format without leading zeros", () => {
      const date = new Date("2022-11-11");
      const result = Formatter.getDateDDMMYY(date);
      expect(result).toEqual("11.11.22");
    });

    it("should return the current date format if no date is provided", () => {
      const currentDate = new Date();
      const day = ("0" + currentDate.getDate()).slice(-2);
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      const year = currentDate.getFullYear().toString().slice(-2);
      const expected = `${day}.${month}.${year}`;
      const result = Formatter.getDateDDMMYY();
      expect(result).toEqual(expected);
    });
  });

  describe("getTimeMMHH", () => {
    it("should return the correct time format with leading zeros", () => {
      const date = new Date("2022-01-01T09:05:00");
      const result = Formatter.getTimeMMHH(date);
      expect(result).toEqual("09:05");
    });

    it("should return the correct time format without leading zeros", () => {
      const date = new Date("2022-01-01T15:30:00");
      const result = Formatter.getTimeMMHH(date);
      expect(result).toEqual("15:30");
    });

    it("should return the current time format if no date is provided", () => {
      const currentDate = new Date();
      const hours = ("0" + currentDate.getHours()).slice(-2);
      const minutes = ("0" + currentDate.getMinutes()).slice(-2);
      const expected = `${hours}:${minutes}`;
      const result = Formatter.getTimeMMHH();
      expect(result).toEqual(expected);
    });
  });

});