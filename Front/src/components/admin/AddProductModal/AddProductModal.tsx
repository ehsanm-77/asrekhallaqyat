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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { request } from '@/api/instance/instance';
import { useGetCategory } from '@/hooks/useGetCategory';
import { useGetSubCategory } from '@/hooks/useGetSubCategories';
import { ImageContainer, ModalContent, StyledModal } from './styles';
import Editor from '../Editor';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';

interface Category {
  label: string;
  subcategories: string[];
}

const createProduct = async (productForm: FormData) => {
  const response = await request.post('/products', productForm);
  return response.data;
};

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

const MyModal = ({ open, handleCloseModal }: any) => {
  const [inputCategory, setInputCategory] = useState('');
  const [inputSubCategory, setInputSubCategory] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  const [editor, setEditor] = useState('');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GetProduct'] });
      toast.success('محصول با موفقیت اضافه شد', { autoClose: 2000 });
    },
    onError: () => {
      toast.error('فرایند افزودن محصول به مشکل خورد', { autoClose: 2000 });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImageList = files.map((file) => URL.createObjectURL(file));
    setImageList(newImageList);
  };

  const setEditorValue = (input) => {
    setValue('description', input);
  };

  const getEditorValue = () => {
    return getValues('description');
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
    productForm.append('description', editor);
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ color: ['red', '#785412'] }],
      [{ background: ['red', '#785412'] }],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
    'size',
    'font',
  ];
  imageList.map((image, index) => console.log(image, index));
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
            <TextField
              {...register('nameProduct', { required: true })}
              label="نام کالا"
              fullWidth
              error={errors.nameProduct}
              helperText={errors.nameProduct && 'لطفاً نام کالا را وارد کنید'}
            />
            <Box sx={{ display: 'flex', gap: '10px' }}>
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
            <Box sx={{ display: 'flex', gap: '10px' }}>
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
            </Box>

            <TextField
              {...register('quantityProduct', { required: true })}
              label="تعداد"
              fullWidth
              error={errors.quantityProduct}
              helperText={errors.quantityProduct && 'لطفاً تعداد را وارد کنید'}
            />
            {/* <TextField
              {...register('descriptionProduct', { required: true })}
              label="توضیحات"
              fullWidth
              multiline
              error={errors.descriptionProduct}
              helperText={
                errors.descriptionProduct && 'لطفاً توضیحات را وارد کنید'
              }
            /> */}
            <Box>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={editor}
                onChange={setEditor}
              />
            </Box>
            {/* <Editor value={getEditorValue} setEditorValue={setEditorValue} /> */}
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
                      src={`${image}`}
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
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                // gap:'5px'
              }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: '#30bc7f',
                }}
                color="primary"
                sx={{
                  width: '100%',
                  borderRadius: '0 10px 10px 0',
                }}
              >
                افزودن
              </Button>
              <Button
                style={{
                  backgroundColor: 'gray',
                }}
                variant="contained"
                onClick={handleCloseModal}
                sx={{
                  width: '100%',
                  borderRadius: '10px 0 0 10px',
                }}
              >
                انصراف
              </Button>
            </Box>
          </form>
        </ModalContent>
      </StyledModal>
    </div>
  );
};

export default MyModal;
