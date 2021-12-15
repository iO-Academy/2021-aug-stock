# 2021-aug-stock-api

This is a Node API using Express with a MySQL database and Jest for testing.

##### Prerequisites:

You must have Node installed on your machine.

You must have a MySQL database named `blackMarket` and a table named `products`.

The 'products' table must follow this structure:
```
'id': `int`
'product-name': `varchar(50)`
'price': `decimal(13,2)`
'stock-quantity': `smallint(65,535)`
'sku': `varchar(10)`
```
A pre-built database is readily available in this repo to use if preferred.

##### Get the API running:

- Clone this repo.
- Run `npm install` in the terminal from the root of the project.
- Run `nodemon start.js` in the terminal from the root of the project.
- The API should now be running on `localhost:1337`.
- Use any of the routes detailed below to test and use the API. The Postman App is very useful for experimenting with API endpoints.

##### Running the Tests

Run `npm run test` from the root of the directory.


## Routes

### Products

#### Retrieve All Products
Returns JSON data on all products in DB

- ##### URL
  '/products'

- ##### Method
  `GET`

- ##### URL Params
  ##### Required:
  None

- ##### Data Params
  None

- ##### Success Response
  ```
  {
  'success': true,
  'message': 'successfully retrieved all product data',
  'status': 200,
  data: [
            { 'id': 1, 'product-name': 'Nuclear Warhead', 'price': 1000000000.00, 'stock-quantity': 50, 'sku': 'NUC-1' },
            { 'id': 2, 'product-name': 'Druggy Bag Surprise', 'price': 1000.00, 'stock-quantity': 50, 'sku': 'DRU-2' },
            { 'id': 3, 'product-name': 'Liver - Human', 'price': 550000, 'stock-quantity': 50, 'sku': 'LIV-3' }
        ]
  }
   ``` 
  
- ##### Error Response
  ```
  {
  'success': false,
  'message': 'error: can't connect to database',
  'status': 404,
  'data': []
  }
  ```
  OR
  ```
  {
  'success': false,
  'message': 'error: no data to retrieve from database',
  'status': 204,
  'data': []
  }
  ```
- ##### Sample Call
  ```
    fetch('/products') 
    .then((data)=> data.json)
    .then((data)=> {
        console.log(data)
    })
    ```

#### Add A Product

- ##### URL
  '/products'

- ##### Method
  `POST`

- ##### URL Params
  ##### Required:
  None

- ##### Data Params
  e.g. `{ 'productName': 'Nuclear Warhead', 'price': 1000000000.00, 'stockQuantity': 50, 'sku': 'NUC-1' }`
  
  ##### Required fields:
  - 'product-name': The name of product (maximum string of 50 characters)
  - 'price': Price of product in £ (maximum float of (13,2) digits)
  - 'stock-quantity': Available stock in units (MySQL smallint: maximum value of 65,535)
  - 'sku': Stock Keeping Unit - unique ID for the product. Should follow company guidelines e.g. `NUC-1`

- ##### Success Response
  ```
  {
  'success': true,
  'message': 'successfully added product data to database',
  'status': 200,
  'data': []
  }
   ``` 
  
- ##### Error Response
  ```
  {
  'success': false,
  'message': 'error: can't connect to database - no product added to database',
  'status': 404,
  'data': []
  }
  ```
  OR
  ```
  {
  'success': false,
  'message': 'error: invalid input - no product added to database',
  'status': 400,
  'data': []
  }
  ```

- ##### Sample Call
```
  fetch('/products', 
    {
      method: 'POST',
      body: JSON.stringify(newProductObj),
      headers: {
        "Content-Type": "application/json"
    }
  })
  .then((data)=> data.json)
  .then((data)=> {
      console.log(data)
  })
  ```
  
  #### Edit A Product
  
- ##### URL
  '/products'
  
- ##### Method
  `PUT`
  
- ##### URL Params
  ##### Required:
  None
  
- ##### Data Params
  ##### Editing 1 field:
  e.g. `{ 'sku': 'NUC-1', 'productName': 'Nuclear Warhead - Pimped Out' }`
  ##### Editing multiple fields:
  e.g. `{ 'sku': 'NUC-1', 'productName': 'Nuclear Warhead - Pimped Out', 'price': 2000000000, 'stockQuantity': 100 }`
  
  - 'product-name': The name of product (maximum string of 50 characters)
  - 'price': Price of product in £ (maximum float of (13,2) digits)
  - 'stock-quantity': Available stock in units (MySQL smallint: maximum value of 65,535)
  ##### Required fields:
  - 'sku': Stock Keeping Unit - unique ID for the product. Should follow company guidelines e.g. `NUC-1`
  
- ##### Success Response
  ```
  {
  'success': true,
  'message': 'successfully edited product data in database',
  'status': 200,
  'data': []
  }
   ``` 
  
- ##### Error Response
  ```
  {
  'success': false,
  'message': 'error: can't connect to database - no product edited in database',
  'status': 404,
  'data': []
  }
  ```
  OR
  ```
  {
  'success': false,
  'message': 'error: invalid input - no product edited in database',
  'status': 400,
  'data': []
  }
  ```
  
- ##### Sample Call
  ```
  fetch('/products',
    {
      method: 'PUT',
      body: JSON.stringify(newProductObj),
      headers: {
        "Content-Type": "application/json"
    }
  })
  .then((data)=> data.json)
  .then((data)=> {
      console.log(data)
  })
  ```
  
#### Delete A Product
  
- ##### URL
  '/products'
  
- ##### Method
  `DELETE`
  
- ##### URL Params
  ##### Required:
  None
  
- ##### Data Params
  e.g. `{ 'sku': 'DRU-2' }`
  
- ##### Success Response
  ```
  {
  'success': true,
  'message': 'successfully deleted product in database',
  'status': 200,
  'data': []
  }
   ``` 
  
- ##### Error Response
  ```
  {
  'success': false,
  'message': 'error: can't connect to database - no product deleted in database',
  'status': 404,
  'data': []
  }
  ```
  OR
  ```
  {
  'success': false,
  'message': 'error: invalid SKU - no product deleted in database',
  'status': 400,
  'data': []
  }
  ```
  
- ##### Sample Call
  ```
  fetch('/products',
    {
      method: 'DELETE',
      body: JSON.stringify(newProductObj),
      headers: {
        "Content-Type": "application/json"
    }
  })
  .then((data)=> data.json)
  .then((data)=> {
      console.log(data)
  })
  ```
