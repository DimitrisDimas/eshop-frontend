# 🛍️ E-Shop Application Frontend

A responsive, modern, and dynamic frontend for a full-stack e-commerce platform. This application serves as the client-side interface for the E-Shop, providing an intuitive user experience for browsing products, managing shopping carts, and processing orders.

It is designed to consume RESTful APIs provided by the [E-Shop Backend](https://github.com/DimitrisDimas/eshop-backend) (Spring Boot), ensuring a seamless flow of data between the user interface and the database.

## 🚀 Key Features

### 💻 User Interface & Experience

-   **Product Catalog:** Dynamic grid layout to browse products with images and prices.
    
-   **Advanced Filtering:** Filter products by categories, price range, or search queries.
    
-   **Shopping Cart:** Real-time cart management (add, remove, adjust quantities) using global state management.
    
-   **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
    

### 🛡 Security & State

-   **Authentication:** Login and Registration forms integrated with JWT (stored in LocalStorage/HttpOnly Cookies).
    
-   **Protected Routes:** Route guards that prevent unauthorized access to user profiles or checkout pages.
    
-   **State Management:** Centralized store for managing user sessions, cart contents, and UI themes.
    

### ⚙ Architecture / Engineering

-   **Component-Based Architecture:** Reusable and modular UI components.
    
-   **Service Layer Pattern:** Decoupled API logic (Axios/Fetch) from UI components.
    
-   **Form Handling:** Robust form validation and error handling.
    
-   **Routing:** Client-side routing for a seamless Single Page Application (SPA) experience.
    

## 🧰 Tech Stack Summary

| **Layer** | **Technology** | **Key Use** |
| --- | --- | --- |
| **Framework** | React.js  | Core UI Library  |
| **Language** | TypeScript / JavaScript | Application logic and type safety |
| **State Management** | Redux Toolkit / Context API | Managing Cart and Auth state |
| **Styling** | Material MUI | Responsive UI design and layout |
| **HTTP Client** | Axios | Consuming Spring Boot REST APIs |
| **Routing** | React Router | Navigation between pages |
| **Build Tool** | Vite / Webpack | Bundling and development server |

## 📁 Project Structure

The project follows a clean, feature-based directory structure to ensure maintainability:

Plaintext

    eshop-frontend/
     ├── src/
     │   ├── assets/            # Static images, icons, and global styles
     │   ├── components/        # Reusable UI components (Navbar, ProductCard, Button)
     │   ├── pages/             # Main page views (Home, Login, Cart, Checkout)
     │   ├── services/          # API service calls (AuthService, ProductService)
     │   ├── context/           # Global State (AuthContext, CartContext)
     │   ├── hooks/             # Custom React Hooks
     │   ├── utils/             # Helper functions and constants
     │   └── App.js             # Main Application component & Routing logic
     ├── public/                # Public assets (index.html, favicon)
     ├── .env                   # Environment variables (API URLs)
     └── package.json           # Project dependencies and scripts

## ⚙️ Installation & Running the Frontend

### ✅ Prerequisites

Ensure the following are installed:

-   **Node.js** (v16 or higher)
    
-   **npm** or **yarn**
    
-   **Git**
    

### 🏗 Step 1: Clone the Repository

    git clone https://github.com/DimitrisDimas/eshop-frontend.git
    cd eshop-frontend

### 📦 Step 2: Install Dependencies

    npm install
    # or
    yarn install

### 🔌 Step 3: Configure Environment

Create a `.env` file in the root directory to configure the connection to your Spring Boot backend:

Απόσπασμα κώδικα

    REACT_APP_API_BASE_URL=http://localhost:8081/api

_(Note: Ensure your Backend is running on port 8081)_

### 🚀 Step 4: Run the Application

    npm start
    # or
    yarn start

The application will launch automatically at: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

## 🗺 Application Routes Overview

Below is a summary of the main application routes available in the frontend.

### 🔓 Public Routes

| **Path** | **Component** | **Description** |
| --- | --- | --- |
| `/` | `Home` | Landing page featuring promoted products |
| `/products` | `ProductList` | Full catalog with filtering and sorting |
| `/products/:id` | `ProductDetail` | Detailed view of a single product |
| `/login` | `Login` | User authentication form |
| `/register` | `Register` | New user sign-up form |

### 🔐 Protected Routes (Requires Login)

| **Path** | **Component** | **Description** |
| --- | --- | --- |
| `/cart` | `Cart` | View and manage added items |
| `/checkout` | `Checkout` | Shipping details and order confirmation |
| `/profile` | `UserProfile` | View order history and user details |
| `/admin/*` | `AdminDashboard` | (Optional) Admin management panel |


## 📌 Future Plans

This frontend is designed to grow alongside the backend. Future improvements include:

-   **Payment Integration:** integrating Stripe/PayPal JS SDKs for real payments.
    
-   **Dark Mode:** Implementing a system-wide theme toggle.
    
-   **PWA Support:** Making the app installable on mobile devices.
    
-   **Internationalization (i18n):** Adding multi-language support.
