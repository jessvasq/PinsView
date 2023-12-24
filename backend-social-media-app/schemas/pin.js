export default {    
    name: 'pin',
    title: 'Pin',
    type: 'document',
    //fields represents the properties of the document type
    fields: [      
        {
            name: 'title', 
            title: 'Title',
            type: 'string',
        },


        {
            name: 'about', 
            title: 'About',
            type: 'string',
        },


        {
            name: 'destination', 
            title: 'Destination',
            type: 'string',
        },


        {
            name: 'category', 
            title: 'Category',
            type: 'string',
        },

        {
            name: 'image', 
            title: 'Image',
            type: 'image',
            options: {
                //hotspot allows you to crop the image, it adapts to the size of the image to different screen sizes
                hotspot: true,
            }
        },

        {
            name: 'userId', 
            title: 'UserId',
            type: 'string',
        },


        {
            name: 'postedBy', 
            title: 'PostedBy',
            //postedBy allows you to reference the user document type
            type: 'postedBy',
        },



        {
            name: 'save', 
            title: 'Save',
            type: 'array',
            of: [{type: 'save'}]
        },
        

        {
            name: 'comments', 
            title: 'Comments',
            type: 'array',
            of: [{type: 'comment'}]
        },
    ],
};