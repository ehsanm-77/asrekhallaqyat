import React, { useState } from 'react';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  AssignmentOutlined,
  ExitToAppOutlined,
  ToggleOn,
  ToggleOff,
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

export default function Drrawer({ setValue, setDrawerOpen, drawerOpen }: any) {
  const router = useRouter();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCloseDrawer = () => {
    destroyCookie(null, 'accessToken');
    router.push('/');
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
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <List>
            <ListItem
              button
              onClick={() => setValue(0)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <ListItemText
                primary="کالا ها"
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                }}
              />
              <ListItemIcon
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <HomeOutlined />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              onClick={() => setValue(1)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <ListItemText
                primary="موجودی و قیمت ها"
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                }}
              />
              <ListItemIcon
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <AssignmentOutlined />
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              onClick={() => setValue(2)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <ListItemText
                primary="سفارش ها"
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                }}
              />
              <ListItemIcon
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <ShoppingCartOutlined />
              </ListItemIcon>
            </ListItem>
          </List>
          <List>
            <ListItem
              button
              onClick={toggleDrawer}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <ListItemText
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                }}
                primary={drawerOpen ? 'بستن منو' : 'باز کردن منو'}
              />
              <ListItemIcon
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                {drawerOpen ? <ToggleOn /> : <ToggleOff />}
              </ListItemIcon>
            </ListItem>
            <ListItem
              button
              onClick={handleCloseDrawer}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <ListItemText
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                }}
                primary="خروج"
              />
              <ListItemIcon
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <ExitToAppOutlined />
              </ListItemIcon>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}
