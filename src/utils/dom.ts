let allSelectors: string[] = [];

// a list of css selectors for detecting focusable elements
const rootSelector = '#ssdevtools-root'
const focusableQuery = ['input', 'select']
  .map(s =>  rootSelector + ' ' + s + ':not([disabled])')
  .join(',')
  
const searchQuery = ['[id]', '[class]']
  .map(s =>   'body > div:not(' + rootSelector + ') ' + s)
  .join(',')
 
export function focusNext(lastElement: HTMLElement, offset: number, complete?: { (foundNext: boolean): void }) {
  const focusables = document.querySelectorAll(focusableQuery)
  
  for (let i = 0, len = focusables.length; i < len; i++) {
    const focusable = focusables[i]
    if (focusable === lastElement) {
      const nextIndex = i + offset 
      // focus on next element in range
      if (nextIndex > -1 && nextIndex < len) { 
        (focusables[nextIndex] as HTMLElement).focus()
         complete && complete(true)
         return;
      } 
      break;
    }
  } 
  
  complete && complete(false)
}

export function focusById(key: string) {
  const selector = `[data-id="${key}"]`
  const editor = document.querySelector(selector) as HTMLElement
  if (editor) {
    editor.focus()
  }
}

export function updateSelectors() {
  const selectors: string[] = [];
  const allElements = document.querySelectorAll(searchQuery);
  for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i] 
    
    // add classes
    const classes = element.classList
    for (let j = 0; j < classes.length; j++) {
      const className = classes[j];
      if (!className) {
        continue;
      }
      
      const cls = '.' + className
      if (cls && selectors.indexOf(cls) === -1) {
        selectors.push(cls)
      }
    }
    
    const id = element.id
    if (id) {
      const idSelector = '#' + id
      if (selectors.indexOf(idSelector) === -1) {
        selectors.push(idSelector)
      }
    }
  } 
  
  selectors.sort()
  allSelectors = selectors
}

export function findSelectors(text: string) {
  updateSelectors()   
  
  const textToLower = text.toLowerCase().trim()
  return allSelectors.filter(selector => selector.toLowerCase().indexOf(textToLower) !== -1) 
}

export function getAncestors(val: Node) {
  let node = val as Node | null;
  const newTree = [val];
  while ((node = node!.parentNode) && node !== document) {
    newTree.push(node)
  }
  return newTree.reverse();
}

export function selectorForElement(r: HTMLElement) {
  if (r.id) {
    return `#${r.id}`
  }
  if (r.classList.length) {
    return Array.prototype.slice
      .call(r.classList)
      .map((c: string) => '.' + c)
      .join('')
  }
  if (r.hasAttribute('name')) {
    return `[name="${r.getAttribute('name')}"]`
  }
  return r.tagName
}