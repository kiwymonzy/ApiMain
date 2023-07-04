import jwt_decode from 'jwt-decode';

export const tokenDecoder = (token) => {
  const decode = jwt_decode(token);

  return decode;
};
