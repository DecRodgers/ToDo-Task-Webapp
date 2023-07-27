# TODO Application

This is a simple TODO application built with a React & TypeScript frontend and ASP.NET Core Web API. 
It allows users to add, update, and delete tasks.

## Status

- Initial Backend code done
- Some unit tests added
- Frontend started, learning components to add form for new/edit functions and a component for a table

## Features

- Add a new task with name, priority, and status.
- View a list of existing tasks with their details.
- Update the details of an existing task.
- Delete a task from the list.

## Technologies Used

- React: Front-end framework for building user interfaces.
- TypeScript: Superset of JavaScript that adds static typing to the language.
- ASP.NET Core Web API: Back-end framework for building RESTful APIs.
- Axios: JavaScript library for making HTTP requests from the front-end.
- Material-UI: React UI framework for building responsive and attractive UI components.
- Xunit: Unit testing library for .NET Core applications.
- FluentAssertions: Library for writing more expressive and readable unit tests in .NET.

## Approach

- TBC

## Getting Started

To run the TODO application locally, follow these steps:

1. Clone the repository to your local machine.
2. Open the `todo-app.sln` solution file in Visual Studio.
3. Build the solution to restore NuGet packages and compile the projects.
4. Set both `todo-backend` and `todo-frontend` projects as Startup Projects. Right-click on the solution in Solution Explorer, select "Set Startup Projects...", and choose "Multiple startup projects". Set both projects to "Start", with the backend project starting first.
5. Press `F5` or click the "Start" button in Visual Studio to run both the backend and frontend projects simultaneously.
6. You should now be able to access the application in your web browser at `http://localhost:3000`.

With this setup, both the backend (ASP.NET Core Web API) and frontend (React) projects will run concurrently, and you can interact with the TODO application in your web browser.

Please note that you might need to update the base URLs in the frontend code (`API_BASE_URL` in `App.tsx`) to match the actual URLs used by the backend when running locally.

## Folder Structure

- `todo-frontend`: Contains the React front-end code.
- `todo-backend`: Contains the ASP.NET Core Web API back-end code.
- `todo-app.tests`: Contains unit tests for the back-end code.

## How to Use

- Open the TODO application in your web browser.
- Enter a new task name, priority, and status in the input fields and click the "Add Task" button to add a new task.
- View the list of existing tasks with their details in a table.
- Click the "Edit" button to update the details of a task.
- Click the "Delete" button to remove a task from the list.

## Running Tests in Visual Studio

The TODO application contains unit tests for the backend code. To run the tests in Visual Studio, follow these steps:

1. Open the `todo-app.sln` solution file in Visual Studio.
2. Right-click on the solution in the Solution Explorer and select "Restore NuGet Packages" to ensure all required packages are installed.
3. In Solution Explorer, locate the `todo-app.tests` project.
4. Right-click on the `todo-app.tests` project and select "Build" to ensure the project builds successfully.
5. To run the tests, go to the "Test" menu at the top of Visual Studio and choose "Run All Tests" (or use the keyboard shortcut `Ctrl + R, A`).

Visual Studio will then execute all the unit tests in the `todo-app.tests` project, and the test results will be displayed in the Test Explorer window.

Please ensure that you have the appropriate testing framework (e.g., MSTest, xUnit, or NUnit) installed and the project references set up correctly. If you encounter any issues with running the tests, make sure that you have restored the NuGet packages for the solution.
