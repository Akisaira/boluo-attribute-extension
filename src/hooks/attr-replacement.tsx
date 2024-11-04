export interface ReplacementSuggestion {
  start: number;
  end: number;
  original: string;
  replacement: string;
}

export const getReplacementSuggestions = (
  text: string,
  attributes: Record<string, number>
): ReplacementSuggestion[] => {
  if (text === '' || Object.keys(attributes).length === 0) {
    return []
  }
  const pattern = new RegExp(Object.keys(attributes).join('|'), 'g')
  const matches = text.matchAll(pattern)
  const suggestions: ReplacementSuggestion[] = []
  for (const item of matches) {
    const original = item[0]
    const replacement = attributes[original].toString()
    suggestions.push({
      start: item.index,
      end: item.index + original.length,
      original,
      replacement
    })
  }
  return suggestions
}

export const replaceAttribute = (
  text: string,
  suggestion: ReplacementSuggestion
): string => {
  return (
    text.slice(0, suggestion.start) +
    suggestion.replacement +
    text.slice(suggestion.end)
  )
}
