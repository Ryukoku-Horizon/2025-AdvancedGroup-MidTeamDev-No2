import CommonToggle from "../../common/toggle/toggle"

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

const FQAList=()=>{
    return (
        <div>
            {data.map((section, idx) => (
                <div key={idx}>
                  <h2 className="fqa-category">■ {section.category}</h2>
                  {section.items.map((item, i) => (
                    <CommonToggle title={item.question} key={i}>
                      <p>{item.answer}</p>
                    </CommonToggle>
                  ))}
                </div>
              ))}
        </div>
    )
}

export default FQAList;