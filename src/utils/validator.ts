export class Validator {
  static validateRegisterDate(registerDate: string, flightDate: string) {
    const halfHourInMs = 1_800_000;

    if (this.validateDate(registerDate) !== true) {
      return "Введена некорректная дата регистрации";
    }

    if (this.validateDate(flightDate) !== true) {
      return "Введено некорректное время вылета";
    }

    const errorMessage =
      "Крайняя дата и время регистрации на рейс должна быть за 30 минут до дата и время вылета.";

    return new Date(flightDate).getTime() - new Date(registerDate).getTime() <
      halfHourInMs
      ? errorMessage
      : true;
  }

  static validateDate(date: string) {
    if (isNaN(new Date(date).getTime())) {
      return "Введена некорректная дата";
    }
    return true;
  }
}

// export function validator() {
//   const hourInMs = 3_600_000;
//   function validateRegisterDate(registerDate: number, flightTime: number) {
//     const halfHourInMs = hourInMs / 2;
//     const errorMessage =
//       "Крайняя дата и время регистрации на рейс должна быть за 30 минут до дата и время вылета.";
//     return flightTime - registerDate < halfHourInMs ? errorMessage : true;
//   }
//
//   function validateDate(date: number) {
//     if (isNaN(new Date(date).getTime())) {
//       return "Введена некорректная дата";
//     }
//   }
//
//   return {
//     validateRegisterDate,
//     validateDate,
//   };
// }
