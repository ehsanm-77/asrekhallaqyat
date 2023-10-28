import { Input } from '@mui/material';
import { Controller } from 'react-hook-form';
interface props {
  placeholder: string;
  type: 'email' | 'text' | 'password' | 'number' | 'search' | 'file' | 'date';
  name: string;
  control: any;
  errors: string | undefined;
}
const InputFinal = ({
  placeholder,
  type,
  name,
  control,
  errors,
  ...inputProps
}: props) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value, name } }) => {
          return (
            <div className="sm:col-span-3">
              <label
                htmlFor={name}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {placeholder}
              </label>
              <div className="mt-2">
                <input
                  placeholder={placeholder}
                  type={type}
                  name={name}
                  onChange={onChange}
                  value={value}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-btnCard sm:text-sm sm:leading-6 px-3 py-2 focus:outline-none shadow-md"
                  {...inputProps}
                />
              </div>
              <div className="text-btnCard text-red-400 h-2 pt-2 pb-2">
                {errors}
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default InputFinal;
