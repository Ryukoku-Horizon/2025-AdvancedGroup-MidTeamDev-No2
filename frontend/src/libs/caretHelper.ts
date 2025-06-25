export function getCaretPosition(el: HTMLElement) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;
    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);
    return preRange.toString().length;
  }

export function setCaretPosition(element: HTMLElement, position: number) {
    element.focus();
    
    const selection = window.getSelection();
    if (!selection) return;
  
    const range = document.createRange();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  
    let charIndex = 0;
    let found = false;
  
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const nextCharIndex = charIndex + node.textContent!.length;
  
      if (position <= nextCharIndex) {
        range.setStart(node, position - charIndex);
        range.collapse(true);
        found = true;
        break;
      }
  
      charIndex = nextCharIndex;
    }
  
    if (!found) {
      range.selectNodeContents(element);
      range.collapse(false); // 最後にカーソルを置く
    }
  
    selection.removeAllRanges();
    selection.addRange(range);
  }

export function getSelectionRangeInElement(element: HTMLElement) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return {start:0,end:0};
  
    const range = selection.getRangeAt(0);
  
    // 選択範囲が element の中か確認
    if (!element.contains(range.startContainer) || !element.contains(range.endContainer)) {
      return {start:0,end:0};
    }
  
    // 開始位置と終了位置を数値で取得
    const start = getOffsetWithin(element, range.startContainer, range.startOffset);
    const end = getOffsetWithin(element, range.endContainer, range.endOffset);
  
    return { start, end };
}

function getOffsetWithin(
    root: Node,
    targetNode: Node,
    targetOffset: number
  ): number {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let offset = 0;
  
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node === targetNode) {
        return offset + targetOffset;
      }
      offset += node.textContent?.length ?? 0;
    }
  
    return offset; // fallback
  }
  