const temp = (state = { response: null, role: null }, action) => {
    switch (action.type) {

        case "TEMP_LIST":
            return { response: action.response, ...{ role: action.role } };
        case "UPDATE_LIST":
            return [...state, ...action.response]
        default:
            return state;
    }
}

const temp_repos = (state = [], action) => {
    switch (action.type) {

        case "TEMP_REPOS":
            return action.response;

        case "UPDATE_REPOS":
            return [...state, ...action.response]
        default:
            return state;
    }
}

const temp_user = (state = null, action) => {
    switch (action.type) {
        case "TEMP_USER":

            return {
                login: action.login,
                name: action.name,
                email: action.email,
                location: action.location,
                company: action.company,
                bio: action.bio,
                avatar_url: action.avatar_url,
                following_url: action.following_url,
                organizations_url: action.organizations_url,
                starred_url: action.starred_url,
                followers_url: action.followers_url,
                following: action.following,
                followers: action.followers,
                repos: action.public_repos
            }
        default:
            return state;
    }
}

export { temp, temp_user, temp_repos }