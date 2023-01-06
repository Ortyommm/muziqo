export function safelyParseJSON(testJson: string | null | undefined) {
  let json = null;
  if (!testJson) return json;

  try {
    json = JSON.parse(testJson);
  } catch (e) {}

  return json;
}
