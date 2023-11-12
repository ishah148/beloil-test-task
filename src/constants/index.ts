export const baseUrl = "";
export const dateFiltersNames = ["departure_time", "checkin_time"];

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
