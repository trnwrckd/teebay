const graphqlModels = `

    scalar DateTime

    type User{
        id : ID
        firstName : String 
        lastName : String
        address : String
        email : String
        phone : String
        password : String
        postedProducts : [Product]
    }

    type Product{
        id : String
        title  : String
        categories  : [String]
        description : String
        price : Int
        rentPrice  : Int
        rentDuration  : String
        createdAt: DateTime
        purchaseInfo : SoldProduct
        rentInfo: RentedProduct 
        postedByUser: User
        postedBy : String
        viewCount : Int
    }

    type RentedProduct{
        id : String
        borrowedBy : String
        productId : String
        productOwner: String
        productDetails: Product
    }

    type SoldProduct{
        id : String
        boughtBy : String
        productId : String
        productOwner: String
        productDetails: Product
    }

    type Query{
        products: [Product]
        product(id: String): Product
        users: [User]
        user(id : String): User
        productsByUserId (id: String) : [Product]
        soldProductsByUserId (id: String) : [SoldProduct]
        boughtProductsByUserId (id: String) : [SoldProduct]
        lentProductsByUserId (id: String) : [RentedProduct]
        borrowedProductsByUserId (id: String) : [RentedProduct]
    }
    
    type Mutation{
        login(email: String, password: String) : User
        
        createUser(firstName : String, lastName : String, address: String, email : String, phone : String, password : String) : User
        
        createProduct(title : String, categories : [String], description : String, price : Int, rentPrice : Int, rentDuration : String, postedBy : String, viewCount : Int) : Product
        
        updateProduct(id : String, title : String, categories : [String], description : String, price : Int, rentPrice : Int, rentDuration : String) : Product

        deleteProduct(id: String) : Product

        purchaseProduct(productId: String, productOwner: String, boughtBy: String) : SoldProduct
        
        rentProduct(productId: String, productOwner: String, borrowedBy: String) : RentedProduct
    }
`;

module.exports = graphqlModels;
