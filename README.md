# Job Tracker Application

## 📋 Overview

Job Tracker is a comprehensive web application designed to help job seekers organize and monitor their job application process. Built with Next.js, TypeScript, and Prisma, it offers a robust system for tracking job applications from wishlist to acceptance.

## ✨ Features

- **Complete Job Application Management**: Track applications across multiple stages (wishlist, applied, interview, offer, rejected, accepted)
- **User Authentication**: Secure login and registration using NextAuth.js
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Reminder System**: Set and receive notifications for important dates
- **Contact Management**: Store recruiter and hiring manager details
- **Notes**: Maintain detailed notes for each application
- **Dark/Light Mode**: Choose your preferred theme

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI and custom components
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form with Zod validation
- **Email**: Nodemailer/Resend for notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/job-tracker.git
   cd job-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/jobtracker"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET="your-secret-here"
   
   # For email notifications (choose one provider)
   # Resend
   RESEND_API_KEY="your-resend-api-key"
   
   # Or Nodemailer
   EMAIL_SERVER_USER="your-email@example.com"
   EMAIL_SERVER_PASSWORD="your-email-password"
   EMAIL_SERVER_HOST="smtp.example.com"
   EMAIL_SERVER_PORT=587
   EMAIL_FROM="no-reply@example.com"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📊 Project Structure

```
job-tracker/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   └── page.tsx          # Main page
├── components/           # React components
│   ├── ui/               # UI components
│   ├── job-form.tsx      # Job application form
│   └── job-list.tsx      # Job application list
├── prisma/               # Prisma configuration
│   └── schema.prisma     # Database schema
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 💻 Usage

### Authentication

1. Register a new account or login with your credentials
2. Optional: Connect with social providers (if configured)

### Managing Job Applications

1. **Add a New Application**:
   - Click "Add Application" button
   - Fill in the application details
   - Submit the form

2. **View Applications**:
   - All applications are displayed in a list/table view
   - Applications are grouped by status

3. **Update an Application**:
   - Click on an application to edit its details
   - Change status as you progress through the hiring process
   - Add notes after interviews or interactions

4. **Delete an Application**:
   - Remove applications you no longer want to track

### Setting Reminders

1. Add a reminder date when creating or editing an application
2. Receive email notifications for upcoming deadlines or follow-ups

## 🔒 Authentication

The application uses NextAuth.js for authentication with the following providers:
- Email/Password
- Google (if configured)
- GitHub (if configured)

## 📱 API Endpoints

The application provides the following API endpoints:

- `GET /api/applications` - Get all applications for the authenticated user
- `POST /api/applications` - Create a new application
- `PUT /api/applications/:id` - Update an existing application
- `DELETE /api/applications/:id` - Delete an application
- `GET /api/applications/stats` - Get application statistics

## 🛡️ Security

- User passwords are hashed using bcrypt
- Authentication is handled by NextAuth.js
- CSRF protection is enabled
- API routes are protected with session validation

## 🧪 Testing

Run the test suite with:

```bash
npm test
```

## 📈 Roadmap

- [ ] Advanced filtering and sorting options
- [ ] Application metrics and analytics
- [ ] Calendar view for interviews and deadlines
- [ ] Document storage for resumes and cover letters
- [ ] Integration with job boards APIs
- [ ] Mobile application

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [React Hook Form](https://react-hook-form.com/) - Form handling

---

Made with ❤️ by Ajit Rai

```

## Troubleshooting

### Common Issues

**Database Connection Errors**:
- Verify your PostgreSQL server is running
- Check that your DATABASE_URL is correct in .env
- Ensure network connectivity to your database server

**Authentication Issues**:
- Confirm NEXTAUTH_URL is properly set to your site's URL
- Verify NEXTAUTH_SECRET is set with a strong random string
- Check provider credentials for social logins

**Email Notification Problems**:
- Verify email provider credentials
- Check spam folders for test emails
- Review server logs for sending errors

For additional help, please [open an issue](https://github.com/raiajit022/job-tracker/issues) on the GitHub repository.
