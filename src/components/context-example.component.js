import React from 'react'
import { Layout, Text } from "@ui-kitten/components";

export default function ContextExample({ fr, es }) {
    const renderText = (htmlText, primary) => {
        const splitWord = (str, bold) => str.split(' ')
            .filter(s => s.length)
            .map(s => primary
                ? <Text category={bold ? 's1' : 'p1'}>{s} </Text>
                : <Text category={bold ? 's2' : 'p2'} style={{ color: '#8F9BB3' }}>{s} </Text>)

        const recusiveRender = (text) => {
            const matchBold = text.match(/<em>[^<>]+<\/em>/g)
            if (!matchBold) return <>{splitWord(text)}</>

            const indexOfMatch = text.indexOf(matchBold[0])
            return <>
                {splitWord(text.slice(0, indexOfMatch))}
                {splitWord(matchBold[0].replace('<em>', '').replace('</em>', ''), true)}
                {recusiveRender(text.slice(indexOfMatch + matchBold[0].length))}
            </>
        }

        return <Layout style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline' }}>
            {recusiveRender(htmlText)}
        </Layout>
    }

    return <Layout style={{ margin: 10 }}>
        {renderText(`“ ${fr} ”`, true)}
        {renderText(`${es}`, false)}
    </Layout>
}
