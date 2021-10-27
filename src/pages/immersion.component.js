import React, { useEffect, useState, useContext } from 'react';
import { normalize } from '../utils'
import { DataContext } from '../components/data-context.component';
import { LayoutPage } from '../components/layout.component';
import { CategoryPreview } from '../components/category-preview.component';
import { Layout, Text } from '@ui-kitten/components';

/** Local header for the layout */
function LocalHeader() {
    return (
        <>
            <Text style={{ fontFamily: 'CHANGETHENAME_PRIMARY' }} category='h5'>Vos premier instant en arrivant dans le pays</Text>
            <Text style={{ fontFamily: 'CHANGETHENAME_REGULAR' }} category='s1'>Voici ce don't vous aurez besoin pour commencer a parler au gens pour une immersion rapide et efficace</Text>
        </>
    )
}

export const ImmersionScreen = ({ navigation, route }) => {

    const { categoryPreviews } = useContext(DataContext);

    const [inputText, setInputText] = useState('')
    const [indexesOpenCate, setIndexesOpenCate] = useState(null)
    const [data, setData] = useState(categoryPreviews)

    useEffect(() => {
        setIndexesOpenCate(null)
    }, [inputText])

    // useEffect(() => {
    //     if (inputText.length === 0) {
    //         setData(categoryPreviews)
    //     } else {
    //         setData(categoryPreviews.filter(raw => {
    //             const findMatchedCate = raw.categories.translations.find(translation => {
    //                 return higle.find(keyWord => {
    //                     return normalize(translation.displayText).match(normalize(keyWord))
    //                 })
    //             })
    //             const findSentence = raw.sentences.find(sentences => {
    //                 return sentences.translations.find(translation => {
    //                     return higle.find(keyWord => {
    //                         return normalize(translation.displayText).match(normalize(keyWord))
    //                     })
    //                 })
    //             })

    //             raw.sentences = raw.sentences.sort((s1) => {
    //                 const matched = s1.translations.find(translation => {
    //                     return higle.find(keyWord => {
    //                         return normalize(translation.displayText).match(normalize(keyWord))
    //                     })
    //                 })
    //                 if (matched) return -1
    //                 return 1
    //             })
    //             if (findMatchedCate || findSentence) {
    //                 return true
    //             }
    //             return false
    //         }))
    //     }
    // }, [inputText])

    const onPressCategory = (index) => {
        setIndexesOpenCate(index !== indexesOpenCate ? index : null)
    }
    return (
        <LayoutPage
            title="Immersion"
            header={<LocalHeader />}
        >
            <Layout style={{ alignItems: 'stretch' }}>
                {data.map((preview, i) => <CategoryPreview
                    key={preview.categories.slug}
                    opened={indexesOpenCate === i}
                    preview={preview}
                    highlights={[]}
                    onPress={() => onPressCategory(i)}
                />)}
            </Layout>
        </LayoutPage>

    );
};
