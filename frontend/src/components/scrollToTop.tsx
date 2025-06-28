import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // ページの一番上にスクロール
  }, [pathname]);

  return null; // 画面には何も表示しない
}