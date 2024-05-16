export const getKeyByStringValue = (value: string | null, enumObject: any) => {
  return (
    Object.keys(enumObject).find((key) => enumObject[key] === value) || null
  )
}
