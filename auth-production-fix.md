# Production Authentication Fix

## Problem
Your frontend (Vercel) and backend (Railway) are on different domains, causing cookie authentication to fail due to CORS restrictions. The 403 errors occur because cookies aren't being sent with cross-origin requests.

## Solution
I've added an axios interceptor to your AuthContext that automatically includes the token in the Authorization header for all requests. However, your backend's `authMiddleware` needs a small update to handle this properly.

## Backend Fix Needed

In your backend code, update the `authMiddleware` function to properly handle the Authorization header:

```javascript
const authMiddleware = (req, res, next) => {
    try {
        // Try to get token from cookies first (for same-origin requests)
        let token = req.cookies.token;
        
        // If no cookie token, try Authorization header (for cross-origin requests)
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }
        
        if (!token) {
            return res.status(403).json({ message: "wtf no token" });
        }

        const decodeddata = jwt.verify(token, secret);
        req.userId = decodeddata.id;
        req.rank = decodeddata.rank;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "invalid token" });
    }
};
```

## What This Fixes

1. **Cross-Origin Authentication**: Tokens are now sent in Authorization headers for production
2. **Backward Compatibility**: Still supports cookie-based auth for development
3. **Automatic Token Inclusion**: The axios interceptor automatically adds tokens to all requests

## Frontend Changes Made

✅ Added axios interceptor in AuthContext.jsx to automatically include tokens in headers
✅ This works with your existing cookie storage system

## Next Steps

1. Update your backend's `authMiddleware` with the code above
2. Redeploy your backend to Railway
3. Your authentication should work in production

The interceptor I added will automatically include the token from cookies in the Authorization header for all axios requests, which your backend can then read properly.
