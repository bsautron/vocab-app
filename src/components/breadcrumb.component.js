import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function Breadcrumb({ textEdit, items, onPress }) {
    const maj = str => str[0].toUpperCase() + str.slice(1).toLowerCase()

    return (
        <TouchableOpacity onPress={onPress} style={styles.layout}>
            <Icon style={{
                width: 18,
                height: 18,
                marginRight: 10
            }} name='edit-2-outline' />
            <Text category='c1' status='basic'>{textEdit} :</Text>
            {
                items.map((item, i) => {
                    return (
                        <Layout key={item} style={styles.subLayout}>
                            <Text category='c1' style={{ marginHorizontal: 10 }} status='basic'>{i ? '›' : ''}</Text>
                            <Text category={i === items.length - 1 ? 'c2' : 'c1'} status='basic'>{maj(item)}</Text>
                        </Layout>
                    )
                })
            }
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    subLayout: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'

    },
    button: {
        marginHorizontal: 10
    }
})