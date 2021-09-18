import { gql } from 'apollo-boost'; // parse graphql query as it is not javascript

// Queries
const getProjectsQuery = gql`
    {
        projects {
            title
            status
            effort
            created
            due
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

const getSprintsQuery = gql`
    {
        sprints {
            number
            startDate
            endDate
            id
        }
    }
`

const getProjectQuery = gql`
    query ($id: ID){
        project(id:$id){
            id
            title
            status
            effort
            created
            due
            owner{
                firstname
                lastname
            }
            sprints{
                number
            }
        }
    }
`

const getSprintQuery = gql`
    query ($id: ID){
        sprint(id:$id){
            id
            number
            startDate
            endDate
            projects{
                title
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
    mutation($title: String!,$status: String, $profileId: ID, $sprintId: [ID], $effort: Int, $created: String, $due: String){
        addProject(title:$title, status:$status, profileId:$profileId, sprintId:$sprintId, effort: $effort, created: $created, due: $due){
            title
            status
            effort
            created
            due
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

const addSprintMutation = gql`
    mutation($number: Int!, $startDate: String, $endDate: String ){
        addSprint(number:$number, startDate:$startDate, endDate: $endDate){
            number
            startDate
            endDate
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

const deleteSprintMutation = gql`
    mutation($id: ID){
        deleteSprint(id: $id){
            number
            startDate
            endDate
        }
        deleteSprintId(sprintId: $id){
            title
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
    mutation($id: ID, $title: String!,$status: String, $profileId: ID, $sprintId: [ID], $effort: Int, $created: String, $due: String){
        updateProject(id: $id, title:$title, status:$status, profileId:$profileId, sprintId:$sprintId, effort: $effort, created: $created, due: $due){
            id
            title
            status
            effort
            created
            due
        }
    }
`


const updateSprintMutation = gql`
    mutation($id: ID, $number: Int!, $startDate: String, $endDate: String ){
        updateSprint(id: $id, number:$number, startDate:$startDate, endDate: $endDate){
            id
            number
            startDate
            endDate
        }
    }
`


export {
    getProfilesQuery,
    getProjectsQuery,
    getSprintsQuery,

    getProjectQuery,
    getSprintQuery,
    getProfileQuery,

    getAbsencesQuery,

    addProfileMutation,
    addProjectMutation,
    addSprintMutation,

    deleteProfileMutation,
    deleteProjectMutation,
    deleteSprintMutation,

    updateProfileMutation,
    updateProjectMutation,
    updateSprintMutation
};