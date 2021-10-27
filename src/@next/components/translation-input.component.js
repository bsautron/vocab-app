import React from 'react'
import { Input, Layout, Button, Icon, ButtonGroup } from '@ui-kitten/components'
import { Pressable } from 'react-native'
import SubmitInput from './submit-input.component'

/**
 * The input for the translation
 * @param opt.value the value of the input
 * @param opt.onChange the fn to apply for any change of the input
 * @param opt.onSubmit the fn to applay when submit
 */
export default function TranslationInput({
  value,
  skeleton,
  readyToNext,
  onChangeText,
  onPressDontKnow,
  onPressSubmit,
  onPressNext,
}) {
  return (
    <Layout>
      <SubmitInput
        label='Traduis le mot'
        value={value}
        disabled={skeleton || readyToNext}
        onChangeText={onChangeText}
        onPressSubmit={onPressSubmit}
        iconName='corner-down-left-outline'

      />
      <ButtonGroup disabled={skeleton} style={{ alignSelf: 'center' }}>
        <Button disabled={skeleton || readyToNext} onPress={onPressDontKnow} accessoryLeft={(props) => (<Icon {...props} name='person-delete-outline' />)} />
        <Button disabled={skeleton || !readyToNext} onPress={onPressNext} accessoryLeft={(props) => (<Icon {...props} name='arrow-forward-outline' />)} />
      </ButtonGroup>
    </Layout >

  )
}
