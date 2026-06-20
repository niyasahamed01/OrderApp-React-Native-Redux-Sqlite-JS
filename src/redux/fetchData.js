// api.js
// const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
const BASE_URL = 'https://dummyjson.com/products';

export const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchDownloadData = async (page, limit, skip) => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}&skip=${skip}`);
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};


export const fetchHomeData = async (page, limit, skip) => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}&skip=${skip}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};