import axios from './axios-orders';

export const auth = async (email, password) => {

  const authData = {
    email: email,
    password: password
  };
  try {
    const result = await axios.post("login", authData);
    return result.data;
  } catch(err) {
    const loginError = {
      error: "Your Credential is not correct"
    }
    return loginError;
  }
};

export const currentUser = async () => {
  const url = '/getMe' + '?token=' + localStorage.getItem('token');
  const result = await axios.post(url);
  return result.data.user;
};

export const createUser = async ({ firstname, lastname, birthday, gender, email, password }) => {

  const userData = {
    first_name: firstname,
    last_name: lastname,
    birthday: birthday,
    gender: gender,
    email: email,
    password: password
  };
  try {
    const result = await axios.post("register", userData);
    return result.data;
  } catch(err) {
    const signupError = {
      error: "Sign up failed"
    }
    return signupError;
  }
};
