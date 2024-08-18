# Compressio: A Video Showcase

**Compressio** is a modern and engaging web application for showcasing, transforming, and sharing videos. The platform utilizes Cloudinary for media management and offers a responsive, user-friendly interface built with Next.js, Tailwind CSS, and Clerk.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Database](#database)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Video Upload and Compression**
  - Upload videos to the platform.
  - Compress videos using Cloudinary and view details about compression ratio, original vs. compressed sizes.

- **Social Sharing**
  - Share videos directly on social media.

- **Home Page**
  - A visually appealing home page where users can explore video content.
  - Options for first-time users to sign up or sign in.
  - Prominent button for new users to explore the `/home` route.

- **Sign-In and Sign-Up**
  - Custom sign-in and sign-up pages with Clerk authentication.
  - Redirects signed-in users to the `/home` page and restricts access to certain routes for non-signed-in users.
  - Non-signed-in users can only access the home page and must sign in to access protected routes like `/upload-video` and `/social-share`.

- **Responsive Design**
  - UI designed to be responsive and visually appealing on all devices.
  - Navbar with options for signed-in users to view their profile and sign out.
  - Sign-in icon or button displayed for non-signed-in users.

- **Video Cards**
  - Displays video thumbnails, details, and download options.
  - Shows video previews on hover and provides information such as duration, file size, and compression statistics.

## Technologies

- **Next.js:** Framework for server-side rendering and static site generation.
- **Cloudinary:** For video storage, transformation, and management.
- **Clerk:** For user authentication and management.
- **Tailwind CSS:** For styling and responsive design.
- **Lucide React:** For icons and UI components.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/compressio.git
   cd compressio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your Cloudinary and Clerk credentials:
     ```env
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     NEXT_PUBLIC_CLOUDINARY_API_KEY=your-cloudinary-api-key
     NEXT_PUBLIC_CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     CLERK_FRONTEND_API=your-clerk-frontend-api
     CLERK_API_KEY=your-clerk-api-key
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Your application will be available at `http://localhost:3000`.

  ## Database

  The project uses a PostgreSQL database managed by Prisma. The database connection is setup in the `prisma/schema.prisma` file and the database is created with the `npx prisma migrate dev` command.

  The database schema is defined in the `prisma/schema.prisma` file as a Prisma schema. The schema defines the structure of the database, including the tables and their relationships. The schema is used to generate the database by running the `npx prisma migrate dev` command.

  The database is used to store data for the application, such as user information and video metadata. The data is accessed and manipulated using Prisma's ORM (Object-Relational Mapping) API. The API provides a type-safe interface for interacting with the database, allowing you to define the structure of the data and its relationships.


## Usage

- **First-Time Users:**
  - Visit the home page to explore video content.
  - Sign up or sign in to access additional features.
  - Use the button to explore the `/home` route.

- **Signed-In Users:**
  - Access all routes including video upload and social sharing.
  - View and interact with video cards, download videos, and manage your account.

- **Non-Signed-In Users:**
  - Access the home page only.
  - Redirected to the sign-in page when attempting to access protected routes like `/upload-video` or `/social-share`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to propose changes or report bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



All rights reserved by Rithend Sushanth, LinkedIn: [https://www.linkedin.com/in/rithend-sushanth-40430b248/](https://www.linkedin.com/in/rithend-sushanth-40430b248/)

