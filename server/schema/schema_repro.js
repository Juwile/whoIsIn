const graphql = require('graphql');
const _= require('lodash');
const Project = require('../models/project');
const Profile = require('../models/profile');
const { Kind } = require('graphql/language');
ObjectId = require('mongodb').ObjectID;


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLScalarType } = graphql; // Properties of graphql package

// Schema: define Types, define Relationships, define Root-Queries

// ScalarType date
const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return Number.isNaN(dateValue.getTime()) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            const value = new Date(ast.value);
            return Number.isNaN(value.getTime()) ? undefined : value;
        }
        return undefined;
    },
});



//Types

const ProjectType = new GraphQLObjectType({
    name:'Project',
    fields:() => ({
        id: { type: GraphQLID },
        status: { type: GraphQLString },
        effort: { type: GraphQLInt },
        created: { type: GraphQLString },
        due: { type: GraphQLString },
        title: { type: GraphQLString },
        owner: {
            type: ProfileType,
            resolve(parent, args){
                const parentProfileId = parent.profileId;
                if (parentProfileId.match(/^[0-9a-fA-F]{24}$/)){ // Um Fall abzufangen wenn kein Owner/ProfileId vorhanden
                    return Profile.findById(parent.profileId)

                } else {
                    return ''
                }
            }
        }
    })
});

// if we have multiple types, it needs to be wrapped in a function because of relations.
// If no functions are used the order needed to be correct, what is not possible in each case (undefined Types then).
// functions run like at the same time and therefore we do not have this problem

const ProfileType = new GraphQLObjectType({
    name:'Profile',
    fields:() => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        role: { type: GraphQLString },
        background: { type: GraphQLString },
        goals: { type: GraphQLString },
        absences: { type: new GraphQLList(GraphQLDate) }
    })
});


// Root Queries - Einstiegspunkte zum Graph

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID}}, // was dann bei der Query in der Klammer steht book(id:'123')
            resolve(parent,args){
                console.log(args.id);
                //code to get data from database
                //return _.find(dummyProjects, {id: args.id}); //lodash vereinfacht
                return Project.findById(args.id);
            }
        },
        profile: {
            type: ProfileType,
            args: { id: {type: GraphQLID } },
            resolve(parent,args){
                //return _.find(dummyProfiles, { id: args.id });
                return Profile.findById(args.id);
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args){ // parent, args not needed as we want all projects
                //return dummyProjects
                return Project.find({}); // ohne Kriterium returned es alles
            }
        },
        profiles:{
            type: new GraphQLList(ProfileType),
            resolve(parent, args){ // parent, args not needed as we want all projects
                //return dummyProfiles
                return Profile.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                status: {type: GraphQLString},
                effort: {type: GraphQLInt},
                created: {type: GraphQLString},
                due: {type: GraphQLString},
                profileId: {type: GraphQLID},
            },
            resolve(parent, args) {
                let project = new Project({ // Project importiert von models
                    title: args.title,
                    status: args.status,
                    effort: args.effort,
                    created: args.created,
                    due: args.due,
                    profileId: args.profileId
                });
                return project.save(); // saves new argument values to DB, without return it would not appear in Graphiql
            }
        },
        addProfile: {
            type: ProfileType,
            args: {
                firstname: { type: new GraphQLNonNull(GraphQLString) },
                lastname: { type: new GraphQLNonNull(GraphQLString) },
                role: { type: GraphQLString },
                background: { type: GraphQLString },
                goals: { type: GraphQLString },
                absences: { type: new GraphQLList(GraphQLString) },
            },
            resolve(parent, args) {
                let profile = new Profile({ // Profile importiert von models
                    firstname: args.firstname,
                    lastname: args.lastname,
                    role: args.role,
                    background: args.background,
                    goals: args.goals,
                    absences: args.absences,
                });
                return profile.save(); // saves new argument values to DB, without return it would not appear in Graphiql
            }
        },
        deleteProfile: {
            type: ProfileType,
            args: { id: {type: GraphQLID }
            },
            resolve(parent,args) {
                return Profile.findByIdAndDelete(args.id)
            }
        },
        deleteProfileId:{
            type: ProjectType,
            args: { profileId: {type: GraphQLID }
            },
            resolve(parent,args) {
                const query = { profileId: args.profileId }
                const update = { profileId: '' }
                return Project.updateMany(query, update)
                    .then(result => {
                        const { matchedCount, modifiedCount } = result;
                        console.log('Successfully matched ${matchedCount} and modified ${modifiedCount} items.')
                        return result
                    })
                    .catch(err => console.error('Failed to update with error: ${err}'))
            }
        },
        deleteProject: {
            type: ProjectType,
            args: { id: {type: GraphQLID }
            },
            resolve(parent,args) {
                return Project.findByIdAndDelete(args.id)
            }
        },
        updateProfile: {
            type: ProfileType,
            args: {
                id: { type: GraphQLID },
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                role: { type: GraphQLString },
                background: { type: GraphQLString },
                goals: { type: GraphQLString },
                absences: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parentValue, args){
                return new Promise((resolve, reject) => {
                    console.log('args id', args.id);
                    console.log('args id', args.firstname);
                    Profile.findOneAndUpdate(
                        {"_id": args.id},
                        { "$set":{
                            firstname: args.firstname,
                                lastname: args.lastname,
                                role: args.role,
                                background: args.background,
                                goals: args.goals,
                                absences: args.absences,
                            }},
                        {"new": true} //returns new document
                    ).exec((err, res) => {
                        console.log('test', res)
                        if(err) reject(err)
                        else resolve(res)
                    })
                })
            }
        },

        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID },
                title: {type: new GraphQLNonNull(GraphQLString)},
                status: {type: GraphQLString},
                effort: {type: GraphQLInt},
                created: {type: GraphQLString},
                due: {type: GraphQLString},
                profileId: {type: GraphQLID},
            },
            resolve(parentValue, args){
                return new Promise((resolve, reject) => {
                    console.log('args id', args.id);
                    Project.findOneAndUpdate(
                        {"_id": args.id},
                        { "$set":{
                                title: args.title,
                                status: args.status,
                                effort: args.effort,
                                created: args.created,
                                due: args.due,
                                profileId: args.profileId
                            }},
                        {"new": true} //returns new document
                    ).exec((err, res) => {
                        if(err) reject(err)
                        else resolve(res)
                    })
                })
            }
        },
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})
