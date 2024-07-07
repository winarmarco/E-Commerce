# Essentia

An furniture e-commerce web application that was buiild designed to provide a robust, scalable solution for building an online store, complete with user authentication, product management, and a dynamic, responsive UI.

## Screenshots


## Features

- **User Authentication**: Integrated with Next Auth for secure sign-ins and user management.
- **Product Management**: Allows for adding, editing, and removing products.
- **Responsive Design**: Built with mobile-first approach using TailwindCSS.
- **Prisma ORM**: For efficient database management and operations.
- **React Query and TRPC**: For managing server state and API calls seamlessly.

## Technology used

- **NextJS**
- **PrismaORM & MySQL**
- **Typescript**
- **TRPC**
- **Shadcn UI**
- **Zod**
- **React Hook Form**

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (LTS version recommended)
- A MySQL database
- Git

### Instalation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/winarmarco/E-Commerce.git
   cd E-Commerce
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file and instantiate 
`NEXTAUTH_URL`, `NEXT_AUTH_SECRET`, and `DATABASE_URL`


4. **Run the Prisma migrations:**
   ```
   npx prisma migrate dev
   ```

5. Start the development/production server:

   To start a development server:
   ```
   npm run dev
   ```

   To start a production server:
   ```
   npm run build
   npm run start
   ```
   and visit http://localhost:3000


## License

This project is licensed under the MIT License - see the LICENSE.md file for details.


Thank you for visiting our project. We hope it helps you to build or learn something valuable. 

Feel free to customize this template to better fit the specifics of your project or add any additional sections that might be relevant. Once you're satisfied with the content, simply create a `README.md` file in your repository and paste this markdown content into it.
