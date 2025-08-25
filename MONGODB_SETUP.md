# MongoDB Atlas Setup and Troubleshooting Guide

## Current Status
Your MongoDB connection string has been configured, but there are SSL/TLS connection issues that need to be resolved.

## Connection String
```
mongodb+srv://jadhavprathameshv:3v4mnZ60ia7TRKIb@login.ljilgjv.mongodb.net/userauth?retryWrites=true&w=majority&appName=login
```

## Database Structure
The application is configured to use:
- **Database Name**: `userauth`
- **Collections**:
  - `users` - For user authentication and profiles
  - `newsletter_subscribers` - For newsletter subscriptions

## Issues to Check in MongoDB Atlas

### 1. Cluster Status
- Log into MongoDB Atlas (https://cloud.mongodb.com/)
- Check if your cluster is running (not paused)
- Ensure the cluster is in an active state

### 2. Network Access
- Go to **Security > Network Access** in Atlas
- Make sure your current IP address is whitelisted
- Or add `0.0.0.0/0` for testing (not recommended for production)

### 3. Database Access
- Go to **Security > Database Access**
- Verify user `jadhavprathameshv` exists and has proper permissions
- Ensure the user has **Read and write to any database** permissions

### 4. Connection Issues
The SSL error suggests one of these problems:
- Cluster is paused or inactive
- Network restrictions are blocking the connection
- SSL/TLS configuration issues

## How to Test the Connection

### Method 1: Using MongoDB Compass
1. Download MongoDB Compass
2. Use the connection string to connect
3. This will help identify if it's an application-specific issue

### Method 2: Using mongosh (MongoDB Shell)
```bash
mongosh "mongodb+srv://jadhavprathameshv:3v4mnZ60ia7TRKIb@login.ljilgjv.mongodb.net/userauth"
```

### Method 3: Test API Endpoint
Once the cluster is accessible, test:
```bash
curl http://localhost:3001/api/test-db
```

## Application Features Setup

### 1. User Registration
- **Endpoint**: `POST /api/auth/register`
- **Creates**: New users in the `users` collection
- **Validates**: Email format, password strength, unique emails
- **Stores**: Hashed passwords, user roles (parent/teacher/admin)

### 2. User Login
- **Endpoint**: `POST /api/auth/login`
- **Validates**: Email and password against database
- **Returns**: JWT token and user information
- **Sets**: HTTP-only cookie for session management

### 3. Newsletter Subscription
- **Endpoint**: `POST /api/newsletter`
- **Creates**: New subscribers in `newsletter_subscribers` collection
- **Validates**: Email format and prevents duplicates
- **Tracks**: Subscription date and source

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique index),
  password: String (hashed),
  role: String ('parent', 'teacher', 'admin'),
  organization: String (optional),
  createdAt: Date,
  active: Boolean
}
```

### Newsletter Subscribers Collection
```javascript
{
  _id: ObjectId,
  email: String (unique index),
  subscribedAt: Date,
  active: Boolean,
  source: String
}
```

## Next Steps

1. **Fix MongoDB Atlas Access**:
   - Check cluster status in Atlas dashboard
   - Verify network access settings
   - Confirm database user permissions

2. **Test Connection**:
   - Use the test endpoint: `/api/test-db`
   - Verify database initialization

3. **Test Registration Flow**:
   ```bash
   curl -X POST http://localhost:3001/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123",
     "role": "parent"
   }'
   ```

4. **Test Login Flow**:
   ```bash
   curl -X POST http://localhost:3001/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{
     "email": "test@example.com",
     "password": "password123"
   }'
   ```

5. **Test Newsletter Subscription**:
   ```bash
   curl -X POST http://localhost:3001/api/newsletter \
   -H "Content-Type: application/json" \
   -d '{
     "email": "newsletter@example.com"
   }'
   ```

## Files Modified

1. **Environment Configuration**: `.env.local`
2. **MongoDB Connection**: `lib/mongodb.ts`
3. **Registration API**: `app/api/auth/register/route.ts`
4. **Login API**: `app/api/auth/login/route.ts`
5. **Newsletter API**: `app/api/newsletter/route.ts`
6. **Test Endpoint**: `app/api/test-db/route.ts`

All files have been updated to use the `userauth` database and include proper error handling.
