# HFiles Application - Deployment Guide

## Overview
This application consists of two main components:
- Backend: ASP.NET Core Web API with MySQL database
- Frontend: Next.js application with Tailwind

### Frontend has been live deployed to https://hfilesproj.vercel.app
## Prerequisites

### System Requirements
- .NET 10.0  (or later)
- Node.js 18+ and npm
- MySQL Server 8.0+
- Git for version control

### Development Environment Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd HFilesBackend
   dotnet restore

   # Frontend
   cd HFilesFrontend
   npm install
   ```

## Backend Deployment

### 1. Database Setup
- Create a MySQL database (e.g., `user_db`)
- Run migrations:
  ```bash
  dotnet ef database update
  ```

### 2. Environment Configuration
Create production `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "MySQLConnection": "Server=YOUR_DB_HOST;Port=3306;Database=user_db;User=YOUR_DB_USER;Password=YOUR_DB_PASSWORD"
  },
  "AllowedHosts": "*",
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

### 3. Run
Run the backend application:
```bash
dotnet run
```
The API will be available at `http://localhost:5240`

## Frontend Deployment

### 1. Run
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### 2. Build for Production
To create an optimized production build:
```bash
npm run build
npm start
```

