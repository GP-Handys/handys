import jwt from 'jsonwebtoken';

function extractUserFromJwt(token : string) : number{
    const { id } = jwt.decode(token) as { id :number}
    return id
}

export {extractUserFromJwt}
