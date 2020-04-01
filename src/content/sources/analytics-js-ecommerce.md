---
collectionKey: sources

navText: Analytics.js Ecommerce Spec

path: '/sources/analytics-js-ecommerce-spec/'

tags: [sources]
---

# Analytics.js Ecommerce Spec

MetaRouter’s ecommerce spec helps define the journey for a customer as they browse your store, click on promotions, view products, add those products to a cart, and complete a purchase.
**Note:** Not all destinations support every event listed here. Please refer to individual destination docs for more information on supported events and properties.

## Event Lifecycles

Here is a list of supported events for our various categories within the customer journey.

### Browsing Overview

| Action                | Description                              |
| --------------------- | ---------------------------------------- |
| Products Searched     | User searched for products               |
| Product List Viewed   | User viewed a product list or category   |
| Product List Filtered | User filtered a product list or category |

### Promotions Overview

| Action            | Description               |
| ----------------- | ------------------------- |
| Promotion Viewed  | User viewed promotion     |
| Promotion Clicked | User clicked on promotion |

### Core Ordering Overview

| Action                  | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| Product Clicked         | User clicked on a product                                   |
| Product Viewed          | User viewed a product details                               |
| Product Added           | User added a product to their shopping cart                 |
| Product Removed         | User removed a product from their shopping cart             |
| Cart Viewed             | User viewed their shopping cart                             |
| Checkout Started        | User initiated the order process (a transaction is created) |
| Checkout Step Viewed    | User viewed a checkout step                                 |
| Checkout Step Completed | User completed a checkout step                              |
| Payment Info Entered    | User added payment information                              |
| Order Completed         | User completed the order                                    |
| Order Updated           | User updated the order                                      |
| Order Refunded          | User refunded the order                                     |
| Order Cancelled         | User cancelled the order                                    |

### Coupons Overview

| Action         | Description                                            |
| -------------- | ------------------------------------------------------ |
| Coupon Entered | User entered a coupon on a shopping cart or order      |
| Coupon Applied | Coupon was applied on a user’s shopping cart or order  |
| Coupon Denied  | Coupon was denied from a user’s shopping cart or order |
| Coupon Removed | User removed a coupon from a cart or order             |

### Wishlisting Overview

| Action                         | Description                               |
| ------------------------------ | ----------------------------------------- |
| Product Added to Wishlist      | User added a product to the wish list     |
| Product Removed from Wishlist  | User removed a product from the wish list |
| Wishlist Product Added to Cart | User added a wishlist product to the cart |

### Sharing Overview

| Action         | Description                               |
| -------------- | ----------------------------------------- |
| Product Shared | Shared a product with one or more friends |
| Cart Shared    | Shared the cart with one or more friends  |

### Reviewing Overview

| Action           | Description             |
| ---------------- | ----------------------- |
| Product Reviewed | User reviewed a product |

The following section lists more detail for each lifecycle event as well as an example API call.

## Browsing

Browsing lifecycle events represent key events that a customer might have while browsing your apps.

### Products Searched

Fire this event when a visitor searches for products.
This event supports the following semantic properties:

| Property | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| [30]     | [30]   | [40]                         |
| query    | String | Query the user searched with |

Example:

```javascript
analytics.track('Products Searched', {
  query: 'blue hotpants',
})
```

### Product List Viewed

Fire this event when a visitor views a product list or category.
This event supports the following semantic properties:

| Property               | Type   | Description                                             |
| ---------------------- | ------ | ------------------------------------------------------- |
| [30]                   | [30]   | [40]                                                    |
| list_id                | String | Product list being viewed                               |
| category               | String | Product category being viewed                           |
| products               | Array  | Products displayed in the product list                  |
| products.{}.product_id | String | Product id displayed on the list                        |
| products.{}.sku        | String | Sku of the product being viewed                         |
| products.{}.category   | String | Product category being viewed                           |
| products.{}.name       | String | Name of the product being viewed                        |
| products.{}.brand      | String | Brand associated with the product                       |
| products.{}.variant    | String | Variant of the product (e.g. Black)                     |
| products.{}.price      | Number | Price (\$) of the product being viewed                  |
| products.{}.quantity   | Number | Quantity of a product                                   |
| products.{}.coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3) |
| products.{}.position   | Number | Position in the product list (ex. 3)                    |
| products.{}.url        | String | URL of the product page                                 |
| products.{}.image_url  | String | Image url of the product                                |

Example:

```javascript
analytics.track('Product List Viewed', {
  list_id: 'hot_deals_1',
  category: 'Deals',
  products: [
    {
      product_id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      position: 1,
      category: 'Games',
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg',
    },
    {
      product_id: '505bd76785ebb509fc183733',
      sku: '46493-32',
      name: 'Uno Card Game',
      price: 3,
      position: 2,
      category: 'Games',
    },
  ],
})
```

**Note:** the `Product List Viewed` event is aliased to the `Viewed Product Category` event (from e-commerce v1 spec).

### Product List Filtered

Fire this event when a visitor filters a product list or category.
This event supports the following semantic properties:

