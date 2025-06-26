import { RichText } from "../types/block";

export function richTextsToHtml(richTexts: RichText[]): string {
    return richTexts.map(({ text, decoration, href }) => {
      let content = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
  
      if (decoration.bold) content = `<strong>${content}</strong>`;
      if (decoration.underline) content = `<u>${content}</u>`;
      if (decoration.h1) content = `<h1>${content}</h1>`;
      if (href) content = `<a href="${href}">${content}</a>`;
  
      return content;
    }).join("");
}
  
export function parseHtmlToRichTexts(html: string): RichText[] {
    const temp = document.createElement("div");
    temp.innerHTML = html;
  
    const richTexts: RichText[] = [];
  
    function walk(node: Node, decorations = { bold: false, underline: false,h1:false,h2:false,h3:false }, href: string | null = null) {
      if (node.nodeType === Node.TEXT_NODE) {
        richTexts.push({
          text: node.textContent ?? "",
          decoration: { ...decorations },
          href,
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
  