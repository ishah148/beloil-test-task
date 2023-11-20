export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export class Generator {
  static generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  static generateRandomNumber(max: number) {
      return Math.floor(Math.random() * (max + 1));
  }

  static generateCity(){
    // Список городов Беларуси
    const list = [
      'Минск',
      'Гомель',
      'Могилев',
      'Витебск',
      'Гродно',
      'Брест',
      'Барановичи',
      'Борисов',
      'Пинск',
      'Орша',
      'Мозырь',
      'Солигорск',
      'Лида',
      'Новополоцк',
      'Марьина Горка',
      'Слуцк',
      'Полоцк',
      'Жлобин',
      'Светлогорск',
      'Речица',
      'Калинковичи',
      'Несвиж',
      'Кобрин',
      'Пружаны',
      'Сморгонь',
      'Березино',
      'Поставы',
      'Клецк',
      'Жодино',
      'Береза',
      'Дзержинск',
      'Москва',
      'Санкт-Петербург',
      'Новосибирск',
      'Екатеринбург',
      'Нижний Новгород',
      'Казань',
      'Челябинск',
      'Омск',
      'Самара',
      'Ростов-на-Дону',
      'Уфа',
      'Красноярск',
      'Пермь',
      'Воронеж',
      'Волгоград',
      'Краснодар',
      'Саратов',
      'Тюмень',
      'Тольятти',
      'Ижевск',
      'Ульяновск',
      'Барнаул',
      'Иркутск',
      'Хабаровск',
      'Ярославль',
      'Владивосток',
      'Махачкала',
      'Томск',
      'Оренбург',
      'Кемерово',
      'Новокузнецк'
    ];
    return list[Generator.generateRandomNumber(list.length - 1)]
  }
}
