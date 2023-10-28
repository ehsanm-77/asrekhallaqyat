import React, { useState } from 'react';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  AssignmentOutlined,
  ExitToAppOutlined,
} from '@mui/icons-material';
import { AiOutlineShop } from 'react-icons/ai';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  createTheme,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { toast } from 'react-toastify';

export default function DrawerComponent() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState('');

  const handleDrawerClose = () => {
    destroyCookie(null, 'accessToken');
    destroyCookie(null, 'refreshToken');
    localStorage.clear();
    toast.success('خارج شدید');
    router.push('/');
  };

  const handleClick = (route) => {
    router.push(route);
    setSelectedItem(route);
  };

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
    typography: {
      fontFamily: 'iran-sans',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '60px',
          position: 'fixed',
          right: '0px',
          bottom: '0',
          bgcolor: 'white',
          backgroundColor: '#009DAE',
          width: '100%',
        }}
      >
        <List className="flex gap-4">
          <ListItem
            button
            onClick={() => handleClick('/admin/manage-product')}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'white',
              paddingRight: '3px',
              borderRadius: '10px',
              backgroundColor:
                selectedItem === '/admin/manage-product'
                  ? '#005B70'
                  : 'transparent',
            }}
          >
            <IconButton>
              <AiOutlineShop className="text-white" />
            </IconButton>
            <ListItemText primary="محصولات" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleClick('/admin/inventory')}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'white',
              paddingRight: '3px',
              borderRadius: '10px',

              backgroundColor:
                selectedItem === '/admin/inventory' ? '#005B70' : 'transparent',
            }}
          >
            <IconButton>
              <AssignmentOutlined className="text-white" />
            </IconButton>
            <ListItemText primary="موجودی" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleClick('/admin/orders')}
            sx={{
              display: 'flex',
              paddingRight: '3px',
              justifyContent: 'space-between',
              color: 'white',
              borderRadius: '10px',
              backgroundColor:
                selectedItem === '/admin/orders' ? '#005B70' : 'transparent',
            }}
          >
            <IconButton>
              <ShoppingCartOutlined className="text-white" />
            </IconButton>
            <ListItemText primary="سفارش" />
          </ListItem>
        </List>
      </Box>
    </ThemeProvider>
  );
}