| Property               | Type   | Description                                                                |
| ---------------------- | ------ | -------------------------------------------------------------------------- |
| [30]                   | [30]   | [40]                                                                       |
| list_id                | String | Product list being viewed                                                  |
| category               | String | Product category being viewed                                              |
| filters                | Array  | Product filters that the customer is using                                 |
| filters.{}.type        | String | Id of the filter type that the customer is using                           |
| filters.{}.value       | String | Id of the selection that the customer chose                                |
| sorts                  | Array  | Product sorting that the customer is using                                 |
| sorts.{}.type          | String | Id of the sort type that the customer is using                             |
| sorts.{}.value         | String | Id of the selection type the the customer is using (ascending, descending) |
| products               | Array  | Products displayed in the product list                                     |
| products.{}.product_id | String | Product id displayed on the list                                           |
| products.{}.sku        | String | Sku of the product being viewed                                            |
| products.{}.category   | String | Product category being viewed                                              |
| products.{}.name       | String | Name of the product being viewed                                           |
| products.{}.brand      | String | Brand associated with the product                                          |
| products.{}.variant    | String | Variant of the product (e.g. Black)                                        |
| products.{}.price      | Number | Price (\$) of the product being viewed                                     |
| products.{}.quantity   | Number | Quantity of a product                                                      |
| products.{}.coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3)                    |
| products.{}.position   | Number | Position in the product list (ex. 3)                                       |
| products.{}.url        | String | URL of the product page                                                    |
| products.{}.image_url  | String | Image url of the product                                                   |

Example:

```javascript
analytics.track('Product List Filtered', {
  list_id: 'todays_deals_may_11_2016',
  filters: [
    {
      type: 'department',
      value: 'beauty',
    },
    {
      type: 'price',
      value: 'under-$25',
    },
  ],
  sorts: [
    {
      type: 'price',
      value: 'desc',
    },
  ],
  products: [
    {
      product_id: '507f1f77bcf86cd798439011',
      sku: '45360-32',
      name: 'Dove Facial Powder',
      price: 12.6,
      position: 1,
      category: 'Beauty',
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg',
    },
    {
      product_id: '505bd76785ebb509fc283733',
      sku: '46573-32',
      name: 'Artin Hairbrush',
      price: 7.6,
      position: 2,
      category: 'Beauty',
    },
  ],
})
```

## Promotions

Promotion view/click events help you gather analytics on internal offers within your web or mobile app. For example, when a banner advertisement is shown in your web or app’s home page, you can fire a `Viewed Promotion` event. If the user proceeds to click the advertisement, fire the `Clicked Promotion` event.

### Promotion Viewed

Fire this event when a user views a promotion.
This event supports the following semantic properties:

| Property     | Type   | Description          | Example                  |
| ------------ | ------ | -------------------- | ------------------------ |
| promotion_id | String | promotion’s ID       | promo_1                  |
| creative     | String | Promotion’s creative | top_banner_2             |
| name         | String | Promotion’s name     | 75% store-wide shoe sale |
| position     | String | Promotion’s position | home_banner_top          |

Example:

```javascript
analytics.track('Promotion Viewed', {
  promotion_id: 'promo_1',
  creative: 'top_banner_2',
  name: '75% store-wide shoe sale',
  position: 'home_banner_top',
})
```

**Note:** the `Promotion Viewed` event is aliased to the `Viewed Promotion` event for Google Analytics

### Promotion Clicked

Fire this event when a visitor clicks an internal offer promotion.
This event supports the following semantic properties:

| Property     | Type   | Description          | Example                  |
| ------------ | ------ | -------------------- | ------------------------ |
| promotion_id | String | promotion’s ID       | promo_1                  |
| creative     | String | Promotion’s creative | top_banner_2             |
| name         | String | Promotion’s name     | 75% store-wide shoe sale |
| position     | String | Promotion’s position | home_banner_top          |

Example:

```javascript
analytics.track('Promotion Clicked', {
  promotion_id: 'promo_1',
  creative: 'top_banner_2',
  name: '75% store-wide shoe sale',
  position: 'home_banner_top',
})
```

**Note:** the `Promotion Clicked` event is aliased to the `Clicked Promotion` event for Google Analytics

## Core Ordering

These events represent the customer journey in regards to product ordering.

### Product Clicked

Fire this event when a visitor clicks a product.
This event supports the following semantic properties:

| Property   | Type   | Description                                             |
| ---------- | ------ | ------------------------------------------------------- |
| product_id | String | Database id of the product being viewed                 |
| sku        | String | Sku of the product being viewed                         |
| category   | String | Product category being viewed                           |
| name       | String | Name of the product being viewed                        |
| brand      | String | Brand associated with the product                       |
| variant    | String | Variant of the product (e.g. Black)                     |
| price      | Number | Price of the product being viewed                       |
| quantity   | Number | Quantity of a product                                   |
| coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3) |
| position   | Number | Position in the product list (ex. 3)                    |
| url        | String | URL of the product page                                 |
| image_url  | String | Image url of the product                                |

Example:

