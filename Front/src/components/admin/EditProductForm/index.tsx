import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Editor from '../Editor';
import ImageUploader from '../ImageUploader';
import Image from 'next/dist/client/image';
import { useGetCategory } from '@/hooks/useGetCategory';
import { useGetSubCategory } from '@/hooks/useGetSubCategories';
import useEditSingleProduct from '@/api/instance/EditProductById';

function EditProductForm({ productInfo, setOpen }) {
  const {
    category: initialCategory,
    name,
    price,
    quantity,
    subcategory,
    description,
    images,
    brand,
  } = productInfo;
  const [category, setCategory] = useState(initialCategory._id);

  const [imagePreview, setImagePreview] = useState({
    show: true,
    imgData: images,
  });
  const { mutate } = useEditSingleProduct({ setOpen });

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      category: initialCategory._id,
      subcategory: subcategory._id,
      brand: brand,
      description: description,
      name: name,
      price: price,
      quantity: quantity,
    },
  });

  const { data: categoryData } = useGetCategory({});

  const { data: subCategoryData } = useGetSubCategory({}, category);

  const setEditorValue = (input) => {
    setValue('description', input);
  };

  const getEditorValue = () => {
    return getValues('description');
  };

  const setImageData = (data) => {
    setValue('images', data);
    setImagePreview((prev) => {
      return { show: false, imgData: data };
    });
  };

  const onSubmit = (data) => {
    mutate({ id: productInfo._id, data });
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: {
            xs: 'column',
          },
          paddingY: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              // md: '40%',
            },
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel
              sx={{ backgroundColor: 'white', paddingRight: '5px' }}
              id="demo-simple-select-label"
            >
              دسته بندی
            </InputLabel>
            <Controller
              name="category"
              control={control}
              rules={{ required: 'لطفا دسته بندی را انتخاب کنید' }}
              render={({ field }) => (
                <Select
                  defaultValue={getValues('category')}
                  {...field}
                  onChange={(e) => {
                    setValue('category', e.target.value);
                    setCategory(e.target.value);
                  }}
                >
                  {categoryData?.categories?.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <FormHelperText>
              {errors.category && errors.category.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth error={!!errors.subcategory}>
            <InputLabel
              sx={{ backgroundColor: 'white', paddingRight: '5px' }}
              id="subCategory"
            >
              زیر دسته بندی
            </InputLabel>
            <Controller
              name="subcategory"
              control={control}
              rules={{ required: 'لطفا زیر دسته بندی را انتخاب کنید' }}
              render={({ field }) => (
                <Select
                  defaultValue={getValues('subcategory')}
                  {...field}
                  onChange={(e) => setValue('subcategory', e.target.value)}
                >
                  {subCategoryData?.subcategories?.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.subcategory && errors.subcategory.message}
            </FormHelperText>
          </FormControl>
          <TextField
            label="نام"
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            {...register('name', { required: 'لطفا نام را وارد کنید' })}
          />
          <TextField
            label="قیمت"
            error={!!errors.price}
            helperText={errors.price?.message}
            fullWidth
            {...register('price', { required: 'لطفا قیمت را وارد کنید' })}
          />
          <TextField
            label="تعداد"
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
            fullWidth
            {...register('quantity', { required: 'لطفا تعداد را وارد کنید' })}
          />
        </Box>
        <Box
          sx={{
            width: {
              xs: '100%',
              // md: '60%',
            },
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <TextField
            label="برند"
            error={!!errors.brand}
            helperText={errors.brand?.message}
            fullWidth
            {...register('brand', { required: 'لطفا برند را وارد کنید' })}
          />
          <Editor value={getEditorValue} setEditorValue={setEditorValue} />
          <ImageUploader
            helperText={errors.images?.message}
            setValue={setValue}
            setImagePreview={setImagePreview}
          />
          {imagePreview.show &&
            imagePreview.imgData.map((img) => (
              <img
                key={img}
                alt="product-img"
                width="100"
                height="100"
                src={`http://${img}`}
              />
            ))}
        </Box>
      </Box>
      <Button type="submit" fullWidth variant="contained" color="success">
        ویرایش
      </Button>
    </Box>
  );
}

export default EditProductForm;
