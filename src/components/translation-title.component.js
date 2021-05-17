import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SkeletonStyles } from '../styles'

/**
 * Display the word to translate and eventualy his translation
 * @param opt.word the text of the word to translate
 * @param opt.trad the text of translation of the word
 * @param opt.showTrad show the translation if true
 */
export default function TranslationTitle({ word, trad, showTrad, skeleton, ...props }) {
  const maj = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()

  if (skeleton) {
    return <Layout {...props} >
      <Layout style={styles.skTitle}>
        <Text category="h4">  </Text>
      </Layout>
      <Layout style={{ ...styles.skTitle, backgroundColor: 'transparent' }}>
        <Text category="h3">  </Text>
      </Layout>
    </Layout>

  }
  return (
    <Layout {...props}>
      <Text style={{ alignSelf: 'center' }} category="h4">
        {maj(word)}
      </Text>
      <Text style={{ alignSelf: 'center' }} status="primary" category="h3">
        {showTrad ? maj(trad) : '  '}
      </Text>
    </Layout>
  )
}


const styles = StyleSheet.create({
  skTitle: {
    ...SkeletonStyles.textSkeleton,
    width: 150,
  },
})