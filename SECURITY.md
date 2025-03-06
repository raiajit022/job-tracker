# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to [raiajit022@gmail.com]. All security vulnerabilities will be promptly addressed.

Please include the following information in your report:
- Type of issue
- Full paths of source file(s) related to the issue
- The location of the affected source code
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

## Security Measures

- Regular dependency updates and security audits
- Authentication using NextAuth.js with secure practices
- CSRF protection for all forms and API endpoints
- Secure HTTP headers
- Input validation and sanitization
- Database query parameterization

## Security Updates

Security updates will be addressed with high priority. We recommend keeping your installation up-to-date with the latest releases.

## Security Best Practices

When deploying this application, please ensure:

1. All environment variables are properly set and secured
2. HTTPS is enabled in production
3. Database access is limited and properly secured
4. Regular backups are performed
5. Access logs are monitored
