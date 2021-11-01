import { Platform } from "react-native";
import escapeStringRegexp from "escape-string-regexp";
import * as Amplitude from "expo-analytics-amplitude";

export function normalize(str = "") {
  return (
    escapeStringRegexp(
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    ) || ""
  );
}

export function logEvents(page, eventName, data = {}) {
  if (Platform.OS === "web") {
    console.group(eventName);
    console.log("page:", page); /* dump variable */
    console.log("data:", data); /* dump variable */
    console.groupEnd();
  } else {
    Amplitude.logEventWithPropertiesAsync(eventName, {
      page: page,
      ...data,
    });
  }
}
