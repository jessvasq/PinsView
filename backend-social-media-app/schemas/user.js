export default {
    //set properties
    name: 'user',
    type: 'document',
    title: 'User',
    fields: [      
    //array of objects
    //A schema is a blueprint for a document type
        {
            name: 'username', 
            title: 'Username',
            type: 'string',
        },

        {
            name: 'image', 
            title: 'Image',
            type: 'string',
        },
    ]
}
