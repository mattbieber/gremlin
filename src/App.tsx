import { useState } from 'react'
import { SearchBar, Results } from './components'
import { search, type SearchResult } from './data'

export const App = () => {
    const [results, setResults] = useState<SearchResult[]>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)

    const doSearch = (term: string) => {
        setIsSearching(true)
        search(term).then((data: SearchResult[]) => {
            setResults(data)
            setIsSearching(false)
        })
    }

    return (
        <div className="container">
            <SearchBar searchFn={doSearch} />
            <h1 className="col">npm search</h1>
            <div style={isSearching ? { opacity: 0.2 } : { opacity: 1.0 }}>
                {results.length > 0 && <Results results={results} />}
            </div>
            {isSearching && (
                <div className="loading-wrapper">
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </div>
    )
}
