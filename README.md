## Description

Admin Blog — RESTful API using Node.js + Express + MySQL.

Features token-based authentication (JWT + refresh token)

Implements role-based access control (RBAC) with admin, editor, and viewer roles

Provides full CRUD operations for users and posts

## Tech Stack

BE:
- Node.js
- Express.js
- MySQL
- Swagger (docs)
- Docker (optional)

FE:
- React
- Docker (optional)

## Database Schema
View the schema on dbdiagram.io https://dbdiagram.io/d/683dfb2f61dc3bf08d344bb4

## Getting Started

1. Clone repo:
```bash
git clone https://github.com/Kiril-Lyutyy/blog-admin.git
```

2. Create .env in the root folder:
```bash
MYSQL_HOST=db
MYSQL_DATABASE=admin_blog
MYSQL_USER=admin
MYSQL_PASSWORD=admin
MYSQL_PORT=3306
MYSQL_PORT_EXPOSE=3307
VITE_API_URL=http://localhost:5000
PORT=5000
```
3. Run the project (with hot reload):
```bash
docker compose up --watch db backend frontend
```
The app UI should be available on http://localhost:3000

4. Run tests (db docker container should be running)
```bash
docker compose run api-test
```
Current test coverage is 80%.

## Project Structure
```bash
backend/
├── init/
├── src/
├──── config/
├──── constants/
├──── controllers/
├──── middleware/
├──── models/
├──── routes/
├──── utils/
├──── app.js
├──── server.js
├──── swagger.js
├── tests/
├──── e2e/
├──── integration/
├──── unit/
├──── utils/
├── package.json
├── .dockerignore
├── .gitignore
├── .prettierrc
├── Dockerfile
├── jest.config
frontend/
├── src/
├──── api/
├──── components/
├──── constants/
├──── context/
├──── hooks/
├──── pages/
├──── routes/
├──── theme/
├──── utils/
├──── App.jsx
├──── main.jsx
├── package.json
├── .dockerignore
├── .gitignore
├── .prettierrc
├── Dockerfile
├── jest.config
.editorconfig
.gitignore
commitlint.config.cjs
docker-compose.yml
package.json
README.md
eslint.config.js
```
## Login to the App with predefined users
Admin
email: 'admin@example.com'
password: 'admin123',

Editor
email: 'editor@example.com'
password: 'admin123',

Viewer
email: 'viewer@example.com'
password: 'admin123',

## API Documentation

Available at: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
(Generated with Swagger)

### 📄 Licence

```md
## License
```

This project is licensed under the MIT License.

## Contributing

Use the command below instead of git commit:

```bash
npm run commit
```
This will guide you through a structured commit format and automatically format your code with Prettier and run ESLint checks.

1. Fork the repository
2. Create your branch: `git checkout -b feature/feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/feature-name`
5. Create a pull request

## Author

- Kyrylo Liutyi — [LinkedIn](https://www.linkedin.com/in/kyrylo-liutyi-262231161/) — [GitHub](https://github.com/Kiril-Lyutyy)