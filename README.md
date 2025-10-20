<img width="1200" height="630" alt="book" src="https://github.com/user-attachments/assets/2baadf51-478d-4df2-9bea-ac9a0e46d1f6" />


## Features

- **CRUD Operations**: Create, read, update, and delete books
- **Book Management**: Track book details including title, author, genre, published year, and availability
- **Duplicate Prevention**: Prevents creation of duplicate books based on title and author
- **TypeScript**: Full TypeScript support with type safety
- **MongoDB Integration**: Uses Mongoose for database operations
- **RESTful Design**: Follows REST API conventions

## API Endpoints

### Books

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| GET    | `/api/v1/books`     | Get all books             |
| GET    | `/api/v1/books/:id` | Get a specific book by ID |
| POST   | `/api/v1/books`     | Create a new book         |
| PUT    | `/api/v1/books/:id` | Update a book by ID       |
| DELETE | `/api/v1/books/:id` | Delete a book by ID       |

### Book Schema

```typescript
{
  title: string (required)
  author: string (required)
  genre?: string
  publishedYear: number (required)
  isAvailable: boolean (default: true)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Book-API
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and configure your environment variables:

```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string and other configuration.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=YOUR_DB_CONNECTION_STRING
```

## Usage

### Development

Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

### Production

Build the TypeScript code:

```bash
npm run build
```

Start the production server:

```bash
node dist/server.js
```

## API Examples

### Create a Book

```bash
curl -X POST http://localhost:5000/api/v1/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedYear": 1925,
    "isAvailable": true
  }'
```

### Get All Books

```bash
curl http://localhost:5000/api/v1/books
```

### Get a Specific Book

```bash
curl http://localhost:5000/api/v1/books/{book-id}
```

### Update a Book

```bash
curl -X PUT http://localhost:5000/api/v1/books/{book-id} \
  -H "Content-Type: application/json" \
  -d '{
    "isAvailable": false
  }'
```

### Delete a Book

```bash
curl -X DELETE http://localhost:5000/api/v1/books/{book-id}
```

## Response Format

All API responses follow this format:

```json
{
  "message": "Success message",
  "data": {
    /* response data */
  }
}
```

Error responses:

```json
{
  "message": "Error message"
}
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Development**: tsx (TypeScript execution)
- **Linting**: ESLint
- **Formatting**: Prettier

## Project Structure

```
Book-API/
├── models/
│   └── book.ts          # Book model and schema
├── routes/
│   └── books-router.ts  # Book routes and handlers
├── server.ts            # Main server file
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── eslint.config.js     # ESLint configuration
└── .env.example         # Environment variables template
```

## Error Handling

The API includes comprehensive error handling for:

- Invalid MongoDB ObjectIds
- Duplicate book creation
- Missing required fields
- Database connection issues
- Book not found scenarios

## Future Enhancements

- Authentication and authorization
- Pagination for book listings
- Search and filtering capabilities
- Book categories/tags
- User favorites and ratings
- API rate limiting
- Input validation middleware
- API documentation with Swagger
