import {
  cities,
  createMessages,
  forgotPassword,
  getMessage,
  getPostsEndpoint,
  getReservedProperties,
  getProfessionalsEndpoint,
  login,
  properties,
  register,
  reservation,
  subscribtion,
  updatePassword,
  verifyOtp,
  verifyPassword,
  getSuppliersEndpoint,
} from '../api/';
import { IQueryParams } from '../state/properties/types';

export const getCities = async () => {
  const response = await fetch(cities);
  const data = await response.json();
  return data;
};

type RegUserType = {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
  address: string;
  address2: string;
  district: string;
  postal_code: number;
  phone_number: string;
  city_id: number;
};

export const registerUser = async ({
  email,
  firstname,
  lastname,
  password,
  confirmPassword,
  gender,
  address,
  address2 = '',
  district,
  postal_code,
  phone_number,
  city_id = 0,
}: RegUserType) => {
  try {
    if (password === confirmPassword) {
      const response = await fetch(register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          firstname: firstname,
          lastname: lastname,
          password: password,
          gender: gender,
          address: {
            address: address,
            address2: address2,
            district: district,
            postal_code: postal_code,
            phone_number: phone_number,
            city_id: city_id,
          },
        }),
      });

      return await response.json();
    } else return "password and confirm password don't match";
  } catch (err) {
    throw err;
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const getProperties = async (categoryId: number = 1) => {
  try {
    let url = `${properties}?category=${categoryId}?limit=16`;
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log('Error ', err);
  }
};

export const getPropertiesByStatus = async (
  status: string,
  categoryId?: number,
) => {
  try {
    let API_URL = `${properties}?property_status=${status}&limit=16`;
    if (categoryId)
      API_URL = `${properties}?property_status=${status}&category=${categoryId}&limit=16`;

    const response = await fetch(API_URL);
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const verifyOTP = async (token: string, pin_code: string) => {
  try {
    const response = await fetch(verifyOtp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pin_code: pin_code,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const payment = async (token: string) => {
  try {
    const response = await fetch(subscribtion, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const search = async (query: IQueryParams) => {
  try {
    let url = `${properties}?`;

    if (query.starting_price)
      url = `${url}&starting_price=${query.starting_price}`;

    if (query.end_price) url = `${url}&end_price=${query.end_price}`;

    if (query.city_id) url = `${url}&city_id=${query.city_id}`;

    if (query.category) url = `${url}&category=${query.category}`;

    if (query.property_status)
      url = `${url}&property_status=${query.property_status}`;

    console.log('Search url', url);
    console.log(query);
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Error fetching data', error);
  }
};

export const getFeaturedProperties = async () => {
  try {
    let url = `${properties}/featured`;
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log('Error ', err);
  }
};

export const getMessages = async (token: string) => {
  try {
    const response = await fetch(getMessage, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = async (token: string, newMessage: Object) => {
  try {
    const response = await fetch(createMessages, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newMessage),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const VerifyPassOTP = async (pin_code: string, email: string) => {
  try {
    const response = await fetch(verifyPassword, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pin_code: pin_code,
        email: email,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const ChangePassReq = async (email: string) => {
  try {
    const response = await fetch(forgotPassword, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePass = async (
  token: string,
  password: string,
  confirmPassword: string,
  email: string,
) => {
  try {
    const response = await fetch(updatePassword, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
        confirmPassword,
        email,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postReservation = async (
  token: string,
  property_id: number,
  appointment_date: Date,
) => {
  try {
    const response = await fetch(reservation, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        property_id,
        appointment_date,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getReservation = async (token: string) => {
  try {
    const response = await fetch(getReservedProperties, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (token: string) => {
  try {
    const response = await fetch(getPostsEndpoint, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (token: string, id: string) => {
  try {
    const response = await fetch(`${getPostsEndpoint}/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProfessionals = async () => {
  try {
    const response = await fetch(getProfessionalsEndpoint, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProfessional = async (token: string, id: string) => {
  try {
    const response = await fetch(`${getProfessionalsEndpoint}/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSuppliers = async () => {
  try {
    const response = await fetch(getSuppliersEndpoint, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
