# My Task Board - Task Management App

My Task Board is a straightforward task management application that allows users to manage their tasks using essential HTTP methods such as GET, POST, PUT, and DELETE. This project was developed as a fullstack challenge to demonstrate proficiency in full-stack development by creating a system that enables users to manage tasks with fundamental HTTP operations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [User Stories](#user-stories)
- [Contributing](#contributing)
- [License](#license)
- [Live Demo](#live-demo)
- [Repository](#repository)

## Features

- View a board with default tasks upon first load.
- Edit task name, description, icon, and status.
- Delete tasks with a `Delete` button.
- Add new tasks with a default name.
- Edit board name and optionally board description.
- Unique board ID created and saved to the database on first visit or after the first change.
- Access each board via a unique ID (e.g., `/board/:board-id`).

## Tech Stack

- **Front-end**: React, TailwindCSS, React Router, React Query
- **Back-end**: Node.js, Express
- **Database**: MongoDB, Mongoose

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/xGeekoo/my-task-board.git
    cd my-task-board
    ```

2. **Install dependencies for the server and client:**

    ```sh
    # For server
    cd server
    npm install
    
    # For client
    cd ../client
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `server` directory and add the following:

    ```env
    DB_HOST=your_mongodb_connection_string
    PORT=3000
    ```

4. **Run the development server:**

    ```sh
    npm run dev
    ```

    To run the application in production mode, use:

    ```sh
    npm run prod
    ```

    The application should now be running on `http://localhost:3000` for the back-end and `http://localhost:5173` for the front-end.

## Usage

1. Open the application in your web browser.
2. By default, a board with 4 tasks will be displayed.
3. Edit tasks by clicking on the task and modifying the name, description, icon, or status.
4. Delete tasks by selecting the `Delete` button.
5. Add a new task by selecting the `Add new task` option.
6. Edit the board name and optionally the board description.
7. Each board can be accessed via a unique ID (e.g., `/board/:board-id`).

## User Stories

1. **Create a simple task management application following the given design.**
2. **By default, it should show a board with 4 tasks like in the design.**
3. **Users can edit task name, description, icon, and status.**
4. **Users can delete tasks by selecting `Delete` button.**
5. **When users select `Add new task` option, a new task is added with a default name.**
6. **Users can edit board name and optionally, users can edit board description as well.**
7. **When users first visit the app, a new board with a unique id is created and saved to the database or alternatively a board is created after users make the first change.**
8. **Each board can be accessed by a unique id, e.g: /board/:board-id.**
9. **Deploy the solution and submit Repository URL and Demo URL.**

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Live Demo

Check out the live demo of the application [here](https://my-task-board-2li6.onrender.com/).

## Repository

You can find the repository for this project [here](https://github.com/xGeekoo/my-task-board). The main branch is `main` and the production branch is `prod`.
