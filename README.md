# 🍔 FoodGo - Food Ordering Web Application

A modern, responsive, and full-featured **Food Ordering Web Application** built with React, Vite, and Tailwind CSS. The app features separate user and admin panels to manage the food ordering lifecycle from browsing to delivery.

---

## 📸 Screenshots

Here is a visual overview of the application. *(Replace the placeholder image paths below with your actual screenshot files when ready)*

### 1. Splash & Authentication
> **Description:** The onboarding landing screen (Splash page) and the login/signup page where customers and administrators authenticate.
```
[Insert Splash/Login Screen Screenshot here]
E.g., <img src="./screenshots/login.png" width="800" alt="Login Page"/>
```

### 2. Customer Home & Product Browsing
> **Description:** The customer homepage displaying categorized food items (Burgers, Pizzas, Drinks, etc.), search bar, active promotions, and popular dishes.
```
[Insert Customer Home Screenshot here]
E.g., <img src="./screenshots/home.png" width="800" alt="Home Page"/>
```

### 3. Food Detail & Cart Management
> **Description:** The detailed view of a selected food item showing description, ratings, price, customization options, and the interactive cart drawer/page.
```
[Insert Cart/Details Screen Screenshot here]
E.g., <img src="./screenshots/cart.png" width="800" alt="Cart Page"/>
```

### 4. Checkout & Order History
> **Description:** The checkout page where users enter delivery details/payment method, and the order page showcasing the current status of their active orders.
```
[Insert Checkout/Orders Screen Screenshot here]
E.g., <img src="./screenshots/checkout.png" width="800" alt="Checkout Page"/>
```

### 5. Admin Dashboard & Product Management
> **Description:** The administrative dashboard showing business statistics and the product list where admins can add, update, or remove menu items.
```
[Insert Admin Dashboard Screenshot here]
E.g., <img src="./screenshots/admin_dashboard.png" width="800" alt="Admin Dashboard"/>
```

---

## ✨ Features

### 👤 Customer Panel
- **Landing (Splash) Page:** Beautiful introductory screen.
- **Home / Food Menu:** Browse products by categories, search for items, and view available deals.
- **Product Details:** Expand details for any food item.
- **Cart System:** Add items, update quantities, and calculate totals in real-time.
- **Checkout Process:** Input shipping address and complete ordering.
- **Order Tracking:** View order details and track delivery status.

### 🔑 Admin Panel
- **Dashboard:** Overview of sales, orders, and key metrics.
- **Product Management:** Full CRUD operations (Add, Edit, View, Delete) for food products.
- **Order Management:** View all user orders, update fulfillment status (e.g., Pending, Preparing, Dispatched, Delivered).

---

## 🛠️ Tech Stack

- **Frontend:** React (hooks, context API for state management)
- **Build Tool:** Vite
- **Styling:** CSS / Tailwind CSS
- **Routing:** React Router DOM

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/LoniPatel/Food_ordering_web.git
   cd Food_ordering_web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
src/
├── assets/          # Images, logos, and icons
├── components/      # Reusable UI components (buttons, inputs, cards)
├── context/         # React Context for global state (Auth, Cart)
├── layouts/         # Layout components (AdminLayout, UserLayout)
├── pages/           # Page views:
│   ├── Splash/      # Splash onboarding screen
│   ├── Login/       # Authentication page
│   ├── user/        # Home, ProductDetails, Cart, Checkout, Orders
│   └── admin/       # Dashboard, Products, Add/Edit Product, Orders
└── utils/           # Helper functions & constant data
```
