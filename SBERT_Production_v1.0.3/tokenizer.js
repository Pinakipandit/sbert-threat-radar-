const CHARS = " abcdefghijklmnopqrstuvwxyz0123456789-_./\\:|=+*[]{}()<>#@$'\";!?%&^\n\t";
const vocab = {};
for (let i = 0; i < CHARS.length; i++) { vocab[CHARS[i]] = i + 4; }

export function tokenizeTextLocal(text, maxLen = 256) {
  const inputIds = new Array(maxLen).fill(0);
  inputIds[0] = 2; // Seed [CLS] token
  const lowerText = String(text).toLowerCase();
  let idx = 1;
  for (let i = 0; i < lowerText.length && idx < maxLen - 1; i++) {
    inputIds[idx] = vocab[lowerText[i]] || 1; // Map to ID or fallback to [UNK]
    idx++;
  }
  inputIds[idx] = 3; // Append [SEP] token
  return { inputIds };
}