```javascript
analytics.track('Product Clicked', {
  product_id: '507f1f77bcf86cd799439011',
  sku: 'G-32',
  category: 'Games',
  name: 'Monopoly: 3rd Edition',
  brand: 'Hasbro',
  variant: '200 pieces',
  price: 18.99,
  quantity: 1,
  coupon: 'MAYDEALS',
  position: 3,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Product Viewed

Fire this event when a visitor views a product. That view might happen on a page, screen, or preview modal.
This event supports the following semantic properties:

| Property   | Type   | Description                                             |
| ---------- | ------ | ------------------------------------------------------- |
| product_id | String | Database id of the product being viewed                 |
| sku        | String | Sku of the product being viewed                         |
| category   | String | Product category being viewed                           |
| name       | String | Name of the product being viewed                        |
| brand      | String | Brand associated with the product                       |
| variant    | String | Variant of the product (e.g. Black)                     |
| price      | Number | Price (\$) of the product being viewed                  |
| quantity   | Number | Quantity of a product                                   |
| coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3) |
| currency   | String | Currency of the transaction                             |
| position   | Number | Position in the product list (ex. 3)                    |
| value      | Number | Total value of the product after quantity               |
| url        | String | URL of the product page                                 |
| image_url  | String | Image url of the product                                |

Example:

```javascript
analytics.track('Product Viewed', {
  product_id: '507f1f77bcf86cd799439011',
  sku: 'G-32',
  category: 'Games',
  name: 'Monopoly: 3rd Edition',
  brand: 'Hasbro',
  variant: '200 pieces',
  price: 18.99,
  quantity: 1,
  coupon: 'MAYDEALS',
  currency: 'usd',
  position: 3,
  value: 18.99,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Product Added

Fire this event when a visitor adds a product to their shopping cart.
This event supports the following semantic properties:

| Property   | Type   | Description                                             |
| ---------- | ------ | ------------------------------------------------------- |
| cart_id    | String | Cart ID to which the product was added to               |
| product_id | String | Database id of the product being viewed                 |
| sku        | String | Sku of the product being viewed                         |
| category   | String | Product category being viewed                           |
| name       | String | Name of the product being viewed                        |
| brand      | String | Brand associated with the product                       |
| variant    | String | Variant of the product (e.g. Black)                     |
| price      | Number | Price (\$) of the product being viewed                  |
| quantity   | Number | Quantity of a product                                   |
| coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3) |
| position   | Number | Position in the product list (ex. 3)                    |
| url        | String | URL of the product page                                 |
| image_url  | String | Image url of the product                                |

Example:

```javascript
analytics.track('Product Added', {
  cart_id: 'skdjsidjsdkdj29j',
  product_id: '507f1f77bcf86cd799439011',
  sku: 'G-32',
  category: 'Games',
  name: 'Monopoly: 3rd Edition',
  brand: 'Hasbro',
  variant: '200 pieces',
  price: 18.99,
  quantity: 1,
  coupon: 'MAYDEALS',
  position: 3,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Product Removed

Fire this event when a visitor removes a product from their shopping cart.
This event supports the following semantic properties:

| Property   | Type   | Description                                             |
| ---------- | ------ | ------------------------------------------------------- |
| cart_id    | String | Cart ID to which the product was removed from           |
| product_id | String | Database id of the product being viewed                 |
| sku        | String | Sku of the product being viewed                         |
| category   | String | Product category being viewed                           |
| name       | String | Name of the product being viewed                        |
| brand      | String | Brand associated with the product                       |
| variant    | String | Variant of the product (e.g. Black)                     |
| price      | Number | Price (\$) of the product being viewed                  |
| quantity   | Number | Quantity of a product                                   |
| coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3) |
| position   | Number | Position in the product list (ex. 3)                    |
| url        | String | URL of the product page                                 |
| image_url  | String | Image url of the product                                |

Example:

```javascript
analytics.track('Product Removed', {
  cart_id: 'ksjdj92dj29dj92d2j',
  product_id: '507f1f77bcf86cd799439011',
  sku: 'G-32',
  category: 'Games',
  name: 'Monopoly: 3rd Edition',
  brand: 'Hasbro',
  variant: '200 pieces',
  price: 18.99,
  quantity: 1,
  coupon: 'MAYDEALS',
  position: 3,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Cart Viewed

Fire this event when a visitor views a shopping cart.
This event supports the following semantic properties:

| Property               | Type   | Description                                             |
| ---------------------- | ------ | ------------------------------------------------------- |
| cart_id                | String | Shopping cart ID                                        |
| products               | Array  | Products displayed in the product list                  |
| products.{}.product_id | String | Product ID displayed on the list                        |
| products.{}.sku        | String | Sku of the product being viewed                         |
| products.{}.category   | String | Product category being viewed                           |
| products.{}.name       | String | Name of the product being viewed                        |
| products.{}.brand      | String | Brand associated with the product                       |
| products.{}.variant    | String | Variant of the product (e.g. Black)                     |
| products.{}.price      | Number | Price (\$) of the product being viewed                  |
| products.{}.quantity   | Number | Quantity of a product                                   |
| products.{}.coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3) |
| products.{}.position   | Number | Position in the product list (ex. 3)                    |
| products.{}.url        | String | URL of the product page                                 |
| products.{}.image_url  | String | Image url of the product                                |

Example:

```javascript
analytics.track('Cart Viewed', {
  cart_id: 'd92jd29jd92jd29j92d92jd',
  products: [
    {
      product_id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      position: 1,
      category: 'Games',
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg',
    },
    {
      product_id: '505bd76785ebb509fc183733',
      sku: '46493-32',
      name: 'Uno Card Game',
      price: 3,
      position: 2,
      category: 'Games',
    },
  ],
})
```

### Checkout Started

Fire this event whenever an order/transaction was started. Fire on the page that the customer lands on after they press the checkout button.
Be sure to **include all items in the cart as event properties**, with the same properties from the previous calls, like so:
This event supports the following semantic properties:

| Property               | Type   | Description                                                                                                                                                                        |
| ---------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id               | String | Order/transaction ID                                                                                                                                                               |
| affiliation            | String | Store or affiliation from which this transaction occurred (e.g. Google Store)                                                                                                      |
| value                  | Number | Revenue (\$) with discounts and coupons added in. For better flexibility and total control over tracking, we let you decide how to calculate how coupons and discounts are applied |
| revenue                | Number | Revenue (\$) associated with the transaction (excluding shipping and tax)                                                                                                          |
| shipping               | Number | Shipping cost associated with the transaction                                                                                                                                      |
| tax                    | Number | Total tax associated with the transaction                                                                                                                                          |
| discount               | Number | Total discount associated with the transaction                                                                                                                                     |
| coupon                 | String | Transaction coupon redeemed with the transaction                                                                                                                                   |
| currency               | String | [Currency code](https://support.google.com/analytics/answer/6205902#supported-currencies) associated with the transaction                                                          |
| products               | Array  | Products in the order                                                                                                                                                              |
| products.{}.product_id | String | Database id of the product being viewed                                                                                                                                            |
| products.{}.sku        | String | Sku of the product being viewed                                                                                                                                                    |
| products.{}.category   | String | Product category being viewed                                                                                                                                                      |
| products.{}.name       | String | Name of the product being viewed                                                                                                                                                   |
| products.{}.brand      | String | Brand associated with the product                                                                                                                                                  |
| products.{}.variant    | String | Variant of the product (e.g. Black)                                                                                                                                                |
| products.{}.price      | Number | Price (\$) of the product being viewed                                                                                                                                             |
| products.{}.quantity   | Number | Quantity of a product                                                                                                                                                              |
| products.{}.coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3)                                                                                                                            |
| products.{}.position   | Number | Position in the product list (ex. 3)                                                                                                                                               |
| products.{}.url        | String | URL of the product page                                                                                                                                                            |
| products.{}.image_url  | String | Image url of the product                                                                                                                                                           |

Example:

```javascript
analytics.track('Checkout Started', {
  order_id: '50314b8e9bcf000000000000',
  affiliation: 'Google Store',
  value: 30,
  revenue: 25.0,
  shipping: 3,
  tax: 2,
  discount: 2.5,
  coupon: 'hasbros',
  currency: 'USD',
  products: [
    {
      product_id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      quantity: 1,
      category: 'Games',
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg',
    },
    {
      product_id: '505bd76785ebb509fc183733',
      sku: '46493-32',
      name: 'Uno Card Game',
      price: 3,
      quantity: 2,
      category: 'Games',
    },
  ],
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Checkout Step Viewed

Fire this event whenever a checkout step is viewed.
This event supports the following semantic properties:

| Property        | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| checkout_id     | String | Checkout transaction ID                            |
| step            | Number | Number representing a step in the checkout process |
| shipping_method | String | String representing the shipping the method chosen |
| payment_method  | String | String representing the payment method chosen      |

Example:

```javascript
analytics.track('Checkout Step Viewed', {
  checkout_id: '50314b8e9bcf000000000000',
  step: 2,
  shipping_method: 'Fedex',
  payment_method: 'Visa',
})
```

**Note:** `shipping_method` and `payment_method` are semantic properties so if you want to send that information, please do so in this exact spelling!
You can have as many or as few steps in the checkout funnel as you’d like. Note that you’ll still need to track the `Order Completed` event per our standard [ecommerce tracking API](#order-completed) below after you’ve tracked the checkout steps.
**Note:** The `Checkout Step Viewed` event is aliased to the `Viewed Checkout Step` event for Google Analytics Enhanced Ecommerce destinations.

### Checkout Step Completed

Fire this event whenever a checkout step is completed.
This event supports the following semantic properties:

| Property        | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| checkout_id     | String | Checkout transaction ID                            |
| step            | Number | Number representing a step in the checkout process |
| shipping_method | String | String representing the shipping the method chosen |
| payment_method  | String | String representing the payment method chosen      |

Example:

```javascript
analytics.track('Checkout Step Completed', {
  checkout_id: '50314b8e9bcf000000000000',
  step: 2,
  shipping_method: 'Fedex',
  payment_method: 'Visa',
})
```

**Note:** `shipping_method` and `payment_method` are semantic properties so if you want to send that information, please do so in this exact spelling!
You can have as many or as few steps in the checkout funnel as you’d like. Note that you’ll still need to track the `Order Completed` event per our standard [ecommerce tracking API](#order-completed) below after you’ve tracked the checkout steps.
**Note:** The `Checkout Step Viewed` event is aliased to the `Viewed Checkout Step` event for Google Analytics Enhanced Ecommerce destinations.

### Payment Info Entered

Fire this event whenever payment information has been successfully entered.
This event supports the following semantic properties:

| Property        | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| checkout_id     | String | Checkout transaction ID                            |
| order_id        | String | Order ID (optional)                                |
| step            | Number | Number representing a step in the checkout process |
| shipping_method | String | String representing the shipping the method chosen |
| payment_method  | String | String representing the payment method chosen      |

Example:

```javascript
analytics.track('Payment Info Entered', {
  checkout_id: '39f39fj39f3jf93fj9fj39fj3f',
  order_id: 'dkfsjidfjsdifsdfksdjfkdsfjsdfkdsf',
})
```

**Note:** `shipping_method` and `payment_method` are semantic properties so if you want to send that information, please do so in this exact spelling!
You can have as many or as few steps in the checkout funnel as you’d like. Note that you’ll still need to track the `Order Completed` event per our standard [ecommerce tracking API](#order-completed) below after you’ve tracked the checkout steps.

### Order Updated

Fire this event whenever an order/transaction was updated.
Be sure to **include all items in the cart as event properties**, with the same properties from the previous calls, like so:
This event supports the following semantic properties:

| Property               | Type   | Description                                                                                                                                                                                                                                                                           |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id               | String | Order/transaction ID                                                                                                                                                                                                                                                                  |
| affiliation            | String | Store or affiliation from which this transaction occurred (e.g. Google Store)                                                                                                                                                                                                         |
| total                  | Number | Revenue (\$) with discounts and coupons added in. Note that our Google Analytics Ecommerce destination accepts `total` _or_ `revenue`, but not both. For better flexibility and total control over tracking, we let you decide how to calculate how coupons and discounts are applied |
| revenue                | Number | Revenue (\$) associated with the transaction (excluding shipping and tax)                                                                                                                                                                                                             |
| shipping               | Number | Shipping cost associated with the transaction                                                                                                                                                                                                                                         |
| tax                    | Number | Total tax associated with the transaction                                                                                                                                                                                                                                             |
| discount               | Number | Total discount associated with the transaction                                                                                                                                                                                                                                        |
| coupon                 | String | Transaction coupon redeemed with the transaction                                                                                                                                                                                                                                      |
| currency               | String | [Currency code](https://support.google.com/analytics/answer/6205902#supported-currencies) associated with the transaction                                                                                                                                                             |
| products               | Array  | Products in the order                                                                                                                                                                                                                                                                 |
| products.{}.product_id | String | Database id of the product being viewed                                                                                                                                                                                                                                               |
| products.{}.sku        | String | Sku of the product being viewed                                                                                                                                                                                                                                                       |
| products.{}.category   | String | Product category being viewed                                                                                                                                                                                                                                                         |
| products.{}.name       | String | Name of the product being viewed                                                                                                                                                                                                                                                      |
| products.{}.brand      | String | Brand associated with the product                                                                                                                                                                                                                                                     |
| products.{}.variant    | String | Variant of the product (e.g. Black)                                                                                                                                                                                                                                                   |
| products.{}.price      | Number | Price (\$) of the product being viewed                                                                                                                                                                                                                                                |
| products.{}.quantity   | Number | Quantity of a product                                                                                                                                                                                                                                                                 |
| products.{}.coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3)                                                                                                                                                                                                                               |
| products.{}.position   | Number | Position in the product list (ex. 3)                                                                                                                                                                                                                                                  |
| products.{}.url        | String | URL of the product page                                                                                                                                                                                                                                                               |
| products.{}.image_url  | String | Image url of the product                                                                                                                                                                                                                                                              |

Example:

```javascript
analytics.track('Order Updated', {
  order_id: '50314b8e9bcf000000000000',
  affiliation: 'Google Store',
  total: 27.5,
  revenue: 25.0,
  shipping: 3,
  tax: 2,
  discount: 2.5,
  coupon: 'hasbros',
  currency: 'USD',
  products: [
    {
      product_id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      quantity: 1,
      category: 'Games',
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg',
    },
    {
      product_id: '505bd76785ebb509fc183733',
      sku: '46493-32',
      name: 'Uno Card Game',
      price: 3,
      quantity: 2,
      category: 'Games',
    },
  ],
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

- The `Order Updated` event is aliased to the `Updated Order` event for Google Analytics Enhanced Ecommerce destinations.

### Order Completed

Fire this event whenever an order/transaction was successfully completed by the customer.
Be sure to **include all items in the cart as event properties**, with the same properties from the previous calls, like so:
This event supports the following semantic properties:

| Property               | Type   | Description                                                                                                                                                                                                                                                                           |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| checkout_id            | String | Checkout ID                                                                                                                                                                                                                                                                           |
| order_id               | String | Order/transaction ID                                                                                                                                                                                                                                                                  |
| affiliation            | String | Store or affiliation from which this transaction occurred (e.g. Google Store)                                                                                                                                                                                                         |
| total                  | Number | Revenue (\$) with discounts and coupons added in. Note that our Google Analytics Ecommerce destination accepts `total` _or_ `revenue`, but not both. For better flexibility and total control over tracking, we let you decide how to calculate how coupons and discounts are applied |
| revenue                | Number | Revenue (\$) associated with the transaction (excluding shipping and tax)                                                                                                                                                                                                             |
| shipping               | Number | Shipping cost associated with the transaction                                                                                                                                                                                                                                         |
| tax                    | Number | Total tax associated with the transaction                                                                                                                                                                                                                                             |
| discount               | Number | Total discount associated with the transaction                                                                                                                                                                                                                                        |
| coupon                 | String | Transaction coupon redeemed with the transaction                                                                                                                                                                                                                                      |
| currency               | String | [Currency code](https://support.google.com/analytics/answer/6205902#supported-currencies) associated with the transaction                                                                                                                                                             |
| products               | Array  | Products in the order                                                                                                                                                                                                                                                                 |
| products.{}.product_id | String | Database id of the product being viewed                                                                                                                                                                                                                                               |
| products.{}.sku        | String | Sku of the product being viewed                                                                                                                                                                                                                                                       |
| products.{}.category   | String | Product category being viewed                                                                                                                                                                                                                                                         |
| products.{}.name       | String | Name of the product being viewed                                                                                                                                                                                                                                                      |
| products.{}.brand      | String | Brand associated with the product                                                                                                                                                                                                                                                     |
| products.{}.variant    | String | Variant of the product (e.g. Black)                                                                                                                                                                                                                                                   |
| products.{}.price      | Number | Price (\$) of the product being viewed                                                                                                                                                                                                                                                |
| products.{}.quantity   | Number | Quantity of a product                                                                                                                                                                                                                                                                 |
| products.{}.coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3)                                                                                                                                                                                                                               |
| products.{}.position   | Number | Position in the product list (ex. 3)                                                                                                                                                                                                                                                  |
| products.{}.url        | String | URL of the product page                                                                                                                                                                                                                                                               |
| products.{}.image_url  | String | Image url of the product                                                                                                                                                                                                                                                              |

Example:

```javascript
analytics.track('Order Completed', {
  checkout_id: 'fksdjfsdjfisjf9sdfjsd9f',
  order_id: '50314b8e9bcf000000000000',
  affiliation: 'Google Store',
  total: 27.5,
  revenue: 25.0,
  shipping: 3,
  tax: 2,
  discount: 2.5,
  coupon: 'hasbros',
  currency: 'USD',
  products: [
    {
      product_id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      quantity: 1,
      category: 'Games',
      url: 'https://www.example.com/product/path',
      image_url: 'https:///www.example.com/product/path.jpg',
    },
    {
      product_id: '505bd76785ebb509fc183733',
      sku: '46493-32',
      name: 'Uno Card Game',
      price: 3,
      quantity: 2,
      category: 'Games',
    },
  ],
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Order Refunded

Fire this event whenever an order/transaction was refunded.
Be sure to **include all items in the cart as event properties**, with the same properties from the previous “Order Completed” call.
This event supports the following semantic properties:

| Property | Type   | Description          |
| -------- | ------ | -------------------- |
| order_id | String | Order/transaction ID |

Example:

```javascript
analytics.track('Order Refunded', {
  order_id: '50314b8e9bcf000000000000',
  total: 30,
  currency: 'USD',
  products: [
    {
      product_id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      quantity: 1,
      category: 'Games',
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg',
    },
    {
      product_id: '505bd76785ebb509fc183733',
      sku: '46493-32',
      name: 'Uno Card Game',
      price: 3,
      quantity: 2,
      category: 'Games',
    },
  ],
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Order Cancelled

Fire this event whenever an order/transaction was cancelled.
Be sure to **include all items in the cart as event properties**, with the same properties from the previous calls.
This event supports the following semantic properties:

| Property               | Type   | Description                                                                                                               |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| [30]                   | [30]   | [40]                                                                                                                      |
| order_id               | String | Order/transaction ID                                                                                                      |
| affiliation            | String | Store or affiliation from which this transaction occurred (e.g. Google Store)                                             |
| total                  | Number | Revenue (\$) with discounts and coupons added in.                                                                         |
| revenue                | Number | Revenue (\$) associated with the transaction (excluding shipping and tax)                                                 |
| shipping               | Number | Shipping cost associated with the transaction                                                                             |
| tax                    | Number | Total tax associated with the transaction                                                                                 |
| discount               | Number | Total discount associated with the transaction                                                                            |
| coupon                 | String | Transaction coupon redeemed with the transaction                                                                          |
| currency               | String | [Currency code](https://support.google.com/analytics/answer/6205902#supported-currencies) associated with the transaction |
| products               | Array  | Products in the order                                                                                                     |
| products.{}.product_id | String | Database id of the product being viewed                                                                                   |
| products.{}.sku        | String | Sku of the product being viewed                                                                                           |
| products.{}.category   | String | Product category being viewed                                                                                             |
| products.{}.name       | String | Name of the product being viewed                                                                                          |
| products.{}.brand      | String | Brand associated with the product                                                                                         |
| products.{}.variant    | String | Variant of the product (e.g. Black)                                                                                       |
| products.{}.price      | Number | Price (\$) of the product being viewed                                                                                    |
| products.{}.quantity   | Number | Quantity of a product                                                                                                     |
| products.{}.coupon     | String | Coupon code associated with a product (e.g MAY_DEALS_3)                                                                   |
| products.{}.position   | Number | Position in the product list (ex. 3)                                                                                      |
| products.{}.url        | String | URL of the product page                                                                                                   |
| products.{}.image_url  | String | Image url of the product                                                                                                  |

Example:

```javascript
analytics.track('Order Cancelled', {
  order_id: '50314b8e9bcf000000000000',
  affiliation: 'Google Store',
  total: 30,
  revenue: 25.0,
  shipping: 3,
  tax: 2,
  discount: 2.5,
  coupon: 'hasbros',
  currency: 'USD',
  products: [
    {
      product_id: '507f1f77bcf86cd799439011',
      sku: '45790-32',
      name: 'Monopoly: 3rd Edition',
      price: 19,
      quantity: 1,
      category: 'Games',
      url: 'https://www.example.com/product/path',
      image_url: 'https://www.example.com/product/path.jpg',
    },
    {
      product_id: '505bd76785ebb509fc183733',
      sku: '46493-32',
      name: 'Uno Card Game',
      price: 3,
      quantity: 2,
      category: 'Games',
    },
  ],
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

## Coupons

These are events that might occur when dealing with coupons in your ecommerce.

### Coupon Entered

Fire this event whenever a coupon is entered either on a cart or on an order/transaction.
This event supports the following semantic properties:

| Property  | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| [30]      | [30]   | [40]                                |
| order_id  | String | Order/transaction ID, if applicable |
| cart_id   | String | Cart ID, if applicable              |
| coupon_id | String | Coupon ID                           |

Example:

```javascript
analytics.track('Coupon Entered', {
  order_id: '50314b8e9bcf000000000000',
  cart_id: '923923929jd29jd92dj9j93fj3'
  coupon_id: 'may_deals_2016'
});
```

**Note:** This should have no effect in GA enhanced e-commerce, as that destination should pull from the `coupon` field on the order events.

### Coupon Applied

Fire this event whenever a coupon is successfully applied to either a cart or an order/transaction.
This event supports the following semantic properties:

| Property    | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| [30]        | [30]   | [40]                                         |
| order_id    | String | Order/transaction ID, if applicable          |
| cart_id     | String | Cart ID, if applicable                       |
| coupon_id   | String | Coupon ID                                    |
| coupon_name | String | Coupon name                                  |
| discount    | Number | Monetary discount applied through the coupon |

Example:

```javascript
analytics.track('Coupon Applied', {
  order_id: '50314b8e9bcf000000000000',
  cart_id: '923923929jd29jd92dj9j93fj3'
  coupon_id: 'may_deals_2016',
  coupon_name: 'May Deals 2016',
  discount: 23.32
});
```

**Note:** This should have no effect in GA enhanced e-commerce, as that destination should pull from the `coupon` field on the order events.

### Coupon Denied

Fire this event whenever a coupon is denied from either a cart or an order/transaction.
This event supports the following semantic properties:

| Property    | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| [30]        | [30]   | [40]                                |
| order_id    | String | Order/transaction ID, if applicable |
| cart_id     | String | Cart ID, if applicable              |
| coupon_id   | String | Coupon ID                           |
| coupon_name | String | Coupon name                         |
| reason      | String | Reason the coupon was denied        |

Example:

```javascript
analytics.track('Coupon Denied', {
  order_id: '50314b8e9bcf000000000000',
  cart_id: '923923929jd29jd92dj9j93fj3'
  coupon: 'may_deals_2016',
  reason: 'Coupon expired'
});
```

**Note:** This should have no effect in GA enhanced e-commerce, as that destination should pull from the `coupon` field on the order events.

### Coupon Removed

Fire this event whenever a coupon is removed from either a cart or an order/transaction.
This event supports the following semantic properties:

| Property    | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| [30]        | [30]   | [40]                                         |
| order_id    | String | Order/transaction ID, if applicable          |
| cart_id     | String | Cart ID, if applicable                       |
| coupon_id   | String | Coupon ID                                    |
| coupon_name | String | Coupon name                                  |
| discount    | Number | Monetary discount applied through the coupon |

Example:

```javascript
analytics.track('Coupon Removed', {
  order_id: '50314b8e9bcf000000000000',
  cart_id: '923923929jd29jd92dj9j93fj3'
  coupon_id: 'may_deals_2016',
  coupon_name: 'May Deals 2016',
  discount: 23.32
});
```

**Note:** This should have no effect in GA enhanced e-commerce, as that destination should pull from the `coupon` field on the order events.

## Wishlisting

These events may occur if your ecommerce supports wishlist features.

### Product Added to Wishlist

Fire this event when a customer adds a product to their wish list.
This event supports the following semantic properties:

| Property      | Type   | Description                                             |
| ------------- | ------ | ------------------------------------------------------- |
| [30]          | [30]   | [40]                                                    |
| wishlist_id   | String | Wishlist ID to which the product was added to           |
| wishlist_name | String | Wishlist name to which the product was added to         |
| product_id    | String | Database id of the product being viewed                 |
| sku           | String | Sku of the product being viewed                         |
| category      | String | Product category being viewed                           |
| name          | String | Name of the product being viewed                        |
| brand         | String | Brand associated with the product                       |
| variant       | String | Variant of the product (e.g. Black)                     |
| price         | Number | Price (\$) of the product being viewed                  |
| quantity      | Number | Quantity of a product                                   |
| coupon        | String | Coupon code associated with a product (e.g MAY_DEALS_3) |
| position      | Number | Position in the product list (ex. 3)                    |
| url           | String | URL of the product page                                 |
| image_url     | String | Image url of the product                                |

Example:

```javascript
analytics.track('Product Added to Wishlist', {
  wishlist_id: 'skdjsidjsdkdj29j',
  wishlist_name: 'Loved Games',
  product_id: '507f1f77bcf86cd799439011',
  sku: 'G-32',
  category: 'Games',
  name: 'Monopoly: 3rd Edition',
  brand: 'Hasbro',
  variant: '200 pieces',
  price: 18.99,
  quantity: 1,
  coupon: 'MAYDEALS',
  position: 3,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Product Removed from Wishlist

Fire this event when a customer removes a product from their wish list.
This event supports the following semantic properties:

| Property      | Type   | Description                                             |
| ------------- | ------ | ------------------------------------------------------- |
| [30]          | [30]   | [40]                                                    |
| wishlist_id   | String | Wishlist ID to which the product was added to           |
| wishlist_name | String | Wishlist name to which the product was added to         |
| product_id    | String | Database id of the product being viewed                 |
| sku           | String | Sku of the product being viewed                         |
| category      | String | Product category being viewed                           |
| name          | String | Name of the product being viewed                        |
| brand         | String | Brand associated with the product                       |
| variant       | String | Variant of the product (e.g. Black)                     |
| price         | Number | Price (\$) of the product being viewed                  |
| quantity      | Number | Quantity of a product                                   |
| coupon        | String | Coupon code associated with a product (e.g MAY_DEALS_3) |
| position      | Number | Position in the product list (ex. 3)                    |
| url           | String | URL of the product page                                 |
| image_url     | String | Image url of the product                                |

Example:

```javascript
analytics.track('Product Removed from Wishlist', {
  wishlist_id: 'skdjsidjsdkdj29j',
  wishlist_name: 'Loved Games',
  product_id: '507f1f77bcf86cd799439011',
  sku: 'G-32',
  category: 'Games',
  name: 'Monopoly: 3rd Edition',
  brand: 'Hasbro',
  variant: '200 pieces',
  price: 18.99,
  quantity: 1,
  coupon: 'MAYDEALS',
  position: 3,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Wishlist Product Added to Cart

Fire this event when a customer moves a product from their wish list to their cart.
This event supports the following semantic properties:

| Property      | Type   | Description                                             |
| ------------- | ------ | ------------------------------------------------------- |
| [30]          | [30]   | [40]                                                    |
| wishlist_id   | String | Wishlist ID to which the product was added to           |
| wishlist_name | String | Wishlist name to which the product was added to         |
| cart_id       | String | Cart ID to which this product was added to              |
| product_id    | String | Database ID of the product being viewed                 |
| sku           | String | Sku of the product being viewed                         |
| category      | String | Product category being viewed                           |
| name          | String | Name of the product being viewed                        |
| brand         | String | Brand associated with the product                       |
| variant       | String | Variant of the product (e.g. Black)                     |
| price         | Number | Price (\$) of the product being viewed                  |
| quantity      | Number | Quantity of a product                                   |
| coupon        | String | Coupon code associated with a product (e.g MAY_DEALS_3) |
| position      | Number | Position in the product list (ex. 3)                    |
| url           | String | URL of the product page                                 |
| image_url     | String | Image url of the product                                |

Example:

```javascript
analytics.track('Wishlist Product Added to Cart', {
  wishlist_id: 'skdjsidjsdkdj29j',
  wishlist_name: 'Loved Games',
  cart_id: '99j2d92j9dj29dj29d2d',
  product_id: '507f1f77bcf86cd799439011',
  sku: 'G-32',
  category: 'Games',
  name: 'Monopoly: 3rd Edition',
  brand: 'Hasbro',
  variant: '200 pieces',
  price: 18.99,
  quantity: 1,
  coupon: 'MAYDEALS',
  position: 3,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

## Sharing

With many ecommerce stores integrating with social apps or other sharing capabilities, these events might be useful if you are tracking customers sharing product information.

### Product Shared

Fire this event when a customer shares a product.
This event supports the following semantic properties:

| Property      | Type   | Description                             |
| ------------- | ------ | --------------------------------------- |
| [30]          | [30]   | [40]                                    |
| share_via     | String | Method of sharing                       |
| share_message | String | Message that the sender sent            |
| recipient     | String | Recipient of the sharing                |
| product_id    | String | Database ID of the product being viewed |
| sku           | String | Sku of the product being viewed         |
| category      | String | Product category being viewed           |
| name          | String | Name of the product being viewed        |
| brand         | String | Brand associated with the product       |
| variant       | String | Variant of the product (e.g. Black)     |
| price         | Number | Price (\$) of the product being viewed  |
| url           | String | URL of the product page                 |
| image_url     | String | Image url of the product                |

Example:

```javascript
analytics.track('Product Shared', {
  share_via: 'email',
  share_message: 'Hey, check out this item',
  recipient: 'friend@gmail.com',
  product_id: '507f1f77bcf86cd799439011',
  sku: 'G-32',
  category: 'Games',
  name: 'Monopoly: 3rd Edition',
  brand: 'Hasbro',
  variant: '200 pieces',
  price: 18.99,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
})
```

**Note:** The `sku` and `product_id` do not have to be different. If they are different, typically the `product_id` is a database identifier, like `9714107479` and the `sku` is a public-facing identifier like `ECOM-02`.

### Cart Shared

Fire this event when a customer shares a shopping cart.
This event supports the following semantic properties:

| Property               | Type   | Description                            |
| ---------------------- | ------ | -------------------------------------- |
| [30]                   | [30]   | [40]                                   |
| share_via              | String | Method of sharing                      |
| share_message          | String | Message that the sender sent           |
| recipient              | String | Recipient of the sharing               |
| cart_id                | String | Shopping cart ID                       |
| products               | Array  | Products displayed in the product list |
| products.{}.product_id | String | Product id displayed on the list       |

Example:

```javascript
analytics.track('Cart Viewed', {
  share_via: 'email',
  share_message: 'Hey, check out this item',
  recipient: 'friend@gmail.com',
  cart_id: 'd92jd29jd92jd29j92d92jd',
  products: [{ product_id: '507f1f77bcf86cd799439011' }, { product_id: '505bd76785ebb509fc183733' }],
})
```

## Reviewing

These events can be useful for tracking product related reviews.

### Product Reviewed

Fire this event when a customer reviews a product. This event supports the following semantic properties:

| Property    | Type   | Description   |
| ----------- | ------ | ------------- |
| [30]        | [30]   | [40]          |
| product_id  | String | Product’s ID  |
| review_id   | String | Review ID     |
| review_body | String | Review body   |
| rating      | String | Review rating |

Example:

```javascript
analytics.track('Product Reviewed', {
  product_id: '507f1f77bcf86cd799439011',
  review_id: 'kdfjrj39fj39jf3',
  review_body: 'I love this product',
  rating: '5',
})
```
