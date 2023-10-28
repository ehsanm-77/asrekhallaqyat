import React from 'react';
import Image from 'next/image';
import { FaRegUser } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import { BiMenu } from 'react-icons/bi';
import { RiProductHuntLine } from 'react-icons/ri';
import { IoCallOutline, IoExitOutline } from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi';
import Link from 'next/link';
import { Menu, SearchInput } from '@/components';
import useRedux from '@/hooks/usRedux';
import { destroyCookie } from 'nookies';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
const handleExit = () => {
  localStorage.clear();
  destroyCookie(null, 'accessToken');
};
const Header = () => {
  const [value, dispatch] = useRedux((state) => state.userState);
  const user = localStorage.getItem('userInfo');
  const userObject = JSON.parse(user);
  console.log(userObject);
  return (
    <div className="bg-secondary w-full fixed top-0 z-20 shadow-xl">
      <div className="flex flex-row-reverse md:items-center justify-between mx-2 md:mx-10">
        <div className="flex text-blue-900 gap-3 md:gap-0">
          {userObject?.role === 'USER' ? (
            <div>
              <Link href="/">
                {/* <IoExitOutline
                size={'25px'}
                className="mt-5 md:m-5 cursor-pointer text-blue-900 hover:text-white"
                onClick={handleExit}
              /> */}
                <div className=" px-4">
                  <Popover className="">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md text-base font-medium text-white hover:text-opacity-100 focus:outline-none  focus-visible:ring-opacity-75`}
                        >
                          <IoExitOutline
                            size={'25px'}
                            className="mt-6 md:ml-5 cursor-pointer text-blue-900 hover:text-white toexit"
                          />
                          {/* <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              /> */}
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
                          <Popover.Panel className="absolute left-[150px] w-[200px] z-10 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative bg-white flex flex-col gap-10 p-5">
                                <div>
                                  {`${userObject.firstname}` +
                                    ` ${userObject.lastname}`}
                                </div>
                                <div
                                  onClick={handleExit}
                                  className="text-center bg-gray-100 p-2 rounded-md hover:bg-gray-200"
                                >
                                  خروج
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/admin-login">
                <FaRegUser
                  size={'25px'}
                  className="mt-5 md:m-5 cursor-pointer text-blue-900 hover:text-white fauser"
                />
              </Link>
            </div>
          )}
          <div>
            <Link href="/cart" className="">
              <div className="absolute top-3 md:top-5 h-5 w-5 rounded-full bg-blue-400 flex justify-center text-white">
                {value.cart.length}
              </div>
              <TiShoppingCart
                size={'30px'}
                className="mt-5 mr-1 md:m-5 cursor-pointer text-blue-900 hover:text-white toshoping"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row justify-end mt-3">
          <Link href="/">
            <Image
              src="/assets/img/header/logo.png"
              alt=""
              width={250}
              height={300}
              // style={{
              //   marginRight: '50px',
              // }}
              className="mr-[60px] md:mr-0 mt-4 md:mt-0"
            />
          </Link>
          <div className="flex justify-center relative right-[40px] md:right-0">
            <SearchInput />
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-3 items-center md:gap-3 justify-end md:px-10 py-5 text-blue-900">
        <Link href="/call-us">
          <div className="  hover:text-white md:px-2 py-1 rounded-2xl cursor-pointer flex items-center gap-1">
            <IoCallOutline className="hidden md:block" />
            <div className="text-sm md:text-[16px] font-bold"> تماس با ما</div>
          </div>
        </Link>
        <Link href="/about-us">
          <div className="  hover:text-white md:px-2 py-1 rounded-2xl cursor-pointer flex items-center gap-1">
            <HiOutlineUserGroup className="hidden md:block" />
            <div className="text-sm md:text-[16px] font-bold"> درباره ما</div>
          </div>
        </Link>
        <Link href="/products">
          <div className="  hover:text-white md:px-2 py-1 rounded-2xl cursor-pointer flex items-center gap-1">
            <RiProductHuntLine className="hidden md:block" />
            <div className="text-sm md:text-[16px] font-bold">محصولات</div>
          </div>
        </Link>
        <div className=" hover:text-white md:px-2 py-1 rounded-2xl cursor-pointer flex items-center gap-1">
          <BiMenu />
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
