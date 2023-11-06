export function timeHelper(date = new Date()) {
  // Get the day, month, and year from the Date object
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Convert the day, month, and year to strings
  const dayStr = day < 10 ? "0" + day : day.toString();
  const monthStr = month < 10 ? "0" + month : month.toString();
  const yearStr = year.toString().slice(-2);

  // Concatenate the day, month, and year string with a dash separator
  return dayStr + "." + monthStr + "." + yearStr;
}

export function formatTime(date = new Date()) {
  const hour = date.getHours();
  const min = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${min}`;
}

export class Formatter {
  static getDateDDMMYY(date = new Date()) {
    // Get the day, month, and year from the Date object
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Convert the day, month, and year to strings
    const dayStr = day < 10 ? "0" + day : day.toString();
    const monthStr = month < 10 ? "0" + month : month.toString();
    const yearStr = year.toString().slice(-2);

    // Concatenate the day, month, and year string with a dash separator
    return dayStr + "." + monthStr + "." + yearStr;
  }

  static getTimeMMHH(date = new Date()) {
    const hour = date.getHours();
    const min = date.getMinutes().toString().padStart(2, "0");
    return `${hour}:${min}`;
  }
}
