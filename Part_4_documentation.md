## Part 1

#### Registration

- [x] Users can register using firstName, lastName, address, email, phone and password
      ####Login
- [x] Users can login using email and password. Simple string matching against DB

## Part 2

-[x] Users can add and edit product (title, categories, description, price, rentPrice, rentDuration) -[ ] Multistep form -[x] Reusing same form component for both edit and create operations -[x] Delete products that a user owns (synced with InMemoryCache)

## Part 3

-[x] List all products created by all users (Inside MyProducts > Posted By Me) -[x] Increment viewCount when product is viewed -[x] Buy product -[x] Rent product -[x] Display all the products bought/sold/lent/borrowed by user (Inside MyProducts)

## Database Models

#### Product

`model Product {
  id UUID 
  title String 
  categories String[]
  description String
  price Int
  rentPrice Int
  rentDuration String
  viewCount Int 
  createdAt DateTime 
  purchaseInfo SoldProduct 
  rentInfo RentedProduct 
  postedByUser User 
  postedBy String
}`

#### User

`model User {
  id UUID 
  firstName String
  lastName String 
  address String
  email String 
  phone String
  password String
  postedProducts Product[] 
}`

#### RentedProduct

`model RentedProduct{
  id UUID 
  productId String 
  productDetails Product
  productOwner String
  borrowedBy String
}`

#### SoldProduct

`model SoldProduct{
  id UUID
  productId String 
  productDetails Product 
  productOwner String
  boughtBy String
}`
