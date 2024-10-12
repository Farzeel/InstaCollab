import axios from 'axios';

const url = "http://localhost:8000/api/v1/users"

export const signUp = async (credentials) => {
  try {
    console.log("response.data" )
    const response = await axios.post(`${url}/register`, credentials,{
      headers: {
          'Content-Type': 'application/json'
      },
      withCredentials: true
  });
    console.log("response.data" ,response.data )
    return response.data;
  } catch (error) {
    // console.log(error.response.data.message)
    return error.response.data.message
   
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${url}/login`, credentials,{
      headers: {
          'Content-Type': 'application/json'
      },
      withCredentials: true
  });
    return response.data;
  } catch (error) {
    console.log(error)
    return false
  }
};


export const logout = async () => {
  try {
    const response = await axios.post(`${url}/logout`, {}, {
      withCredentials: true  
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
