const express = require('express');
const myapp = express();
const port = 5000;

myapp.use((req, res, next) => {
  console.log('Request received', req.method, req.url);
  next();
});

myapp.get('/myapp-02/v1/api', (req, res) => {
  console.log('Received request for /myapp-02/v1/api');
  console.log('Headers:', req.headers);
  res.json({ message: 'Hello from myapp-02/v1/api!' });
});

myapp.get('/my-02/v1/api', (req, res) => {
  console.log('Received request for /my-02/v1/api');
  console.log('Headers:', req.headers);
  res.json({ message: 'Hello from my-02/v1/api!' });
});

myapp.listen(port, () => {
  console.log(`myapp is running on http://localhost:${port}`);
});
