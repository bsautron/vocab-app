import React, { useEffect } from "react";
import Attempt from "../../components/attempt.component";
import { Layout } from "@ui-kitten/components";

/**
 * Display the list of attemps
 * @param opt.maxAttempt the maximum attempts for a translation
 * @param opt.attempts the list of attempt to display
 * @param opt.attempts the fn to apply when the limit if attempts is reached
 */
export default function AttemptList({
  maxAttepmt,
  attempts,
  skeleton,
  onReachLimit,
  ...props
}) {
  /** When a new attempt appear, check if we reach the limit */
  useEffect(() => {
    if (attempts.length >= maxAttepmt) {
      onReachLimit();
    }
  }, [attempts]);
  return (
    <Layout {...props}>
      {Array.from({ length: maxAttepmt }).map((_, i) => {
        return (
          <Attempt
            key={i}
            index={i}
            skeleton={skeleton}
            hidden={!attempts[i]}
            text={(attempts[i] || {}).text}
            valid={(attempts[i] || {}).valid}
            isLast={i === maxAttepmt - 1}
          ></Attempt>
        );
      })}
    </Layout>
  );
}
