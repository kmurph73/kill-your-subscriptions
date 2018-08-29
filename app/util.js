import uuidv5 from 'uuid/v5';

export const genUUID = function(email) {
  return uuidv5(email, uuidv5.URL);
}
