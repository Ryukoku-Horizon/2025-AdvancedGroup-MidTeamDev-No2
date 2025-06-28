import { useEffect, useState } from "react";

const useToolbar=()=>{
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

    useEffect(() => {
        const handleSelectionChange = () => {
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
            setShowToolbar(false);
            return;
          }
      
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
      
          // ブロック外の選択は無視
          const editorRoot = document.querySelector(".editor");
          if (!editorRoot || !editorRoot.contains(range.startContainer)) {
            setShowToolbar(false);
            return;
          }
      
          // 表示位置と表示状態を更新
          setToolbarPosition({
            top: rect.top + window.scrollY - 40, // 上に少し余白
            left: rect.left + window.scrollX,
          });
          setShowToolbar(true);
        };
      
        document.addEventListener("selectionchange", handleSelectionChange);
        return () => {
          document.removeEventListener("selectionchange", handleSelectionChange);
        };
    }, []);
      
    return {showToolbar,toolbarPosition}
}

export default useToolbar