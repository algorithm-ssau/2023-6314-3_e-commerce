import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

export const $apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const $api = axios.create({
  baseURL: BASE_URL || 'http://localhost:4000',
});

export async function getProducts() {
  const response = await $api.get(`${BASE_URL}/api/products`);
  return response.data;
}

export async function getOneProduct(id: number) {
  const response = await $api.get(`${BASE_URL}/api/products/${id}`);
  return response.data;
}

export async function getProductsInCart(accessToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await $apiPrivate.get(
    `${BASE_URL}/api/products/cart/:id`,
    config,
  );
  return response.data;
}

export async function addToCart(
  accessToken: string,
  userId: number,
  productId: number,
) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await $apiPrivate.patch(
    `${BASE_URL}/api/products/add-to-cart/${userId}`,
    JSON.stringify({ productId }),
    config,
  );
  return response.data;
}

export async function removeFromCart(
  accessToken: string,
  userId: number,
  productId: number,
) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await $apiPrivate.patch(
    `${BASE_URL}/api/products/remove-from-cart/${userId}`,
    JSON.stringify({ productId }),
    config,
  );
  return response.data;
}

export async function changeProductCount(
  accessToken: string,
  userId: number,
  productId: number,
  count: number,
) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await $apiPrivate.patch(
    `${BASE_URL}/api/products/change-product-count/${userId}`,
    JSON.stringify({ productId, count }),
    config,
  );
  return response.data;
}

export async function register(name: string, email: string, password: string) {
  const response = await $apiPrivate.post(
    `${BASE_URL}/api/users/register`,
    JSON.stringify({ name, email, password }),
  );
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await $apiPrivate.post(
    `${BASE_URL}/api/users/login`,
    JSON.stringify({ email, password }),
  );
  return response.data;
}

export async function refreshToken(email: string, password: string) {
  const response = await $apiPrivate.post(
    `${BASE_URL}/api/users/refresh-token`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );
  return response.data;
}

export async function logout() {
  const response = await $apiPrivate.post(
    `${BASE_URL}/api/users/logout`
  );
  return response.data;
}