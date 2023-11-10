import axios from 'axios';


export const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.message;
    return decodeErrorMessage(message);
  } else {
    const message = (error as Error).message;
    return decodeErrorMessage(message);
  }
};

const decodeErrorMessage = (message: string[] | string) => {
  if (Array.isArray(message)) {
    return message.join(', ');
  }

  return message;
};