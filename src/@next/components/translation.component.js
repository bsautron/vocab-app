import { Button, Card, Icon } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { CardStyles } from "../../styles";
import AttemptList from "./attempt-list.component";
import ContextTrad from "./context-trad.component";
import TranslationInput from "./translation-input.component";
import TranslationTitle from "./translation-title.component";

/**
 * Check if the givving text correspond to the real trad
 * @param trad the real traduction - can be several possible trad if separated by '/'
 * @param text the proposal
 */
function isValid(trad, text) {
  const sp = trad.split("/");

  for (const s of sp) {
    if (s === text) return true;
  }
  return false;
}
/**
 * The entiere card for the translation of one word
 * @param opt.word all information about the word
 * @param opt.onChangeWord the fn to applay we need the change word
 */
export default function Translation({ navigation, word, onChangeWord }) {
  /** the array of attempts for the word */
  const [attempts, setAttempts] = useState([]);
  /** use for shoing the traduction of the word */
  const [showTrad, setDisplayTrad] = useState(false);
  /** if the use don't know the trad */
  const [dontKnow, setDontKnow] = useState(false);
  /** when we are ready to change word  */
  const [goToChange, letsGoToChange] = useState(false);
  /** the input of the proposal trad by the use */
  const [textInput, setInput] = useState("");

  /**
   * Push the attempt to the list of all attempts
   * @param valid if the attempt is correct
   * @param wordAttempt the text of the attempt
   */
  const pushAttempt = (valid, wordAttempt) => {
    setAttempts([
      ...attempts,
      {
        valid,
        text: wordAttempt,
      },
    ]);
    setDisplayTrad(valid);
  };

  /** When a new attempt appear, clear the input */
  useEffect(() => {
    setInput("");
  }, [attempts]);

  /**
   * When we are triggering the changing word, clear all and all the changeWord from the parent
   * Triggered when use click on Next
   */
  useEffect(() => {
    if (goToChange) {
      letsGoToChange(false);
      setDontKnow(false);
      setDisplayTrad(false);
      setAttempts([]);
      setInput("");
      onChangeWord();
    }
  }, [goToChange]);

  /**
   * Show the traduction
   * we show trad when:
   * - the user click on don't know
   * - the user reach the attpemt limit
   * - the last push attempt is valid
   */
  useEffect(() => {
    if (dontKnow) {
      setDisplayTrad(true);
    }
  }, [dontKnow]);

  const onNewAttempt = (wordAttempt) => {
    pushAttempt(isValid(word.es, wordAttempt), wordAttempt);
  };

  return (
    <Card style={styles.card}>
      {showTrad && <ContextTrad navigation={navigation} word={word} />}
      <TranslationTitle
        style={{ marginBottom: 20 }}
        skeleton={!word}
        word={word?.fr}
        trad={word?.es}
        showTrad={showTrad}
      />
      <AttemptList
        style={{ marginBottom: 10 }}
        skeleton={!word}
        maxAttepmt={3}
        attempts={attempts}
        onReachLimit={() => setDontKnow(true)}
      />
      <TranslationInput
        value={textInput}
        readyToNext={showTrad}
        skeleton={!word}
        onChangeText={setInput}
        onPressDontKnow={() => setDontKnow(true)}
        onPressNext={() => letsGoToChange(true)}
        onPressSubmit={onNewAttempt}
        disabled={showTrad}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    ...CardStyles.cardDefault,
  },
});
