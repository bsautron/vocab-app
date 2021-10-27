import { Divider, Layout, TopNavigation } from '@ui-kitten/components';
import React from 'react'
import { SafeAreaView, ScrollView } from "react-native";

export function LayoutPage ({ title, header, footer, children}) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title={title} alignment='center' />
            <Divider />
            <Layout style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <Layout style={{ paddingTop: 20, marginBottom: 20, marginHorizontal: 15 }}>
                        {header}
                    </Layout>
                    <Layout style={{ paddingHorizontal: 20 }}>
                        {children}
                    </Layout>
                </ScrollView>
            </Layout>
        </SafeAreaView>
    )
}