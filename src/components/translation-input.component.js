import React, { useRef, useEffect } from 'react'
import { Input, Layout } from '@ui-kitten/components'

/**
 * The input for the translation
 * @param opt.value the value of the input
 * @param opt.disabled to disable the input text
 * @param opt.onChange the fn to apply for any change of the input
 * @param opt.onSubmit the fn to applay when submit
 */
export default function TranslationInput({
  value,
  disabled,
  onChangeText,
  onSubmit,
}) {
  return (
    <Layout>
      <Input
        value={value}
        onChangeText={onChangeText}
        disabled={disabled}
      />
    </Layout>
  )
}
