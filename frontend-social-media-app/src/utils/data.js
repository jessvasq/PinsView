export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query 
}

export const searchQuery = (searchTerm) => {
    // * let us fetch all the data, return user with the given id
    const query = `*[_type == 'pin && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image {
            asset-> { url }},
            _id, 
            destination,
            postedBy -> { userName, _id, image},
            save[] {
                _key, 
                postedBy ->{ userName, _id, image},
            },
        },
    }` //add an * after the search term to match anything that starts with the search term
    return query
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;




    