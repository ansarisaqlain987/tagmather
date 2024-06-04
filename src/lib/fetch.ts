export const fetchCall = (endpoint: string, options: RequestInit) => {
    return fetch(`${process.env.NEXT_PUBLIC_URL}` + '/' + endpoint, {...options})
}