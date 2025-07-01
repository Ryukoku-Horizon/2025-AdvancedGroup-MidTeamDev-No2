import Layout from "../components/Layout/Layout";
import useCircles from "../hooks/useCircles";
import SingleCircleCard from "../components/pageComponents/home/singleCIrcleCard"; // Linkなしバージョン想定
import CenterLoader from "../components/common/loader/centerLoader";
import CommonSearchField from "../components/common/textField/commonSerchField";
import { useState } from "react";

const Result = () => {
  const { circleData, loading } = useCircles(false,6, 0);

  // 例: 検索絞り込み（適宜書き換え）
  const searchResults = circleData; // とりあえず全件表示
  const [value,setValue] = useState("")

  return (
    <Layout>
      <CommonSearchField value={value} onChange={(e)=>{setValue(e.target.value)}} />
      <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2em", marginBottom: "20px" }}>検索結果</h1>
        {loading ? (
          <CenterLoader />
        ) : searchResults.length === 0 ? (
          <p>条件に合うサークルが見つかりませんでした。</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {searchResults.map((circle) => (
              // LinkなしのSingleCircleCardをそのまま表示
              <SingleCircleCard key={circle.id} circleData={circle} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Result;
