import jwtDecode from "jwt-decode";

function extractUserFromJwt(jwt : string) : number{
    const decoded =JSON.parse(jwtDecode(jwt))
    return decoded.id
}

export {extractUserFromJwt}
