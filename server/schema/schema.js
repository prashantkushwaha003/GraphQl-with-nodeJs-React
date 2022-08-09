
const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql

// dummy data 
var books = [
    {name: 'Wind',genre:'Fantasy',id:'1', authorId: '1'},
    {name: 'Final',genre:'Fantasy',id:'2', authorId: '2'},
    {name: 'Long',genre:'Sci-Fi',id:'3', authorId: '3'},
    {name: 'Awsome',genre:'General',id:'4', authorId: '1'},
    {name: 'Good book',genre:'Action',id:'5', authorId: '2'},
    {name: 'My Heart',genre:'Sci-Fi',id:'6', authorId: '3'},
]

const authors = [
    {name: 'Author 1', age: 26, id: '1'},
    {name: 'Author 2', age: 45, id: '2'},
    {name: 'Author 3', age: 30, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors,{id: parent.authorId})
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
                return _.filter(books, {authorId: parent.id});
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
               return _.find(books, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // code to get data from db/other source
               return books;
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        },
        authors: {
            type:  new GraphQLList(AuthorType),
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return authors;
            }
        }
    }
})

module.exports = new GraphQLSchema({
query: RootQuery
})