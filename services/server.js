const express = require('express');
const app = express();
const port = 3000;

const response = {
  "mappings": [
    {
      "request": {
        "urlPattern": "/sessions/whoami",
        "method": "ANY",
        "headers": {
          "Authorization": {
            "absent": true
          }
        }
      },
      "response": {
        "status": 401
      },
      "priority": 10
    },
    {
      "request": {
        "urlPattern": "/sessions/whoami",
        "method": "ANY",
        "headers": {
          "Authorization": {
            "doesNotMatch": "Bearer dobrytoken"
          }
        }
      },
      "response": {
        "status": 401
      },
      "priority": 20
    },
    {
      "request": {
        "urlPattern": "/sessions/whoami",
        "method": "ANY",
        "headers": {
          "Authorization": {
            "equalTo": "Bearer dobrytoken"
          }
        }
      },
      "response": {
        "status": 200,
        "body": "{\"identity\":{\"id\":\"497f6eca-6276-4993-bfeb-53cbbbba6f08\",\"metadata_public\":{\"roles\":\"admin\"},\"traits\":{\"username\":\"admin\"}}}"
      },
      "priority": 1000
    }
  ]
}

app.use((req, res, next) => {
    console.log('Request receivedx', req.method, req.url);
    next();
});

app.all('/sessions/whoami', (req, res) => {
  const authHeader = req.headers['authorization'];

  console.log('authHeader', authHeader);

  if (!authHeader) {
    // return res.status(401).json({ error: 'Unauthorized' });
  }

  if (authHeader !== 'Bearer token') {
    // return res.status(401).json({ error: 'Unauthorized' });
  }

  res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
