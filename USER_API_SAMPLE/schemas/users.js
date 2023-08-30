
const z = require('zod')

const userSchema = z.object({
    name: z.string({
        invalid_type_error: 'User name must be a String',
        required_error: 'User name is required'
    }),
    last: z.string({
        invalid_type_error: 'User last must be a String',
        required_error: 'User last is required'
    }).default("Unknown"),
    age: z.number({
        invalid_type_error: 'User age must be a Number',
        required_error: 'User age is required'
    }).int().min(12).max(125),
    email: z.string({
        invalid_type_error: 'User email must be correctly formated',
        required_error: 'User email is required'
    }).email({message:"are you sure that is a email?"})
})

function validateUser(obj) {
    return userSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
    validateUser
}