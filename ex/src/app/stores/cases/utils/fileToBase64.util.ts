export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    /** Split(',')[1] is used to remove the mime-type
     * See more: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
     */
    reader.onload = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = (error) => reject(error)
  })
