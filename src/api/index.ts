//base url

// import Config from 'react-native-config';

export const baseUrl = 'https://staging-api.housetanzania.com/api';

// export const baseUrl = Config.API_URL;

//cities endpoint
export const cities = `${baseUrl}/cities`; //get all cities

export const register = `${baseUrl}/auth/register`;

export const login = `${baseUrl}/auth/login`;

export const message = `${baseUrl}/message`; //create and get messages
//message_body 1000 max characters
//property_ref_id id of real estate property/optional

export const properties = `${baseUrl}/properties`; // get properties
// to get single property, append property_id to end of url

export const residential = `${baseUrl}/properties?category=1`; //get residential

export const commercial = `${baseUrl}/properties?category=2`; //get commercial

export const industrial = `${baseUrl}/properties?category=3`; //get industrial

export const land = `${baseUrl}/properties?category=4`; //get land

export const verifyOtp = `${baseUrl}/auth/otp/verify`;

export const subscribtion = `${baseUrl}/payment/subscribe`;

export const messages = `${baseUrl}/messages`; //get all messages

export const forgotPassword = `${baseUrl}/auth/password/reset/request`; //endpoint for password change request

export const updatePassword = `${baseUrl}/auth/password/reset/update`; //endpoint for password change after request;

export const verifyPassword = `${baseUrl}/auth/password/reset/verify`; //endpoint for password change verification

export const getMessage = `${baseUrl}/customer/messages`; //endpoint to get messages

export const createMessages = `${baseUrl}/messages`;

export const reservation = `${baseUrl}/properties/reserve`; //endpoint to reserve property

export const getReservedProperties = `${baseUrl}/reservations/customer`; //endpoint to get reservation

export const getPostsEndpoint = `${baseUrl}/posts`; //endpoint to get blogs

export const getProfessionalsEndpoint = `https://mocki.io/v1/6a6070f5-7ee2-4398-bacb-cdb85527a5c1`; //endpoint to get professionals

export const getSuppliersEndpoint =
  'https://mocki.io/v1/2738671c-3a47-435e-92d9-4494c6c1b65c'; //endpoint to get suppliers
