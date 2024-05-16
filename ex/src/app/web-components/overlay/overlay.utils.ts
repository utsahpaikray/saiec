export function applyStyles(
  destination: CSSStyleDeclaration,
  source: Partial<CSSStyleDeclaration>
): CSSStyleDeclaration {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = source[key] as string
    }
  }
  return destination
}

export function calculateOverflow(length: number, ...overflows: number[]) {
  return overflows.reduce((currentValue, currentOverflow) => {
    return currentValue - Math.max(currentOverflow, 0)
  }, length)
}

export function coerceNumberToPixelValue(
  value: string | number | null | undefined
): string {
  if (value === null || value === undefined) {
    return ''
  }
  return typeof value === 'string' ? value : `${value}px`
}

export function getRoundedRect(rect: DOMRect): DOMRect {
  return {
    ...rect,
    top: Math.floor(rect.top),
    right: Math.floor(rect.right),
    bottom: Math.floor(rect.bottom),
    left: Math.floor(rect.left),
    width: Math.floor(rect.width),
    height: Math.floor(rect.height)
  }
}
