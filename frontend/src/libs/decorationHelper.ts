import { Block, Color, RichText } from "../types/block";

export const applyBoldToSelection = (
  el: HTMLDivElement,
  blocks: Block[],
  blockIndex: number
) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!el.contains(range.commonAncestorContainer)) return;

  const startOffset = getOffsetWithin(el, range.startContainer, range.startOffset);
  const endOffset = getOffsetWithin(el, range.endContainer, range.endOffset);

  const block = blocks[blockIndex];

  let current = 0;

  // まず選択範囲内にあるrichTextでboldがfalseのものがあるかどうかチェック
  let allBold = true;

  for (const rt of block.richTexts) {
    const rtLen = rt.text.length;
    const rtStart = current;
    const rtEnd = current + rtLen;

    if (endOffset > rtStart && startOffset < rtEnd) {
      // 選択範囲に重なっている
      const selStartInRt = Math.max(0, startOffset - rtStart);
      const selEndInRt = Math.min(rtLen, endOffset - rtStart);
      const selectedText = rt.text.slice(selStartInRt, selEndInRt);

      if (selectedText.length > 0 && !rt.decoration.bold) {
        allBold = false;
        break;
      }
    }

    current += rtLen;
  }

  // 実際の置き換え処理
  const newRichTexts: RichText[] = [];
  current = 0;
  for (const rt of block.richTexts) {
    const rtLen = rt.text.length;
    const rtStart = current;
    const rtEnd = current + rtLen;

    if (endOffset <= rtStart || startOffset >= rtEnd) {
      // 選択範囲外：そのまま
      newRichTexts.push(rt);
    } else {
      const selStartInRt = Math.max(0, startOffset - rtStart);
      const selEndInRt = Math.min(rtLen, endOffset - rtStart);

      // 前
      if (selStartInRt > 0) {
        newRichTexts.push({
          ...rt,
          text: rt.text.slice(0, selStartInRt),
        });
      }

      // 中（選択部分）
      newRichTexts.push({
        ...rt,
        text: rt.text.slice(selStartInRt, selEndInRt),
        decoration: {
          ...rt.decoration,
          bold: !allBold, // ← すべてboldなら解除、そうでなければ適用
        },
      });

      // 後
      if (selEndInRt < rtLen) {
        newRichTexts.push({
          ...rt,
          text: rt.text.slice(selEndInRt),
        });
      }
    }

    current += rtLen;
  }

  const newPlainText = newRichTexts.map((rt) => rt.text).join("");
  return { plainText: newPlainText, richTexts: newRichTexts };
};

export const applyUnderlineToSelection = (
  el: HTMLDivElement,
  blocks: Block[],
  blockIndex: number
) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!el.contains(range.commonAncestorContainer)) return;

  const startOffset = getOffsetWithin(el, range.startContainer, range.startOffset);
  const endOffset = getOffsetWithin(el, range.endContainer, range.endOffset);

  const block = blocks[blockIndex];
  let current = 0;

  // まず選択範囲内にあるrichTextでboldがfalseのものがあるかどうかチェック
  let allUnderline = true;

  for (const rt of block.richTexts) {
    const rtLen = rt.text.length;
    const rtStart = current;
    const rtEnd = current + rtLen;

    if (endOffset > rtStart && startOffset < rtEnd) {
      // 選択範囲に重なっている
      const selStartInRt = Math.max(0, startOffset - rtStart);
      const selEndInRt = Math.min(rtLen, endOffset - rtStart);
      const selectedText = rt.text.slice(selStartInRt, selEndInRt);

      if (selectedText.length > 0 && !rt.decoration.underline) {
        allUnderline = false;
        break;
      }
    }

    current += rtLen;
  }

  // 実際の置き換え処理
  const newRichTexts: RichText[] = [];
  current = 0;
  for (const rt of block.richTexts) {
    const rtLen = rt.text.length;
    const rtStart = current;
    const rtEnd = current + rtLen;

    if (endOffset <= rtStart || startOffset >= rtEnd) {
      // 選択範囲外：そのまま
      newRichTexts.push(rt);
    } else {
      const selStartInRt = Math.max(0, startOffset - rtStart);
      const selEndInRt = Math.min(rtLen, endOffset - rtStart);

      // 前
      if (selStartInRt > 0) {
        newRichTexts.push({
          ...rt,
          text: rt.text.slice(0, selStartInRt),
        });
      }

      // 中（選択部分）
      newRichTexts.push({
        ...rt,
        text: rt.text.slice(selStartInRt, selEndInRt),
        decoration: {
          ...rt.decoration,
          underline: !allUnderline, // ← すべてboldなら解除、そうでなければ適用
        },
      });

      // 後
      if (selEndInRt < rtLen) {
        newRichTexts.push({
          ...rt,
          text: rt.text.slice(selEndInRt),
        });
      }
    }

    current += rtLen;
  }

  const newPlainText = newRichTexts.map((rt) => rt.text).join("");
  return { plainText: newPlainText, richTexts: newRichTexts };
};

export const applyColorToSelection = (el:HTMLDivElement,blocks:Block[],blockIndex: number,color:Color) => {
  
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (!el.contains(range.commonAncestorContainer)) return;

  const startOffset = getOffsetWithin(el, range.startContainer, range.startOffset);
  const endOffset = getOffsetWithin(el, range.endContainer, range.endOffset);

  const block = blocks[blockIndex];

  const newRichTexts: RichText[] = [];

  let current = 0;
  for (const rt of block.richTexts) {
    const rtLen = rt.text.length;

    const rtStart = current;
    const rtEnd = current + rtLen;

    if (endOffset <= rtStart || startOffset >= rtEnd) {
      // 選択範囲外：そのまま
      newRichTexts.push(rt);
    } else {
      // 重なっている範囲：分割処理
      const selStartInRt = Math.max(0, startOffset - rtStart);
      const selEndInRt = Math.min(rtLen, endOffset - rtStart);

      // 前
      if (selStartInRt > 0) {
        newRichTexts.push({
          ...rt,
          text: rt.text.slice(0, selStartInRt)
        });
      }

      // 選択範囲 → 装飾変更
      newRichTexts.push({
        ...rt,
        text: rt.text.slice(selStartInRt, selEndInRt),
        decoration: {
          ...rt.decoration,
          color
        }
      });

      // 後
      if (selEndInRt < rtLen) {
        newRichTexts.push({
          ...rt,
          text: rt.text.slice(selEndInRt)
        });
      }
    }

    current += rtLen;
  }

  const newPlainText = newRichTexts.map(rt => rt.text).join("");
  return {plainText: newPlainText, richTexts: newRichTexts}
};

function getOffsetWithin(root: Node, targetNode: Node, targetOffset: number): number {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let offset = 0;
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node === targetNode) return offset + targetOffset;
      offset += node.textContent?.length ?? 0;
    }
    return offset;
}
  
export function getSelectedBlockIndex(inputRefs: (HTMLDivElement | null)[]): number | null {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
  
    const range = selection.getRangeAt(0);
    const node = range.startContainer;
  
    for (let i = 0; i < inputRefs.length; i++) {
      const el = inputRefs[i];
      if (el && el.contains(node)) {
        return i;
      }
    }
  
    return null;
  }
  