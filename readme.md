# Mini Message Board

## Overview

Mini Message Board is a simple web application that allows users to create, read, update, and delete messages. It is built using Node.js, Express, and EJS for templating.

## Features

- User-friendly interface for managing messages.
- Create new messages.
- View a list of all messages.
- Update existing messages.
- Delete messages.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **EJS**: Templating engine for rendering HTML.
- **PostgreSQL**: Database for storing messages.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/miniMessageBoard.git
   cd miniMessageBoard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Create a PostgreSQL database and configure the connection in `db/pool.js`.
   - Run the database population script:
   ```bash
   node db/populatedb.js
   ```
4. Start the application:
   ```bash
   npm start
   ```

## Usage

- Navigate to `http://localhost:3000` or what port you picked in your web browser to access the application.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by The Odin Project.
- Thanks to the open-source community for their contributions.
