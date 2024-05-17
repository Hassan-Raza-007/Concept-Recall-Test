
# Concept Recall Test

Overview

Welcome to the README for our Full-Stack Application! This document provides an overview of the application's functionalities, technologies used, and insights into challenges faced during development.

Application Objective

The objective of this application is to design and develop a full-stack application using React, Typescript, and Node.js. The application allows users to create tasks accompanied by specific checklists, with emphasis on functionality over UI design.

Key Features

User authentication with username and password.
Creation and viewing of tasks associated with selected checklists.
Display of tasks with respective checklist items.
Ability to check off items in the checklist.
Multi-user support with data isolation.
Secure routes accessible only to authenticated users.
Backend storage of user and task data in a database.

Implementation Details

Frontend

Technology Stack: React with Typescript.
State Management: Utilized a suitable state management library.
Routing: Basic routing implemented.
Design: Basic design approach applied.

Backend

Technology Stack: Node.js with Express.
User Authentication: Implemented authentication with username and password.
Security: Integrated password hashing and token-based authentication.
Data Storage: Utilized a MongoDB database .
Data Isolation: Ensured users only have access to their own tasks and checklists.


Repository Structure

The repository contains separate folders for the frontend and backend code. Each section is well-organized with clear separation of concerns.

Feedback and Questions

Challenges Encountered

Data Isolation: Implementing data isolation to ensure users only access their own tasks and checklists posed a significant challenge. Maintaining this isolation while scaling the application was crucial.

Authentication Flow: Managing the authentication flow and securing routes required careful planning and implementation, especially in a multi-user environment.

Solutions Implemented

Data Isolation: Implemented middleware and database queries to enforce data isolation at the backend. Ensured proper user authentication and authorization mechanisms were in place.

Authentication Flow: Utilized token-based authentication for secure communication between the frontend and backend. Implemented robust error handling and user feedback mechanisms.

Helpful Practices and Tools

Express.js Middleware: Leveraged Express.js middleware for handling authentication and authorization, simplifying route security implementation.
TypeScript: TypeScript proved invaluable for type safety and better code organization, reducing runtime errors and enhancing developer productivity.
MongoDB Atlas: Utilized MongoDB Atlas for cloud-hosted database storage, providing scalability and reliability.