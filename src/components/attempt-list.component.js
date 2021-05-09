import React, { useEffect } from 'react'
import Attempt from './attempt.component'
import { Layout } from '@ui-kitten/components'

/**
 * Display the list of attemps
 * @param opt.maxAttempt the maximum attempts for a translation
 * @param opt.attempts the list of attempt to display
 * @param opt.attempts the fn to apply when the limit if attempts is reached
 */
export default function AttemptList({ maxAttepmt, attempts, onReachLimit }) {
  /** When a new attempt appear, check if we reach the limit */
  useEffect(() => {
    if (attempts.length >= maxAttepmt) {
      onReachLimit()
    }
  }, [attempts])
  return (
    <Layout>
      {Array.from({ length: maxAttepmt }).map((_, i) => {
        return (
          <Attempt
            key={i}
            hidden={!attempts[i]}
            text={(attempts[i] || {}).text}
            valid={(attempts[i] || {}).valid}
          ></Attempt>
        )
      })}
    </Layout>
  )
}
