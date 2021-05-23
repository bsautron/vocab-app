import { Layout } from '@ui-kitten/components'
import React from 'react'
import ContextExample from './context-example.component'

export default function ContextExampleList({ list }) {
    return <Layout>
        {list.map((l, i) => <ContextExample key={i} fr={l.fr} es={l.es} />)}
    </Layout>
}