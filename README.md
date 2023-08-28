# Budget Tracking Application

Welcome to the Budget Tracking Application! This app helps you manage your monthly budget, track expenses, and gain insights into your spending habits. Keep your finances on track with ease.

## Tech Stack

- Frontend: React with Material-UI and Recharts
- Backend: Node.js/Express
- Database: MongoDB

## Features

- **User Authentication:** Securely register and log in with JWT-based token authentication.
- **Budget Entry Management:** Add, view, edit, and delete budget entries with transaction details and prices.
- **Date Filtering:** Filter budget entries by selecting a date range.
- **Exceeded Budget Notifications:** Get notified when you exceed your monthly budget.
- **Budget Trend Visualization:** Visualize your budget trend over different time periods with interactive charts.

## Getting Started

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/MABA1001/BudgetTracker.git
   cd BudgetTracker

   ```

2. **Navigate to the backend directory and install backend dependencies:**

```sh
cd backend
npm install
```

3. **Navigate to the backend directory and install backend dependencies:**

```sh
cd backend
npm install
```

4. **Similarly, navigate to the frontend directory and install frontend dependencies:**

```sh
cd backend
npm install
```

5. **Set Environment Variables:**
   In the backend directory, create a .env file and set the following:

```sh
PORT=3000
DATABASE_URI=your_database_uri
JWT_SECRET=your_jwt_secret
```

6. **Start the Servers:**
   Start the backend server:

```sh
 cd backend
 npm start
```

Start the frontend development server:

```sh
cd frontend
npm run dev
```

## Usage

- Register/Login: Sign up or log in to access your budget management dashboard.
- Set Budget Limit: Define your monthly budget limit to track your expenses effectively.
- Add Entries: Record your transactions by providing details like transaction name, price, and date.
- View and Manage: Monitor your budget entries, edit them, and even delete if needed.
- Filter by Date: Use the date picker to filter entries within a specific date range.
- Trend Charts: Visualize your budget trends over the last month, 6 months, and 12 months.
- Stay on Track: Receive notifications when you surpass your budget limit.

## License

Feel free to copy and paste this text into your preferred text editor. Remember to customize the placeholders (`yourusername`, `your_database_uri`, `your_jwt_secret`) and add the actual content as needed, such as screenshots, API documentation, and contributing guidelines.
