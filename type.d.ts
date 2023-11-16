type User = {
    email : string,
    password : string
}

type Product = {
    _id ?: id
    title : string,
    image : string,
    price : number,
    description? : string
    category? : string
}
