import { Layout, Text } from '@ui-kitten/components'
import React from 'react'

/**
 * Display the word to translate and eventualy his translation
 * @param opt.word the text of the word to translate
 * @param opt.trad the text of translation of the word
 * @param opt.showTrad show the translation if true
 */
export default function TranslationTitle({ word, trad, showTrad, ...props }) {
  const maj = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()
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
