import { Text } from '@ui-kitten/components'
import React from 'react'

/**
 * Display the word to translate and eventualy his translation
 * @param opt.word the text of the word to translate
 * @param opt.trad the text of translation of the word
 * @param opt.showTrad show the translation if true
 */
export default function TranslationTitle({ word, trad, showTrad }) {
  return (
    <Text>
      {word} {showTrad ? ` - ${trad}` : ''}
    </Text>
  )
}
