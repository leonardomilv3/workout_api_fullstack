import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppRoutes from '../routes/routes.jsx'
import ChakraProvider from 'chakra';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
        <AppRoutes />
    </ChakraProvider>
)
