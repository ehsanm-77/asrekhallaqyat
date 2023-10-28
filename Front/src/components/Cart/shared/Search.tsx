import { Linkouter, Input, Button } from '@/components';
import Image from 'next/image';
interface props{
    placeholder:string
}
const Search = ({placeholder}:props) => {
  return (
    <>
      <Button type="submit" className=" border-l pl-2 ">
        <Image
          src="/icons/user/search.svg"
          alt="جسجتو"
          width={20}
          height={20}
        />
      </Button>
      <Input
        className=" text-sm  py-2 focus:outline-none focus:ring-0 border-none w-full placeholder:py-3"
        type="text"
        name="search"
        placeholder={placeholder}
      />
    </>
  );
};

export default Search;