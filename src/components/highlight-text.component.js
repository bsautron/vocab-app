import { Text } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'

export function HightlightText({ category, text, hightlights, colorHighlight, color }) {
    const indexes = hightlights.map(h => ({
        startIndex: text.toLowerCase().indexOf(h.toLowerCase()),
        text: h,
    }))
        .sort((i1, i2) => i1.startIndex - i2.startIndex)
        .filter(i => i.startIndex >= 0)


    if (!indexes.length) {
        return <Text style={{ color }} category={category}>
            {text}
        </Text>
    }
    let cursorIndex = 0

    const retText = []
    for (const index of indexes) {
        retText.push(
            <Text key={cursorIndex} style={{ color }} category={category}>
                {text.slice(cursorIndex, index.startIndex)}
            </Text>
        )

        retText.push(
            <View key={index.startIndex} style={{
                padding: 0,
                margin: 0,
                borderRadius: 5,
                backgroundColor: colorHighlight
            }}>
                <Text style={{ color }} category={category}>
                    {text.slice(index.startIndex, index.startIndex + index.text.length)}
                </Text>

            </View>
        )


        cursorIndex = index.startIndex + index.text.length
    }

    retText.push(<Text style={{ color }} category={category}>
        {text.slice(cursorIndex)}
    </Text>)

    return <View style={{ flexDirection: 'row' }}>
        {retText}
    </View>

}