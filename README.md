# contact.ify-contact-management-system

A full-stack web solution for managing your contact information.

## Features:
- authentication: register and login into an account
- add, edit, delete contacts
- add, edit, delete emails, addresses, and phone numbers for a contact
- add your favorite contacts
- search for contacts
- edit user account information

## Tech stack:

### Frontend:
- React with Next.js
- Bootstrap CSS

### Backend:
- ASP.Net Core 6 Web API with C#
- Authentication with JSON Web Token

## Architecture:
Contact.ify follows the traditional MVC architecture.
### Frontend Architecture:
The frontend of Contact.ify follows the [Page Router](https://nextjs.org/docs/pages/building-your-application/routing) (file-system based router) of Next.js. Reusable components are stored in `components/`, custom hooks are stored in `hooks/`, etc.

### Backend Architecture:
The backend of Contact.ify is built with the traditional layered architecture that is centered around the database. These layers are:
- Data Access Layer (Models and Data Persistence)
- Domain Layer (DTOs and Business Logic)
- API Layer (Controller Logic)
