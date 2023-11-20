export const baseUrl = "";
export const dateFiltersNames = ["departureTime", "checkinTime"];

export const validationRules = {
  requiredValidationRule: {
    required: {
      value: true,
      message: "Обязательно для заполнения",
    },
  },

  onlyStringValidationRule: {
    pattern: {
      value: /[a-zA-Zа-яА-Я]/,
      message: "Данное поле должно быть строковым значением",
    },
  },
};
