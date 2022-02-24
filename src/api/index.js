const apiEndpoint = 'https://620cce31b57363259398c1e7.mockapi.io/sgv22/'
export async function getThings() {
    const response = await fetch(`${apiEndpoint}things`)
    return response.json()
}
