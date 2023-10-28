import axios from 'axios';
export const request = axios.create({ baseURL: 'http://localhost:8000/api' });

export const fetchData = async () => {
  try {
    const response = await request.get(`/products`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
