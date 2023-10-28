import InputFinal from './InputFinal';
import Datepickers from './DataPicker';
import Link from 'next/link';
import { Controller, FieldErrors } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';
interface props {
  userData: any;
  control: any;
  errors: any;
  setDate: any;
}

const Form = ({ userData, control, errors, setDate, setValue }: props) => {
  const date = new Date();
  const newDate = new Date(date.setDate(date.getDate() + 3));
  return (
    <>
      <div className="space-y-8">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-4  sm:grid-cols-6">
            <InputFinal
              errors={errors.firstName?.message}
              control={control}
              name="firstName"
              placeholder="نام"
              type="text"
              disabled={true}
            />
            <InputFinal
              errors={errors.lastName?.message}
              control={control}
              name="lastName"
              placeholder="نام خانوادگی"
              type="text"
              disabled={true}
            />

            <InputFinal
              errors={errors.address?.message}
              control={control}
              name="address"
              placeholder="آدرس"
              type="text"
              disabled={true}
            />
            <InputFinal
              errors={errors.city?.message}
              control={control}
              name="city"
              placeholder="شهر"
              type="text"
            />
            <InputFinal
              errors={errors.postalCode?.message}
              control={control}
              name="postalCode"
              placeholder="کدپستی"
              type="text"
            />
            <InputFinal
              errors={errors.phoneNumber?.message}
              control={control}
              name="phoneNumber"
              placeholder="شماره تلفن"
              type="text"
              disabled={true}
            />
            <InputFinal
              errors={errors.email?.message}
              control={control}
              name="email"
              placeholder="ایمیل"
              type="email"
            />

            <div className="">
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                تاریخ تحویل
              </label>
              <div className="mt-2">
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: true }}
                  render={({ field: { onChange, name, value } }) => (
                    <div className="">
                      <DatePicker
                        name={name}
                        className=""
                        calendar={persian}
                        locale={persian_fa}
                        minDate={
                          new DateObject({ calendar: persian, date: newDate })
                        }
                        plugins={[weekends()]}
                        onChange={(date) =>
                          setValue('date', date?.unix.toString())
                        }
                        inputClass="input-custom"
                      />
                      <div className="text-btnCard  h-2 pt-2 pb-2 text-red-400">
                        {errors.date?.message}
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-4">
        <Link href="/cart">
          <button
            type="button"
            className="text-sm font-semibold leading-6 px-3 py-[6px] bg-slate-300 text-slate-500 hover:bg-zinc-400 rounded-md"
          >
            انصراف
          </button>
        </Link>

        <button
          type="submit"
          className="rounded-md bg-btnCard px-4 py-2 text-sm font-semibold text-white shadow-sm bg-blue-400 hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          ذخیره
        </button>
      </div>
    </>
  );
};

export default Form;
