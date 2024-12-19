const zod = require("zod");

const user = zod.object({
    username:zod.string().email().max(50).min(6),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
});
const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
});
const updateBody = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
})
module.exports={
    user,signinBody,updateBody
}