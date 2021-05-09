import React, { useState } from 'react';
import { Card, Layout, Text } from '@ui-kitten/components';
import { CardStyles, IconsStyles } from '../styles';
import { StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';
import AttemptList from './attempt-list.component';

export default function WordCard({ item }) {
    const [attempts, setAttempts] = useState([])

    return (
        <Card style={styles.card}>
            <Layout>
                <Text variant="h5">{item.fr}</Text>
                <AttemptList
                    maxAttepmt={3}
                    attempts={attempts}
                ></AttemptList>
            </Layout>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        ...CardStyles.cardDefault,
        width: 250
    },

})