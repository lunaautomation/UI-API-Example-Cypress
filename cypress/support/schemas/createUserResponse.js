export {createUserResponse as default};
 const createUserResponse = {
    $id: 'createUserResponse',
    description: "Create new user response",
    type: "object",
    properties: {
        status: {
            type: "string"
        },
        data: {
            type: "object",
            properties: {
                name: {
                    type: "string"
                },
                salary: {
                    type: "string"
                },
                age: {
                    type: "string"
                },
                id: {
                    type: "integer"
                }
            },
        },
    },
};
