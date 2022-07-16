# <E-commerce Back-end>

## Description

This project uses MySQL to source and seed a database for products with tag ids and categories. The relationships are built in the models and the routes are build to find, add, update, and delete products through route-checks. 

Learned to focus on the development of async functions to queue stacks. Focused on models and routes through MySQL. 

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

> create .env file with
>> DB_USER='<username>'
>>> DB_PW='<password>'
>>>> DB_NAME='ecommerce_db'

> npm install

> mysql -u <username> -p

> input password

> source ./db/schema.sql

> npm run seed

> npm start

> Use Insomnia or Postman to check routes

    http://localhost:3001/api/categories
    http://localhost:3001/api/tags
    http://localhost:3001/api/products

## Usage

    ```md
    ![screenshot](assets/images/screenshot.png)
    ```

## License

[MIT](https://opensource.org/licenses/MIT) LICENSE

Copyright © 2022 Trent Dickson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Contact

GitHub: https://github.com/tdickson96 

LinkedIn: https://www.linkedin.com/in/tad96/