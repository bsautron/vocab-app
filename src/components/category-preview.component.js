import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Icon, Layout, Text } from '@ui-kitten/components';
import { CardStyles } from '../styles';
import { HightlightText } from '../components/highlight-text.component';
import { default as theme } from '../../theme.json';

const minSize = 2

export function CategoryPreview({ preview, highlights, opened, onPress }) {
    return (
        <Card style={styles.card}>
            <TouchableOpacity onPress={() => onPress()}>
                <HightlightText
                    category='h5'
                    color={'black'}
                    text={preview.categories.translations[0].displayText[0].toUpperCase() + preview.categories.translations[0].displayText.slice(1)}
                    hightlights={highlights}
                    colorHighlight={theme['color-primary-300']} />
                <HightlightText
                    text={preview.categories.translations[1].displayText[0].toUpperCase() + preview.categories.translations[1].displayText.slice(1)}
                    hightlights={highlights}
                    color={'#8F9BB3'}
                    colorHighlight={theme['color-primary-200']} />
                {/* <Text style={{ fontFamily: 'CHANGETHENAME_PRIMARY' }} category='h5' style={styles.text}>{title[0].toUpperCase() + title.slice(1)}</Text> */}
                <Image source={{ uri: preview.categories.image }} style={styles.image} />

                {
                    preview.sentences.slice(0, opened ? undefined : minSize).map(sentence => {
                        return <View key={sentence.slug} style={{ marginBottom: 10, flexDirection: 'column' }}>
                            <HightlightText
                                category='p1'
                                text={`“${sentence.translations[0].displayText}”`}
                                color={'black'}
                                hightlights={highlights}
                                colorHighlight={theme['color-primary-300']} />
                            <HightlightText
                                category='p2'
                                text={`${sentence.translations[1].displayText}`}
                                hightlights={highlights}
                                color={'#8F9BB3'}
                                colorHighlight={theme['color-primary-200']} />
                        </View>

                    })
                }
                {
                    preview.sentences.length > minSize &&
                    <Layout style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        {
                            opened ?
                                <>
                                    <Text style={{ fontFamily: 'CHANGETHENAME_REGULAR' }} category="c1">Voir moin</Text>
                                    <Icon style={{ marginTop: 4, marginLeft: 5, width: 10, height: 10 }} name='arrowhead-up-outline' />
                                </> :
                                <>
                                    <Text style={{ fontFamily: 'CHANGETHENAME_REGULAR' }} category="c1">Voir {preview.sentences.length - minSize} exemple{preview.sentences.length - minSize > 1 ? 's' : ''} de plus</Text>
                                    <Icon style={{ marginTop: 4, marginLeft: 5, width: 10, height: 10 }} name='arrowhead-down-outline' />
                                </>
                        }
                    </Layout>
                }
            </TouchableOpacity>
        </Card>
    )
}


const styles = StyleSheet.create({
    card: {
        ...CardStyles.cardDefault,
        marginBottom: 30,
    },
    image: {
        flex: 1,
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    text: {
        color: "black",
        padding: 5
    }
});
