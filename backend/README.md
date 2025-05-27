## Description

RESTful API using Node.js + Express + MySQL. CRUD-operations for students, courses and enrollments.

## Tech Stack

- Node.js
- Express.js
- MySQL
- Swagger (docs)
- Docker (optional)

## Database Schema
View the schema on dbdiagram.io https://dbdiagram.io/d/Students-Courses-68189e101ca52373f57d9095

## Getting Started

1. Clone repo:
```bash
git clone https://github.com/Kiril-Lyutyy/hillel-hw-monorepo.git
cd hw-31-mysql-student-courses-readme-docs
```

2. Create .env in the root folder:
```bash
MYSQL_HOST=db
MYSQL_DATABASE=online_courses
MYSQL_USER=admin
MYSQL_PASSWORD=admin
MYSQL_PORT=3306
MYSQL_PORT_EXPOSE=3307
PORT=5000
```
3. Run the project:
```bash
docker-compose up --build
```

## Project Structure
```bash
src/
├── init/
├── controllers/
├── routes/
├── models/
├── app.js
├── server.js
└── db.js
```
## API Documentation

Available at: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
(Generated with Swagger)

### 9. 📄 Licence

```md
## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/feature-name`
5. Create a pull request

## Author

- Kyrylo Liutyi — [LinkedIn](https://www.linkedin.com/in/kyrylo-liutyi-262231161/) — [GitHub](https://github.com/Kiril-  )