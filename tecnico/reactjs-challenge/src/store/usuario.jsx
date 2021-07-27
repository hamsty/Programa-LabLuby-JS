const usuario = (state = null, action) => {
    switch (action.type) {
        case "LOGIN":
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
                    followers_url :action.followers_url,
                    following: action.following,
                    followers : action.followers,
                    repos: action.public_repos
                }
            
        case "LOGOUT":
            return null;
        default:
            return state;
    }
}

export { usuario };