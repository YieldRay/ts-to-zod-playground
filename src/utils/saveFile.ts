export function saveAsTextFile(textContent: string, fileName: string) {
    const blob = new Blob([textContent], { type: 'text/plain' })

    const url = URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName

    document.body.appendChild(anchor)

    anchor.click()

    document.body.removeChild(anchor)

    URL.revokeObjectURL(url)
}
