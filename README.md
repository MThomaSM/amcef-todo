## Running TODO app with Prisma migrations

### Prerequisites
- Make sure you have Node.js and npm (Node Package Manager) installed on your machine.
- Ensure you have a working MySQL database connection and have installed the required database drivers.

### Step 1: Clone the Repository
1. Open a terminal or command prompt.
2. Change the current directory to the location where you want to clone the project.
3. Run the following command to clone the repository: ``git clone <repository-url>``
   Replace `<repository-url>` with the URL of this project repository.

### Step 2: Install Dependencies
1. Navigate to the project directory: ``cd <project-directory>`` Replace `<project-directory>` with the name of your project directory.
2. Install the project dependencies by running the following command: ``npm install``

### Step 3: Configure Prisma
1. Open the `.env` file in the project root directory.
2. Set the database connection URL and other configuration variables based on your database setup. For example: ``DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"``
3. Set JWT secret variable like: ``JWT_SECRET="secret string"``

### Step 4: Apply Prisma Migrations
1. In the terminal, run the following command to generate the Prisma client: ``npx prisma generate``
2. Apply the Prisma migrations by running the following command: ``npx prisma migrate dev``

### Step 5: Start the Development Server
1. Run the following command to start the Next.js development server: ``npm run dev ``

This will start the server and make your application accessible at `http://localhost:3000`.
Endpoint documentations: https://documenter.getpostman.com/view/27769979/2s93sW7aA7#e89268ec-434d-49af-81fb-ee3b2df942b5
