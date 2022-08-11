
const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book.js');
const Author = require('../models/author.js');

const { GraphQLSchema, 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql

// dummy data 
// var books = [
//     {name: 'Wind',genre:'Fantasy',id:'1', authorId: '1'},
//     {name: 'Final',genre:'Fantasy',id:'2', authorId: '2'},
//     {name: 'Long',genre:'Sci-Fi',id:'3', authorId: '3'},
//     {name: 'Awsome',genre:'General',id:'4', authorId: '1'},
//     {name: 'Good book',genre:'Action',id:'5', authorId: '2'},
//     {name: 'My Heart',genre:'Sci-Fi',id:'6', authorId: '3'},
// ]

// const authors = [
//     {name: 'Author 1', age: 26, id: '1'},
//     {name: 'Author 2', age: 45, id: '2'},
//     {name: 'Author 3', age: 30, id: '3'},
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors,{id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:() => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        age: { type: graphql.GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, {authorId: parent.id});
                return Book.find({authorId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuearyType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // code to get data from db/other source
            //    return _.find(books, {id: args.id});
            return Book.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // code to get data from db/other source
            //    return books;
            return Book.find({})
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // return _.find(authors, {id: args.id});
                return Author.findById(args.id)
            }
        },
        authors: {
            type:  new GraphQLList(AuthorType),
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // return authors;
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        updateAuthor: {
            type: AuthorType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return Author.findByIdAndUpdate(args.id, { name: args.name, age: args.age})
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
query: RootQuery,
mutation: Mutation
})