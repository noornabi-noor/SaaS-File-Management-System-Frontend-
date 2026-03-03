# SaaS File Management System – Frontend  

---

## 📌 Project Overview
This frontend application provides a clean and intuitive user interface for a Subscription-based File & Folder Management SaaS platform.

It allows Admins to manage subscription packages and Users to manage files and folders according to their active subscription limits.

The UI communicates with the backend API and reflects real-time subscription-based restrictions.

---

## Core Features
### Authentication
- User Registration
- User Login
- Admin Login
- JWT-based session handling

### Admin Panel
- View all subscription packages
- Create new packages
- Update package limits
- Delete packages
Each package includes:
- Max Folders
- Max Nesting Level
- Allowed File Types
- Max File Size
- Total File Limit
- Files Per Folder

### User Dashboard
- View available subscription packages
- Select or change active package
- View subscription history

### Folder Management
- Create folders
- Create subfolders
- Rename folders
- Delete folders
- View folder hierarchy

Folder actions are restricted based on the active subscription.

### File Management
- Upload files (Image, Video, Audio, PDF)
- View files inside folders
- Rename files
- Download files
- Delete files

Upload validation errors (size, type, limits) are displayed clearly to users.
 
> Admin accounts are created from the backend.

---

## 🛠️ Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Fetch API**
- **React Hook Form**
- **Session-based Auth (via backend)**

---

## 📄 Pages & Routes

### 🎒 Student Pages (Protected)

| Route | Description |
|-----|-------------|
| `/dashboard` | User dashboard |
| `/dashboard/overview` | Overview |
| `/dashboard/myfiles` | My Files |
| `/dashboard/subscription` | Subscription |
| `/dashboard/history` | History |
| `/dashboard/profile` | Profile |

---

### 🛡️ Admin Pages (Protected)

| Route | Description |
|-----|-------------|
| `/dashboard/AdminOverviewData` | Dashboard |
| `/admin/ManagePackages` | Manage Packages |
| `/admin/Users` | Users |

---

## 🔐 Authentication Flow
- Authentication is handled via the backend API
- Protected routes are guarded on the client side
- Role-based rendering ensures users only see authorized pages

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
---
## 🚀 Getting Started
1️⃣ Install dependencies
```bash
npm install
```

## 2️⃣ Run development server
```bash
npm run dev
```

Frontend will run at:
```bash
📍 http://localhost:3000
```
--- 

## 🔄 API Integration

- All data is fetched from the SaaS File Management System Backend API
- Fetch is used for HTTP requests
- Error handling and loading states are implemented globally

---