import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

function PageNotFound() {
  return (
    <>
      <Box
        textAlign="center"
        py={10}
        px={6}
        sx={{
          display: 'grid',
          placeItems: 'center',
          height: '100%',
        }}
      >
        <Box>
          <Heading
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, blue.400, blue.600)"
            backgroundClip="text"
          >
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            ! صفحه ی مورد نظر یافت نشد
          </Text>
          <Text color="gray.500" mb={6}>
            .صفحه ای که به دنبال آن هستید به نظر نمی رسد وجود داشته باشد
          </Text>

          <Button
            as={Link}
            href="/"
            colorScheme="blue"
            bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
            color="white"
            variant="solid"
          >
            صفحه اصلی
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default PageNotFound;
