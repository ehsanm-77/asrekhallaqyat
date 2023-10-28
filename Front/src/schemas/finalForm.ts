import * as yup from 'yup';

const finalForm = yup.object().shape({
  firstName: yup.string().required('  اسم کاربری الزامی می باشد'),
  lastName: yup.string().required('نام خانوادگی الزامی می باشد '),
  postalCode: yup
    .number()
    .required('کد پستی الزامی می باشد ')
    .typeError('کد پستی الزامی می باشد'),
  email: yup.string().email().required('ایمیل الزامی می باشد'),
  phoneNumber: yup.number().required('شماره تلفن الزامی می باشد'),
  city: yup.string().required('نام شهر الزامی می باشد'),
  address: yup
    .string()
    .max(50, 'حداکثر کارکتر مجاز 50 کارکتر است')
    .required('نام شهر الزامی می باشد'),
  date: yup.string().required('تاریخ تحویل الزامی می باشد'),
});
export default finalForm;
