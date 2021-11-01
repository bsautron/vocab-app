function getIndexes(text, keyWords = []) {
  const uniqWords = Array.from(new Set(keyWords));

  const matches = [];

  uniqWords.forEach((word) => {
    let match = null;

    const reg = new RegExp(word, "ig");
    while ((match = reg.exec(text))) {
      matches.push({
        word,
        startIndex: match.index,
        endIndex: match.index + word.length,
      });
    }
  });
  return matches;
}

function mergeIndexes(indexes) {
  const newIndexes = [];
  for (const index of indexes) {
    const intersection = newIndexes.findIndex((newIndex) => {
      if (index.startIndex === newIndex.startIndex) return true;
      if (index.endIndex === newIndex.endIndex) return true;
      if (
        index.startIndex <= newIndex.startIndex &&
        index.endIndex >= newIndexes.startIndex
      )
        return true;
      if (
        index.endIndex >= newIndex.endIndex &&
        index.startIndex <= newIndexes.endIndex
      )
        return true;
    });
    if (intersection === -1) {
      newIndexes.push({ ...index });
    } else {
      const indexToReplace = newIndexes[intersection];
      newIndexes[intersection] = {
        word: `${indexToReplace.word} ${index.word}`,
        startIndex: Math.min(index.startIndex, indexToReplace.startIndex),
        endIndex: Math.max(index.endIndex, indexToReplace.endIndex),
      };
    }
  }
  return newIndexes.sort((a, b) => a.startIndex - b.startIndex);
}
const tttt = "at the airport";
console.log(mergeIndexes(getIndexes(tttt, ["a"])));
