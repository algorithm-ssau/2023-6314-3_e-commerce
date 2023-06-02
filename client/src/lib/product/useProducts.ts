import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addToCart,
  changeProductCount,
  getOneProduct,
  getProducts,
  getProductsInCart,
  removeFromCart,
} from '../api';
import { ProductResponse, UserResponse } from '../../types';

export function useGetProducts() {
  return useQuery<ProductResponse[]>('products', getProducts);
}

export function useGetOneProduct(id: number) {
  return useQuery<ProductResponse>('product', () => getOneProduct(id));
}

export function useGetProductsInCart(accessToken: string) {
  return useQuery('products-in-cart', () => getProductsInCart(accessToken));
}

export function useAddToCart(
  accessToken: string,
  userId: number,
  productId: number,
) {
  const queryClient = useQueryClient();
  return useMutation(() => addToCart(accessToken, userId, productId), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('products-in-cart');
    },
  });
}

export function useRemoveFromCart(
  accessToken: string,
  userId: number,
  productId: number,
) {
  const queryClient = useQueryClient();
  return useMutation(() => removeFromCart(accessToken, userId, productId), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('products-in-cart');
    },
  });
}

export function useChangeProductCount(
  accessToken: string,
  userId: number,
  productId: number,
  count: number,
) {
  const queryClient = useQueryClient();
  return useMutation(
    () => changeProductCount(accessToken, userId, productId, count),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('products-in-cart');
      },
    },
  );
}
