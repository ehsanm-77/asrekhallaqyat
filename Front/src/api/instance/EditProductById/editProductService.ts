import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { request } from '../instance';

async function editProductService(
  id: string,
  data,
  setOpen: (arg: boolean) => void
) {
  try {
    const {
      brand,
      category,
      description,
      images,
      name,
      price,
      quantity,
      subcategory,
    } = data;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', `${price}`);
    formData.append('quantity', `${quantity}`);
    formData.append('subcategory', subcategory);

    images?.map((i: Blob) => formData.append('images', i));
    const res = await request.patch(`products/${id}`, formData);
    toast('محصول با موفقیت اضافه شد', {
      style: { backgroundColor: '#A4D0A4' },
    });
    setOpen(false);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ massage: string }>;
    const { data, status, config } = err.response!;
    toast(data.massage);
  }
}

export default editProductService;
