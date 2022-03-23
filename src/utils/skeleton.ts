export const traverseElementTree = (entry: Element) => {
  const result = []
  const traverse = (node: ChildNode) => {
    if (node.childNodes.length) {
      node.childNodes.forEach((child) => {
        if (child.nodeType === 1) {
          result.push(child)
          traverse(child)
        }
      })
    }
  }
  traverse(entry)
  return result
}

export const SKELETON = ['theme-icon', 'notes', 'profile-links', 'profile']
