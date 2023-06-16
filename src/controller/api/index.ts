import { instance } from '../utils/axios'

export const getProduct = async (pathname: string) => {
  const response = await instance.get(pathname)

  return response.data;
}