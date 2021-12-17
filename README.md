# 2021-aug-stock-api

This is a Node API using Express with a MySQL database and Jest for testing.

##### Prerequisites:

You must have Node installed on your machine.

You must have a MySQL database named `blackMarket` and tables named `products`, `orders`, `customers`, and `customers-orders`.

The 'products' table must follow this structure:
```
'id': `int`
'productName': `varchar(50)`
'price': `decimal(13,2)`
'stockQuantity': `smallint(65,535)`
'sku': `varchar(10)`
```

The 'orders' table must follow this structure:
```
'id': `int`
'orderId': `varchar(30)`
'productSku': `varchar(30)`
'productQuantity': `smallint(65,535)`
'orderStatus': `enum('Pending', 'Completed', 'Cancelled')`
```

'customers' table must follow this structure:
```
'id': `int`
'customerEmail': `varchar(255)`
'customerId': `varchar(30)`
```

'customers-orders' table must follow this structure:
```
'id': `int`
'customerId': `varchar(30)`
'orderId': `varchar(30)`
'shippingAddress': `varchar(255)`
'shippingPostcode': `varchar(10)`
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
            { 'id': 1, 'productName': 'Nuclear Warhead', 'price': 1000000000.00, 'stockQuantity': 50, 'sku': 'NUC-1' },
            { 'id': 2, 'productName': 'Druggy Bag Surprise', 'price': 1000.00, 'stockQuantity': 50, 'sku': 'DRU-2' },
            { 'id': 3, 'productName': 'Liver - Human', 'price': 550000, 'stockQuantity': 50, 'sku': 'LIV-3' }
        ]
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

#### Retrieve Single Product
Returns JSON data for one product in DB

- ##### URL
  '/products/:sku'

- ##### Method
  `GET`

- ##### URL Params
  ##### Required:
- 'sku': Stock Keeping Unit - unique ID for the product.

- ##### Data Params
  None

- ##### Success Response
  ```
  {
  'success': true,
  'message': 'successfully retrieved product data',
  'status': 200,
  data: [
            { 'id': 1, 'productName': 'Nuclear Warhead', 'price': 1000000000.00, 'stockQuantity': 50, 'sku': 'NUC-1', 'deleted': 0}
        ]
  }
   ``` 
  
- ##### Error Response
  ```
  {
  'success': false,
  'message': 'error: SKU not found in database - no product retrieved',
  'status': 404,
  'data': []
  }
  ```
  OR
  ```
  {
  'success': false,
  'message': 'error: invalid SKU - no product retrieved from database',
  'status': 400,
  'data': []
  }
  ```
- ##### Sample Call
  ```
    fetch('/products/') 
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
  - 'productName': The name of product (maximum string of 50 characters)
  - 'price': Price of product in £ (maximum float of (13,2) digits)
  - 'stockQuantity': Available stock in units (MySQL smallint: maximum value of 65,535)
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
  
  - 'productName': The name of product (maximum string of 50 characters)
  - 'price': Price of product in £ (maximum float of (13,2) digits)
  - 'stockQuantity': Available stock in units (MySQL smallint: maximum value of 65,535)
  
  - ##### Required fields:
  - 'sku': Stock Keeping Unit - unique ID for the product. Should follow company guidelines e.g. `NUC-BATS91RD6KX7REHS5`
  
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
  e.g. `{ 'sku': 'NUC-BATS91RD6KX7REHS5' }`
  
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

### Orders

#### Retrieve All Orders
Returns JSON data on all orders in DB

- ##### URL
  '/orders'

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
  'message': 'successfully retrieved all order data',
  'status': 200,
  data: [
            { 'id': 1, 'orderNumber': 'ORD-N6K6O1GIBKX97WKGE', 'customerEmail': 'bob@bob.com', 'productsOrdered': [
  'NUC-BATS91RD6KX7REHS5', 'DRU-BATS91RD6KX7RFFJF'], 'shippingAddress': '8 lynfield road' },
        ]
  }
   ``` 

- ##### Sample Call
  ```
    fetch('/orders') 
    .then((data)=> data.json)
    .then((data)=> {
        console.log(data)
    })
    ```

#### Add An Order

- ##### URL
  '/orders'

- ##### Method
  `POST`

- ##### URL Params
  ##### Required:
  None

- ##### Data Params
  e.g. `{"orderData": {
  "customerEmail": "bob@bob.com",
  "shippingData": {"shippingAddress": "sfkjsdhv", "shippingPostcode": "sahjdsjkhd"},
  "productData": [
  {
  "productSku": "NUC-BATS91RD6KX7REHS5",
  "productQuantity": 10
  },
  {
  "productSku": "DRU-BATS91RD6KX7RFFJF",
  "productQuantity": 15
  },
  {
  "productSku": "LIV-BATS91RD6KX7RFNI3",
  "productQuantity": 3
  }
  ]
  }
  }`

  ##### Required fields:
  - 'customerEmail': string, maximum 255 characters
  - 'shippingAddress': string, maximum 255 characters 
  - 'shippingPostcode': string, maximum 10 characters
  - 'productData': [{'productSku': string, maximum 30 characters, 'productQuantity': smallint}]

- ##### Success Response
  ```
  {
  'success': true,
  'message': 'Successfully added order',
  'status': 200,
  'data': []
  }
   ``` 

- ##### Error Response
  ```
  {
  'success': false,
  'message': 'error: Invalid SKU - The following SKU(s) are invalid: 'sfdfd-fdfdf', dfgdsfgdfg-dfssdf'
  'status': 400,
  'data': []
  }
  ```
  OR
  ```
  {
  'success': false,
  'message': 'SKU not found - The following SKU(s) were not found in the database: 'ORD-N6K6O1GIBKX97WKGD' 'ORD-N6K6O1GIBKX97WKJE',
  'status': 400,
  'data': []
  }
  ```
  OR
    ```
  {
  'success': false,
  'message': 'Error: Stock too low - The following product SKU(s) must have their requested quantity reduced: 'ORD-N6K6O1GIBKX97WKGE',
  'status': 400,
  'data': []
  }
  ```

- ##### Sample Call
```
  fetch('/orders', 
    {
      method: 'POST',
      body: JSON.stringify(newOrderObj),
      headers: {
        "Content-Type": "application/json"
    }
  })
  .then((data)=> data.json)
  .then((data)=> {
      console.log(data)
  })
  ```