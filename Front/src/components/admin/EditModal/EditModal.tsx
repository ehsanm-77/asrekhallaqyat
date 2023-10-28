import React, { useState } from 'react';
import {
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
} from '@mui/material';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { request } from '@/api/instance/instance';
import { useGetCategory } from '@/hooks/useGetCategory';
import { useGetSubCategory } from '@/hooks/useGetSubCategories';
import { ImageContainer, ModalContent, StyledModal } from './styles';

interface Category {
  label: string;
  subcategories: string[];
}

const createProduct = async (productForm: FormData) => {
  const response = await request.post('/products', productForm);
  return response.data;
};

const MyModal = ({ open, handleCloseModal }: any) => {
  const [inputCategory, setInputCategory] = useState('');
  const [inputSubCategory, setInputSubCategory] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  const mutation = useMutation(createProduct);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImageList = files.map((file) => URL.createObjectURL(file));
    setImageList(newImageList);
  };

  const onSubmit = (data) => {
    const {
      nameProduct,
      priceProduct,
      quantityProduct,
      brandProduct,
      descriptionProduct,
      imagesProduct,
      categoryProduct,
      subCategoryProduct,
    } = data;

    const productForm = new FormData();
    productForm.append('category', categoryProduct);
    productForm.append('name', nameProduct);
    productForm.append('price', priceProduct);
    productForm.append('quantity', quantityProduct);
    productForm.append('brand', brandProduct);
    productForm.append('description', descriptionProduct);
    productForm.append('subcategory', subCategoryProduct);
    productForm.append('thumbnail', imagesProduct[0]);

    for (let i = 0; i < imagesProduct.length; i++) {
      productForm.append('images', imagesProduct[i]);
    }

    mutation.mutate(productForm);
    handleCloseModal();
  };

  const { data: category, isLoading: isLoadingCategory } = useGetCategory({});
  const { data: subCategory, isLoading: isLoadingSubCategory } =
    useGetSubCategory({}, inputCategory);

  return (
    <div>
      <StyledModal open={open} onClose={handleCloseModal}>
        <ModalContent>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
            variant="h6"
          >
            اضافه کردن محصول
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ImageContainer>
              <input
                {...register('imagesProduct', { required: true })}
                name="imagesProduct"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{
                  marginTop: '10px',
                }}
              />
              {imageList.length > 0 &&
                imageList.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Product ${index}`}
                      width={50}
                      height={50}
                    />
                  </div>
                ))}
              {errors.imagesProduct && (
                <Typography variant="caption" color="error">
                  لطفا تصویر محصول را انتخاب کنید
                </Typography>
              )}
            </ImageContainer>
            <TextField
              {...register('nameProduct', { required: true })}
              label="نام کالا"
              fullWidth
              error={errors.nameProduct}
              helperText={errors.nameProduct && 'لطفاً نام کالا را وارد کنید'}
            />
            <Box sx={{ display: 'flex' }}>
              <FormControl fullWidth error={errors.categoryProduct}>
                <InputLabel>دسته بندی</InputLabel>
                <Select
                  {...register('categoryProduct', { required: true })}
                  onChange={(e: any) => {
                    setInputCategory(e.target.value);
                  }}
                  value={inputCategory}
                >
                  {category?.categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.categoryProduct && (
                  <Typography variant="caption" color="error">
                    لطفاً دسته بندی را انتخاب کنید
                  </Typography>
                )}
              </FormControl>

              {inputCategory && (
                <FormControl fullWidth error={errors.subCategoryProduct}>
                  <InputLabel>زیر دسته</InputLabel>
                  <Select
                    {...register('subCategoryProduct', { required: true })}
                    onChange={(e: any) => {
                      setInputSubCategory(e.target.value);
                    }}
                    value={inputSubCategory}
                  >
                    {subCategory?.subcategories.map((subcat) => (
                      <MenuItem key={subcat._id} value={subcat._id}>
                        {subcat.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.subCategoryProduct && (
                    <Typography variant="caption" color="error">
                      لطفاً زیر دسته را انتخاب کنید
                    </Typography>
                  )}
                </FormControl>
              )}
            </Box>
            <TextField
              {...register('brandProduct', { required: true })}
              label="برند"
              fullWidth
              error={errors.brandProduct}
              helperText={errors.brandProduct && 'لطفاً برند را وارد کنید'}
            />
            <TextField
              {...register('priceProduct', {
                required: 'لطفا قیمت را وارد کنید',
                pattern: {
                  value: /^\d+$/,
                  message: 'لطفا عدد وارد کنید',
                },
              })}
              label="قیمت"
              fullWidth
              error={errors.priceProduct?.message}
              helperText={errors.priceProduct?.message}
            />
            <TextField
              {...register('quantityProduct', { required: true })}
              label="تعداد"
              fullWidth
              error={errors.quantityProduct}
              helperText={errors.quantityProduct && 'لطفاً تعداد را وارد کنید'}
            />
            <TextField
              {...register('descriptionProduct', { required: true })}
              label="توضیحات"
              fullWidth
              multiline
              error={errors.descriptionProduct}
              helperText={
                errors.descriptionProduct && 'لطفاً توضیحات را وارد کنید'
              }
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: '#30bc7f',
              }}
              color="primary"
            >
              افزودن
            </Button>
            <Button
              style={{
                backgroundColor: 'gray',
              }}
              variant="contained"
              onClick={handleCloseModal}
            >
              انصراف
            </Button>
          </form>
        </ModalContent>
      </StyledModal>
    </div>
  );
};

export default MyModal;
