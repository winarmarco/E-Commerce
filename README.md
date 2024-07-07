# Essentia

An furniture e-commerce web application that was buiild designed to provide a robust, scalable solution for building an online store, complete with user authentication, product management, and a dynamic, responsive UI.

## Screenshots
### Client Page: ###
---
**Landing Page**

![screencapture-chatkinator-2024-07-07-14_40_51](https://github.com/winarmarco/E-Commerce/assets/67379029/b856ecca-3101-4424-9404-b3028eb8f8f4)

**Product Catalog Page**

![image](https://github.com/winarmarco/E-Commerce/assets/67379029/ab4c91f6-2f7e-4e7f-9ed1-2681f8d54ee6)

**Product Details Page**

![image](https://github.com/winarmarco/E-Commerce/assets/67379029/304d0e1a-0e9d-4e26-8c0e-da1339e3e328)

**Cart Page**

![image](https://github.com/winarmarco/E-Commerce/assets/67379029/7c40f2ad-954f-4f66-a799-23280f0aab38)

**Checkout Page**

![image](https://github.com/winarmarco/E-Commerce/assets/67379029/dd8ed164-a72f-4cf8-945d-e27427b86f5d)

### Admin Page ###
---
**Admin Dashboard Page**

![localhost_3000_admin_dashboard (1)](https://github.com/winarmarco/E-Commerce/assets/67379029/10928922-a225-45ad-94f1-ce7097870e96)

**Admin Dashboard Page**

![localhost_3000_admin_dashboard (1)](https://github.com/winarmarco/E-Commerce/assets/67379029/10928922-a225-45ad-94f1-ce7097870e96)

**Admin Product Page**

![localhost_3000_admin_dashboard (2)](https://github.com/winarmarco/E-Commerce/assets/67379029/c3a3208d-960e-453f-b49a-5036bf5be2dc)

![localhost_3000_admin_order_clxzhumcr0005136dba7n67cw (1)](https://github.com/winarmarco/E-Commerce/assets/67379029/8b0557da-7252-468f-8161-3c9a33ba2ad4)

**Admin Order Management Page**

![localhost_3000_admin_dashboard (4)](https://github.com/winarmarco/E-Commerce/assets/67379029/0b1b7b7f-7e2a-4dd5-a915-edbd8d9b4eb5)

![localhost_3000_admin_order_clxzhumcr0005136dba7n67cw (2)](https://github.com/winarmarco/E-Commerce/assets/67379029/60b06051-0c6e-4eed-85eb-6ee82c5b2a52)



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

## Project Status
Completed
