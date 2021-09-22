import { gql } from 'apollo-boost'; // parse graphql query as it is not javascript

// Queries
const getProjectsQuery = gql`
    {
        projects {
            title
            location
            date
            time
            description
            owner{
                firstname
                lastname
            }
            id
        }
    }
`
const getProfilesQuery = gql`
    {
        profiles {
            firstname
            lastname
            role
            absences
            id
        }
    }
`

const getProjectQuery = gql`
    query ($id: ID){
        project(id:$id){
            id
            title
            location
            date
            time
            description
            owner{
                firstname
                lastname
            }
        }
    }
`

const getProfileQuery = gql`
    query ($id: ID){
        profile(id:$id){
            id
            firstname
            lastname
            role
            background
            goals
            absences
        }
    }
`

const getAbsencesQuery = gql`
    {
        profiles {
            absences
        }
    }
`

// Mutations
const addProjectMutation = gql`
    mutation($title: String!,$location: String, $profileId: ID, $date: String, $time: String, $description: String){
        addProject(title:$title, location:$location, profileId:$profileId, date: $date, time: $time, description: $description){
            title
            location
            date
            time
            description
            id
        }
    }
`

const addProfileMutation = gql`
    mutation($firstname: String!,$lastname: String!, $role: String, $background: String, $goals: String, $absences: [String]){
        addProfile(firstname:$firstname, lastname:$lastname, role:$role, background:$background, goals:$goals, absences: $absences){
            firstname
            lastname
            role
            background
            goals
            absences
        }
    }
`

const deleteProfileMutation = gql`
    mutation($id: ID){
        deleteProfile(id: $id){
            firstname
            lastname
            role
            background
            goals
            absences
        }
        deleteProfileId(profileId: $id){
            title
        }
    }
`
const deleteProjectMutation = gql`
    mutation($id: ID){
        deleteProject(id: $id){
            title
            status
            effort
            created
            due
        }
    }
`

const updateProfileMutation = gql`
    mutation($id: ID, $firstname: String!,$lastname: String!, $role: String, $background: String, $goals: String, $absences: [String]){
        updateProfile(id: $id, firstname:$firstname, lastname:$lastname, role:$role, background:$background, goals:$goals, absences: $absences){
            id
            firstname
            lastname
            role
            background
            goals
            absences
        }
    }
`

const updateProjectMutation = gql`
    mutation($id: ID, $title: String!,$status: String, $profileId: ID, $effort: Int, $created: String, $due: String){
        updateProject(id: $id, title:$title, status:$status, profileId:$profileId, effort: $effort, created: $created, due: $due){
            id
            title
            status
            effort
            created
            due
        }
    }
`



export {
    getProfilesQuery,
    getProjectsQuery,

    getProjectQuery,
    getProfileQuery,

    getAbsencesQuery,

    addProfileMutation,
    addProjectMutation,

    deleteProfileMutation,
    deleteProjectMutation,

    updateProfileMutation,
    updateProjectMutation,
};
