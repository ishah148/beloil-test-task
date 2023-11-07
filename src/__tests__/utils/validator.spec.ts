import { Validator } from "../../utils/validator.ts";

describe("Validator", () => {
  describe("validateRegisterDate", () => {
    it("should return an error message for invalid registration date", () => {
      const registerDate = "2023-13-01";
      const flightDate = "2023-01-02";
      const result = Validator.validateRegisterDate(registerDate, flightDate);
      expect(result).toEqual("Введена некорректная дата регистрации");
    });

    it("should return an error message for invalid flight date", () => {
      const registerDate = "2023-01-01";
      const flightDate = "2023-01-32";
      const result = Validator.validateRegisterDate(registerDate, flightDate);
      expect(result).toEqual("Введено некорректное время вылета");
    });

    it("should return an error message if registration date is less than 30 minutes before flight date", () => {
      const registerDate = "2023-01-01T09:00:00";
      const flightDate = "2023-01-01T09:29:59";
      const result = Validator.validateRegisterDate(registerDate, flightDate);
      const errorMessage =
        "Крайняя дата и время регистрации на рейс должна быть за 30 минут до дата и время вылета.";
      expect(result).toEqual(errorMessage);
    });

    it("should return true if registration date is at least 30 minutes before flight date", () => {
      const registerDate = "2023-01-01T09:00:00";
      const flightDate = "2023-01-01T09:30:00";
      const result = Validator.validateRegisterDate(registerDate, flightDate);
      expect(result).toEqual(true);
    });
  });

  describe("validateDate", () => {
    it("should return an error message for invalid date", () => {
      const date = "2023-13-01";
      const result = Validator.validateDate(date);
      expect(result).toEqual("Введена некорректная дата");
    });

    it("should return true for valid date", () => {
      const date = "2023-01-01";
      const result = Validator.validateDate(date);
      expect(result).toEqual(true);
    });
  });
});
