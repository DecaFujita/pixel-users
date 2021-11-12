export const fetcher = async(path) => {
    let response = await fetch('http://127.0.0.1:8000/api' + path);
    return await response.json()
}
