import React from 'react'
import { Layout, Text } from "@ui-kitten/components";

export default function ContextExample({ fr, es }) {
    return <Layout>
        <Text>{es}</Text>
        <Text>{fr}</Text>
    </Layout>
}
