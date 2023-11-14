export function addHttp(redirectTo: string) {
    if (!redirectTo.match(/^[a-zA-Z]+:\/\//)) {
        return `http://${redirectTo}`;
    } else {
        return redirectTo;
    }
}