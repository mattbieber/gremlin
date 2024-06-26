import { useState } from 'react'
import { SearchBar, Results } from './components'
import { search, type SearchResult } from './data'

export const App = () => {
    // acknowleding the multiple "useStates" and time-permitting would clean
    // up with cleaner state-management
    const [forceFail, setForceFail] = useState<boolean>(false)
    const [results, setResults] = useState<SearchResult[]>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)

    const doSearch = (term: string) => {
        setIsError(false)
        setIsSearching(true)

        setResults([])

        search(term, forceFail)
            .then((data: SearchResult[]) => {
                setResults(data)
                setIsSearching(false)
                // @ts-ignore - error type any
            })
            .catch((err) => {
                console.error(err)
                setResults([])
                setIsSearching(false)
                setIsError(true)
            })
    }

    const changeFail = () => {
        setForceFail(!forceFail)
    }

    return (
        <div className="container">
            <SearchBar searchFn={doSearch} />
            <div className="fail-check">
                <input type="checkbox" name="fail" onChange={changeFail} />
                <label htmlFor="fail">force failure</label>
            </div>
            <h1 className="col">npm search</h1>
            <div style={isSearching ? { opacity: 0.2 } : { opacity: 1.0 }}>
                {results.length > 0 && <Results results={results} />}
            </div>
            {isError && (
                <div className="error">
                    An error occurred completing your search!
                </div>
            )}
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
