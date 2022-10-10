
const project = require('../models/Project');
const client = require('../models/Client');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql')

//client 
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
})

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return client.findById(parent.clientId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return project.find()
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return project.findById(args.id);
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return client.find()
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return client.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
})