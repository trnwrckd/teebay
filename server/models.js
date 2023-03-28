const graphqlModels = `
    type User{
        id : ID
        firstName : String 
        lastName : String
        address : String
        email : String
        phone : String
        password : String
        boughtProducts : [Product]
        lentProducts : [Product]
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
        boughtBy  : String
        lentBy : String
        postedBy : String
        viewCount : Int
    }

    type Query{
        products: [Product]
        product(id: String!): Product
        users: [User]
        user(id : String!): User
    }

    type Mutation{
        createUser(firstName : String, lastName : String, address: String, email : String, phone : String, password : String) : User
    }
`;

module.exports = graphqlModels;
