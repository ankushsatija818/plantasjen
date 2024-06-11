import express from 'express'
import {createProxyMiddleware} from 'http-proxy-middleware'
import cors from 'cors'

// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors())

app.use('/api', createProxyMiddleware({
  target: 'https://lgpz5f69.api.commercecloud.salesforce.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix when forwarding to target
  },
}));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
