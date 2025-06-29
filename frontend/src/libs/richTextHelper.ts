import { Decoration, RichText } from "../types/block";

export function richTextsToHtml(richTexts: RichText[]): string {
  return richTexts.map(({ text, decoration }) => {
    let content = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const styles = [];
    if (decoration.bold) styles.push("font-weight:bold");
    if (decoration.underline) styles.push("text-decoration:underline");
    styles.push(`color:${decoration.color}`);

    return `<span style="${styles.join(';')}">${content}</span>`;
  }).join("");
}

  
export function parseHtmlToRichTexts(html: string): RichText[] {
    const temp = document.createElement("div");
    temp.innerHTML = html;
  
    const richTexts: RichText[] = [];
  
    function walk(node: Node, decorations:Decoration = { bold: false, underline: false,color:"black" }, href: string | null = null) {
      if (node.nodeType === Node.TEXT_NODE) {
        richTexts.push({
          text: node.textContent ?? "",
          decoration: { ...decorations },
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const newDecorations = { ...decorations };
        if (el.tagName === "STRONG" || el.tagName === "B") newDecorations.bold = true;
        if (el.tagName === "U") newDecorations.underline = true;
        const newHref = el.tagName === "A" ? el.getAttribute("href") : href;
  
        for (const child of Array.from(el.childNodes)) {
          walk(child, newDecorations, newHref);
        }
      }
    }
  
    for (const child of Array.from(temp.childNodes)) {
      walk(child);
    }
  
    return richTexts;
}
  
export function splitRichTextsAtPosition(richTexts: RichText[], position: number): [RichText[], RichText[]] {
    const left: RichText[] = [];
    const right: RichText[] = [];
    let currentPos = 0;

    for (const rt of richTexts) {
        const len = rt.text.length;

        if (currentPos + len <= position) {
            left.push(rt);
        } else if (currentPos >= position) {
            right.push(rt);
        } else {
            const splitIndex = position - currentPos;
            const leftPart: RichText = {
                ...rt,
                text: rt.text.slice(0, splitIndex)
            };
            const rightPart: RichText = {
                ...rt,
                text: rt.text.slice(splitIndex)
            };
            if (leftPart.text) left.push(leftPart);
            if (rightPart.text) right.push(rightPart);
        }

        currentPos += len;
    }

    return [left, right];
}

export function mergeRichTexts(a: RichText[], b: RichText[]): RichText[] {
    if (a.length === 0) return b;
    if (b.length === 0) return a;

    const lastA = a[a.length - 1];
    const firstB = b[0];

    // 同じ装飾ならマージ
    if (
        lastA.decoration.bold === firstB.decoration.bold &&
        lastA.decoration.underline === firstB.decoration.underline
    ) {
        const merged = {
            ...lastA,
            text: lastA.text + firstB.text
        };
        return [...a.slice(0, -1), merged, ...b.slice(1)];
    } else {
        return [...a, ...b];
    }
}
