import axios from 'axios'

/**
 * Some structure for the query results
 */
export interface SearchResult {
    package: {
        name: string
        version: string
        description: string
        keywords?: string[]
        publisher: {
            username: string
        }
        links: {
            npm: string
        }
    }
}

const instance = axios.create({
    baseURL: 'https://api.npms.io/v2/search/suggestions',
    timeout: 2000,
    headers: {},
})

export const search = async (term: string, shouldFail: boolean): Promise<SearchResult[]> => {
    return new Promise<SearchResult[]>(async (resolve, reject) => {
        
        try {
            if (shouldFail) throw new Error('Failed api call...')
            const res = await instance.request({
                method: 'get',
                params: {
                    q: term,
                },
            })
            resolve(res.data)
        } catch (err) {
            reject(err)
        }
    })
}
