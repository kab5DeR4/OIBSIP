# PizzaCraft — Pizza Delivery App

A high-performance, local-first pizza delivery application featuring a custom ingredient-builder, interactive shopping cart, mock payment simulator, and real-time admin inventory and order status management.

## 🌟 Features
* **Interactive Menu & Category Filters:** View curated pizza varieties with vegetarian, meat, bestseller, and spicy tags.
* **Custom Pizza Builder:** Step-by-step visual configuration (Base, Sauce, Cheese, Veggie/Meat Toppings) with live price updates.
* **Smart Shopping Cart:** Live badge item count, quantities modifier, custom detail inspection, and mock order checkouts.
* **Local Persistence (mockStore):** Complete simulated auth database, orders list, and ingredient stock inventory backed by browser `localStorage`.
* **Admin Panel (`?panel=admin`):** Real-time order dispatch control (in kitchen, out for delivery, etc.) and ingredient threshold alerts.

## 🛠️ Tech Stack
* **Frontend:** React, TypeScript, TailwindCSS
* **Build Tool:** Vite
* **Icons:** Lucide React
* **State Management:** Custom React Context (Auth, Cart)
* **Local Data Layer:** `mockStore.ts` (LocalStorage CRUD simulator)

## 📸 Application Screenshot
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/5177465f-e545-489d-a2e5-7541c82d79f7" />

## 🚀 How to Run Locally

1. Clone the repository.
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser:
   * **User Portal:** `http://localhost:5173/`
   * **Admin Panel Portal:** `http://localhost:5173/?panel=admin`

## 🔗 Live Demo
* **Frontend (Vercel):** [https://oibsip-chi.vercel.app/](https://oibsip-chi.vercel.app/)
