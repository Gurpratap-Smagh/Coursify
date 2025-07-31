# Production CORS Fix

## Problem
Your backend (on Railway) is blocking requests from your frontend (on Vercel). This is a security feature in browsers to prevent unauthorized cross-domain requests. The error `No 'Access-Control-Allow-Origin' header is present` means your backend isn't explicitly allowing your frontend's domain.

## Solution
You need to configure your backend's CORS policy to allow requests from your Vercel URL.

### 1. Set Environment Variable on Railway

Your backend code is already set up to use an environment variable for this. You just need to set it correctly on Railway.

1.  Go to your **Railway project dashboard**.
2.  Navigate to your backend service.
3.  Go to the **Variables** tab.
4.  Add a new environment variable:
    *   **Name**: `ALLOWED_ORIGINS`
    *   **Value**: `https://coursify-psi.vercel.app`

### 2. (Optional but Recommended) Update Backend CORS Configuration

To make your backend more robust, you can update your CORS configuration to be more flexible. This code will handle multiple allowed origins and ensure preflight requests (like `OPTIONS`) are handled correctly.

Replace your current `app.use(cors(...))` section with this:

```javascript
// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow if the origin is in our list
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Handle preflight requests
app.options('*', cors(corsOptions));

// Use CORS for all other requests
app.use(cors(corsOptions));
```

### What This Fixes

1.  **Allows Your Frontend**: Explicitly tells the backend that requests from `https://coursify-psi.vercel.app` are safe.
2.  **Handles Preflight Requests**: The `app.options('*', cors(corsOptions));` line is crucial for handling complex requests (like those with `Authorization` headers) that browsers send before the actual `POST` or `GET` request.

## Next Steps

1.  **Set the environment variable on Railway.** This is the most critical step.
2.  (Optional) Update your backend's CORS code with the improved version above.
3.  **Redeploy your backend** to Railway.

After you do this, the CORS errors should be gone, and your frontend will be able to communicate with your backend.
