import React, { type KeyboardEvent } from 'react'
// @ts-expect-error - postCss module
import { search } from './search-bar.module.css'

// fn prop from parent
interface SearchBarProps {
    searchFn: (arg: string) => void
}

export const SearchBar = ({ searchFn }: SearchBarProps) => {
    const [term, setTerm] = React.useState<string>('')

    // event handler for Enter key
    const onEnter = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' && term.length > 3) {
            searchFn(term)
        }
    }

    // builds search term - this could be handled onEnter - was
    // initially thinking might have time for type-ahead
    const onChange = (ev: React.FormEvent<HTMLInputElement>) => {
        setTerm(ev.currentTarget.value)
    }

    return (
        <>
            <div id="search" className={search}>
                <input
                    id="input"
                    value={term}
                    placeholder="Search..."
                    onChange={onChange}
                    onKeyDown={onEnter}
                />
                {term.length === 0 && (
                    <div className="buttonicon">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.385 15.4458C11.7348 17.5685 7.85532 17.4014 5.39854 14.9446C2.7625 12.3086 2.7625 8.0347 5.39854 5.39866C8.03458 2.76262 12.3084 2.76262 14.9445 5.39866C17.4013 7.85544 17.5683 11.7349 15.4457 14.3851L20.6013 19.5408C20.8942 19.8337 20.8942 20.3085 20.6013 20.6014C20.3084 20.8943 19.8335 20.8943 19.5407 20.6014L14.385 15.4458ZM6.4592 13.8839C4.40895 11.8337 4.40895 8.50957 6.4592 6.45932C8.50945 4.40907 11.8336 4.40907 13.8838 6.45932C15.9326 8.50807 15.9341 11.8288 13.8883 13.8794C13.8868 13.8809 13.8853 13.8824 13.8838 13.8839C13.8823 13.8854 13.8808 13.8869 13.8793 13.8884C11.8287 15.9342 8.50795 15.9327 6.4592 13.8839Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                )}
                {term.length > 0 && (
                    <div
                        className="buttonicon close-button"
                        onClick={() => setTerm('')}
                    >
                        <svg
                            style={{ cursor: 'pointer' }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M8.46445 15.5354L15.5355 8.46436"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M8.46446 8.46458L15.5355 15.5356"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                )}
            </div>
            <p style={{ color: '#acabab' }}>* press Enter key to perform search</p>
        </>
    )
}
