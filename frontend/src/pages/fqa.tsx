import Layout from "../components/Layout/Layout";
import FQAItem from "../components/pageComponents/fqa/fqaItem";

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