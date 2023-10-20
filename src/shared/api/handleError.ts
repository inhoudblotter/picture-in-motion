export function handleError(status: number) {
  let message;
  switch (status) {
    case 400:
      message = 'Bad Request';
      break;
    case 401:
      message = 'Unauthorized';
      break;
    case 403:
      message = 'Forbidden';
      break;
    case 404:
      message = 'Not Found	';
      break;
    case 414:
      message = 'URI Too Long';
      break;
    case 429:
      message = 'Too Many Requests';
      break;
    default:
      message = 'Unknown Error';
  }
  throw {code: status, message: message};
}
