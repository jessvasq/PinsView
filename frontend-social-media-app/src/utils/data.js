export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query 
}

export const searchQuery = (searchTerm) => {
    // * let us fetch all the data, return user with the given id
    const query = `*[_type == 'pin && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
            asset->{url}},
            _id, 
            destination,
            postedBy->{username, _id, image},
            save[] {
                _key, 
                postedBy ->{username, _id, image},
            },
        },
    }` //add an * after the search term to match anything that starts with the search term
    return query
} 