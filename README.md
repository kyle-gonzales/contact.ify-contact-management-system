# contact.ify-contact-management-system

A full-stack web solution for managing your contact information.

## Usage:
To run the application, simply run `docker-compose up` (assuming you have Docker installed on your machine).

> #### _Note:_ 
> There may be times that the _API service_ (`dotnet-web-api`) will start running before the _Sql Server service_ (`db`) has completed its set-up. This may result in the _API service_ exiting with an Exception:
> ```
> Microsoft.Data.SqlClient.SqlException (0x80131904): A network-related or instance-specific error occurred while establishing a connection to SQL Server.
> The server was not found or was not accessible. Verify that the instance name is correct and that SQL Server is configured to allow remote connections.
> (provider: TCP Provider, error: 40 - Could not open a connection to SQL Server)
> ```
> #### Fix:
> To fix this issue, you may:
> - Restart the `dotnet-web-api` service from within Docker Desktop, or
> - Stop the container with `docker-compose down` and restart it with `docker-compose up`.

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
