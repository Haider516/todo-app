# Todo App

A full-stack Todo application built with **Next.js**, **Prisma**, **NextAuth**, and **Tailwind CSS**.

## 🚀 Features
- ✅ User authentication with **NextAuth.js**
- 📄 Database management with **Prisma** and **PostgreSQL**
- 🎨 UI components with **Radix UI** and **Tailwind CSS**
- 🔐 Secure password hashing with **bcryptjs**
- 🛠 Unit and integration testing with **Jest** and **Testing Library**

## 📦 Tech Stack
- **Frontend:** Next.js (React 19, Tailwind CSS)
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Hosted on **Neon.tech**)
- **Authentication:** NextAuth.js
- **Testing:** Jest, React Testing Library

## 📂 Folder Structure
```
/todo-app
│-- /components        # UI components
│-- /pages             # Next.js pages
│-- /prisma            # Prisma schema and migrations
│-- /styles           # Global styles
│-- /tests             # Jest test cases
│-- prisma/schema.prisma  # Database schema
│-- next.config.js     # Next.js configuration
│-- tailwind.config.js # Tailwind configuration
│-- package.json       # Dependencies & scripts
│-- README.md          # Documentation
```

## 🔧 Setup & Installation
### 1. Clone the repository
```sh
git clone https://github.com/Haider516/todo-app.git
cd todo-app
```

### 2. Install dependencies
```sh
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory and add:
```
DATABASE_URL="postgresql://user:password@your-neon-db/todo-db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Run database migrations
```sh
npx prisma migrate dev --name init
```

### 5. Start the development server
```sh
npm run dev
```
Visit `http://localhost:3000` to view the app.

## 🚀 Deployment on Vercel
This project is deployed on **Vercel**. You can access it here:  
🔗 **Live Demo:** [Todo App on Vercel](https://todo-bptpjt8vq-haiders-projects-7f64ac4f.vercel.app/)

### Deploying to Vercel
To deploy your Next.js app to Vercel:
1. Install Vercel CLI (if not installed):
   ```sh
   npm install -g vercel
   ```
2. Run the deployment command:
   ```sh
   vercel
   ```
3. Follow the CLI instructions to link your project and deploy.

For more details, check out the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying).

## 📜 Available Scripts
- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run start`** - Start production server
- **`npm run lint`** - Lint code
- **`npm run test`** - Run tests
- **`npx prisma studio`** - Open Prisma database GUI

## 🛠 Testing
Run Jest tests:
```sh
npm run test
```

## 📜 License
This project is licensed under the MIT License.

---

Made by [Haider](https://github.com/Haider516)

