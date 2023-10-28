import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useGetCategory } from '@/hooks/useGetCategory';
import Link from 'next/link';

interface Category {
  name: string;
  icon: React.ElementType;
  subcategories: Subcategory[];
  href: string;
}

interface Subcategory {
  name: string;
  href: string;
}

export default function Menu() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { data, isLoading, refetch } = useGetCategory({});

  const handleCategoryClick = (category: Category) => {
    if (openCategory === category.name) {
      setOpenCategory(null);
    } else {
      setOpenCategory(category.name);
    }
  };

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm leading-6  focus:outline-none border-0  font-bold">
        <span className="hover:text-white">دسته بندی کتاب ها</span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-[60px] z-10 mt-1 flex w-screen max-w-max ml-7 -translate-x-3/4 px-4">
          <div className="max-w-md flex-auto overflow-hidden rounded-2xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 w-80">
            <div className="p-4 hover:text-blue-900">
              {data?.categories?.map((category) => (
                <div key={category.name}>
                  <div
                    className="group relative flex items-center justify-between gap-x-6 rounded-lg px-4 py-1 hover:bg-gray-100"
                    onMouseEnter={() => handleCategoryClick(category)}
                  >
                    <Link
                      className="group relative flex items-center justify-between gap-x-6 rounded-lg px-4 py-1 text-blue-900"
                      href={`/category/${category.slugname}`}
                    >
                      <div className="mt-1 flex flex-none items-center justify-center bg-gray-50 rounded-full">
                        <img
                          src={`http://localhost:8000/images/categories/icons/${category?.icon}`}
                          alt="hi"
                          width={`35px`}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        {category.name}
                        <span className="absolute inset-0" />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
