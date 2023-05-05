export {getUserResponse as default};
const getUserResponse = {
    "type": "object",
    "properties": {
      "status": { "type": "string", "enum": ["success"] },
      "data": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "number" },
            "employee_name": { "type": "string" },
            "employee_salary": { "type": "number" },
            "employee_age": { "type": "number" },
            "profile_image": { "type": "string" }
          },
          "required": ["id", "employee_name", "employee_salary", "employee_age", "profile_image"]
        }
      },
      "message": { "type": "string", "enum": ["Successfully! All records has been fetched."] }
    },
    "required": ["status", "data", "message"]
  }