# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create [token required]: '/products' [POST]
- [OPTIONAL] Top 5 most popular products: '/products-most-popular' [GET]
- [OPTIONAL] Products by category (args: product category): '/products-by-category' [GET]

#### Users
- Index [token required]: '/users' [GET]
- Show [token required]: '/users/:id' [GET]
- Create N[token required]: '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]: 'users/:id/current-order' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: 'users/:id completed-orders' [GET]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Tables

#### Products
  products(id varchar, name varchar, price int, category varchar)

#### User
  users(id varchar, firstname varchar, lastname varchar, password varchar)


#### Orders
  orders(id varchar, status varchar, user_id varchar [foreign key from users table])

#### Order_Products
  order_products(order_id varchar [foreign key from orders table], product_id varchar [foreign key from products table] , quantity int)