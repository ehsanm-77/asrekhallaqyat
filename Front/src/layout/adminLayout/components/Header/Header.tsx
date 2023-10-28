import React from 'react';
import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import {
  HomeOutlined,
  MenuOutlined,
  ExitToAppOutlined,
} from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { destroyCookie } from 'nookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Link from 'next/link';
const Header = () => {
  const router = useRouter();
  const handleDrawerClose = () => {
    destroyCookie(null, 'accessToken');
    destroyCookie(null, 'refreshToken');
    localStorage.clear();
    toast.success('خارج شدید');
    router.push('/');
  };
  return (
    <div>
      <div className="h-full flex flex-col justify-center bg-primary">
        <div className="flex justify-center items-center bg-secondary w-full fixed top-0 h-[100px] shadow-xl">
          <Link href="/">
            <Box
              sx={{
                cursor: 'pointer',
                color: blue[900],
                position: 'fixed',
                right: '10px',
                top: '35px',
              }}
            >
              <HomeOutlined className="text-blue-900 text-3xl md:text-4xl hover:text-white" />
            </Box>
          </Link>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 'bold' }}
            className="text-blue-900 text-3xl md:text-4xl"
            gutterBottom
          >
            پنل مدیریت فروشگاه
          </Typography>
          <Box
            sx={{
              cursor: 'pointer',
              color: blue[900],
              position: 'fixed',
              left: '10px',
              top: '35px',
            }}
            onClick={()=>
              handleDrawerClose()
            }
          >
            <ExitToAppOutlined className="text-blue-900 text-3xl md:text-4xl hover:text-white" />
          </Box>
        </div>
        <div className="flex justify-center mt-10"></div>
      </div>
    </div>
  );
};

export default Header;
