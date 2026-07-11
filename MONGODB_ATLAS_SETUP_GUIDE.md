# MongoDB Atlas Connection Guide

Complete guide for connecting your local MongoDB application to MongoDB Atlas (Cloud Database).

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create MongoDB Atlas Account](#step-1-create-mongodb-atlas-account)
3. [Step 2: Create a Free Cluster](#step-2-create-a-free-cluster)
4. [Step 3: Get Connection String](#step-3-get-connection-string)
5. [Step 4: Configure Network Access](#step-4-configure-network-access)
6. [Step 5: Update Application Code](#step-5-update-application-code)
7. [Step 6: Update Environment Variables](#step-6-update-environment-variables)
8. [Step 7: Restart Server](#step-7-restart-server)
9. [Step 8: Verify Connection](#step-8-verify-connection)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Existing MongoDB application with local database
- MongoDB Atlas account (free tier available)
- Access to your application's code and `.env` file

---

## Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign In"**
3. Sign up with Google account or email
4. Complete the registration process

---

## Step 2: Create a Free Cluster

1. In Atlas dashboard, click **"Create"** or **"Build a Cluster"**
2. Select **"Free"** tier (M0 - Shared cluster)
3. Choose your cloud provider (AWS, Google Cloud, or Azure)
4. Select region closest to your location
5. Click **"Create Deployment"**
6. Wait 1-3 minutes for cluster to provision

---

## Step 3: Get Connection String

1. Once cluster is ready, click **"Connect"** button
2. Select **"Drivers"**
3. Choose **"Node.js"** and version **5.5 or later**
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

**Important:** The `<password>` placeholder needs your actual database user password.

---

## Step 4: Configure Network Access

1. In left sidebar, click **"Network Access"** under Security
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (for development)
   - Or add your specific IP address
4. Click **"Confirm"**
5. Wait for status to show **"Active"**

---

## Step 5: Update Application Code

Ensure your server loads environment variables. Add to the top of your server file (`server/index.ts`):

```typescript
import "dotenv/config";
import express from "express";
// ... rest of imports
```

**Note:** Requires `dotenv` package (install with `npm install dotenv` if not present).

---

## Step 6: Update Environment Variables

Edit your `.env` file:

### Before (Local MongoDB):
```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
MONGO_DB_NAME=loan_risk_platform
```

### After (MongoDB Atlas):
```env
# MongoDB Configuration
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database_name>?retryWrites=true&w=majority
MONGO_DB_NAME=<database_name>

# Server Configuration
PORT=3000
```

**Important Notes:**
- Replace `<username>` with your Atlas database username
- Replace `<password>` with your actual password (URL-encode special characters: `#` → `%23`, `<` → `%3C`, `>` → `%3E`)
- Replace `<database_name>` with your database name (e.g., `loan_risk_platform`)
- The database name in the URL path is optional but recommended

---

## Step 7: Restart Server

1. Stop your current server (Ctrl+C)
2. Start again:
   ```bash
   npm run dev
   # or
   npm start
   ```
3. Check console output:
   ```
   ✅ Connected to MongoDB
   Loan Risk API running on http://localhost:3000
   ```

---

## Step 8: Verify Connection

### In MongoDB Atlas Data Explorer:

1. Click **"Data Explorer"** in left sidebar
2. Expand your cluster (**Cluster0**)
3. Look for your database name (**loan_risk_platform**)
4. Expand to see collections (created automatically when data is inserted)
5. View documents by clicking on collection names

### Test Your Application:

1. Open your application in browser
2. Create data (submit forms, add records)
3. Refresh Data Explorer to see new data

---

## Troubleshooting

### Error: "mongodb+srv URI cannot have port number"

**Cause:** Connection string format issue

**Fix:** Remove any port numbers from the URI. Atlas uses default ports automatically.

### Error: "bad auth : authentication failed"

**Cause:** Incorrect password

**Fix:** 
1. Go to Atlas → Database Access
2. Reset password for your user
3. Update `.env` file with correct password
4. URL-encode special characters in password

### Error: "connection refused" or timeout

**Cause:** Network access not configured

**Fix:** Add your IP address to Network Access whitelist (Step 4)

### Database not showing in Data Explorer

**Cause:** No data created yet

**Fix:** 
1. Ensure server is running and connected
2. Use your application to create data
3. Collections appear automatically on first insert

### Password contains special characters

**Fix:** URL-encode special characters:
- `#` → `%23`
- `<` → `%3C`
- `>` → `%3E`
- `@` → `%40`
- `:` → `%3A`

Example: `My#Pass<word>` → `My%23Pass%3Cword%3E`

---

## Security Best Practices

1. **Never commit `.env` file** to git (should be in `.gitignore`)
2. **Use strong passwords** for database users
3. **Restrict IP access** in production (don't use "Allow from Anywhere")
4. **Create separate database users** for different applications
5. **Enable two-factor authentication** on your Atlas account

---

## Additional Resources

- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Connection String Options](https://www.mongodb.com/docs/manual/reference/connection-string/)
- [Node.js MongoDB Driver](https://www.mongodb.com/docs/drivers/node/current/)

---

## Summary

You have successfully migrated from local MongoDB to MongoDB Atlas cloud database. Your application now:

- ✅ Connects to cloud database
- ✅ Stores data persistently online
- ✅ Accessible from anywhere with internet
- ✅ Scalable and managed by MongoDB

Next steps: Continue developing your application. All data is now stored in the cloud!
