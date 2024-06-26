import { type ReactNode } from 'react'
import { type SearchResult } from '../data'
// @ts-expect-error - postcss
import { resultrow } from './results.module.css'

interface ResultsProps {
    results: SearchResult[]
}

interface ResultProps {
    rowData: SearchResult
}

const ResultRow = ({ rowData }: ResultProps) => {
    const { name, description, keywords, version, publisher, links } =
        rowData.package

    const keywordList = (): ReactNode => {
        return keywords?.map((key, i) => {
            return <div key={i}>{key}</div>
        })
    }

    return (
        <section className={resultrow}>
            <a className="title" href={links.npm} target="_blank">
                {name}
            </a>
            <p>{description}</p>
            {keywords && <aside>{keywordList()}</aside>}
            <aside>
                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    {publisher.username}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#ababab' }}>{version}</p>
            </aside>
        </section>
    )
}

export const Results = ({ results }: ResultsProps) => {
    return (
        <div>
            {results.map((result, i) => {
                return <ResultRow key={i}rowData={result} />
            })}
        </div>
    )
}
