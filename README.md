# 📦 Inventory Management System

A full-stack web application to manage product inventory efficiently. Built with React, Node.js/Express, and MySQL, it helps businesses track stock levels, manage products, and control user access — all from a clean and simple interface.

---

## 🚀 Features

- 🔐 **User Authentication** – Secure login and registration with session management
- 📦 **Product Management** – Add, edit, and delete products with ease
- 📊 **Stock Tracking** – Monitor real-time stock levels for all products
- 🔍 **Search & Filter** – Quickly find products by name, category, or stock status

---

## 🛠️ Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Frontend   | React.js          |
| Backend    | Node.js, Express  |
| Database   | MySQL             |

---

## 📁 Project Structure

```
inventory-management/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level components
│   │   └── App.js
├── server/               # Express backend
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── models/           # Database models
│   └── index.js
└── README.md
```

---

## ⚙️ How to Run Locally

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inventory-management.git
cd inventory-management
```

### 2. Set Up the Database

- Open MySQL and create a new database:

```sql
CREATE DATABASE inventory_db;
```

- Import the schema (if provided):

```bash
mysql -u root -p inventory_db < server/database/schema.sql
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server/` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventory_db
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Install Dependencies & Start

**Backend:**
```bash
cd server
npm install
npm start
```

**Frontend:**
```bash
cd client
npm install
npm start
```

### 5. Open in Browser

```
http://localhost:3000
```

---

## 📸 Screenshots

> _Add screenshots of your app here. Example:_

| Login Page | Dashboard | Product List |
|------------|-----------|--------------|
| ![login](#) | ![dashboard](#) | ![products](#) |

---

## 🔮 Future Improvements

- [ ] Low stock alerts and notifications
- [ ] Export inventory data to CSV/PDF
- [ ] Role-based access (Admin vs Staff)
- [ ] Dashboard with charts and analytics
- [ ] Deploy to cloud (AWS / Render)

---

## 👨‍💻 Author

**Ramya Shree*
- GitHub:  [@Ramayshree07](https://github.com/Ramayshree07)
- LinkedIn:  [Ramya Shree](https://www.linkedin.com/in/ramya-shree-a48068324/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
