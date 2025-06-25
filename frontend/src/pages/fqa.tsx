import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import "../components/pageComponents/fqa/fqa.css";

const FQAItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fqa-border">
      <div className="fqa-header" onClick={() => setOpen(!open)}>
        <h3 className="fqa-question">{question}</h3>
        <span className={`fqa-icon ${open ? "open" : ""}`}>▼</span>
      </div>
      <div className={`fqa-answer-box ${open ? "open" : ""}`}>
        <p className="fqa-answer">{answer}</p>
      </div>
    </div>
  );
};

const FQA = () => {
  const data = [
    {
      category: "会員登録",
      items: [
        { question: "Q. 無料ですか？", answer: "A. はい、無料です。" },
        { question: "Q. 使えますか？", answer: "A. 登録後すぐ使えます。" },
      ],
    },
    {
      category: "その他",
      items: [
        { question: "Q. 問い合わせ先は？", answer: "A. サポートまでご連絡ください。" },
      ],
    },
        {
      category: "AI診断について",
      items: [
        { question: "Q. 質問タイトル", answer: "A. 回答" },
      ],
    },
        {
      category: "その他",
      items: [
        { question: "Q. 質問タイトル", answer: "A. 回答" },
        { question: "Q. 質問タイトル", answer: "A. 回答" },
      ],
    },
  ];

  return (
    <Layout>
      <div className="fqa-wrapper">
        <h1 className="fqa-title">よくある質問</h1>
        {data.map((section, idx) => (
          <div key={idx}>
            <h2 className="fqa-category">■ {section.category}</h2>
            {section.items.map((item, i) => (
              <FQAItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FQA;