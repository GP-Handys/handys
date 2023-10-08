import jwtDecode from "jwt-decode";

function extractUserFromJwt(jwt: string): string {
    const decoded: any = jwtDecode(jwt);
    return decoded.id;
}

export { extractUserFromJwt };
