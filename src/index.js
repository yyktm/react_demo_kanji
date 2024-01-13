import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './theme';
import Home from './partials/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ChakraProvider theme={theme}>
      <Box>
        <Home />
      </Box>
    </ChakraProvider>
  </>
);
