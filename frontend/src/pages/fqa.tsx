import Layout from "../components/Layout/Layout";
import Title from "../components/common/title/title";
import FQAList from "../components/pageComponents/fqa/FQAList";

const FQA = () => {
  return (
    <Layout>
      <div className="manage-container">
        <div className="main-content flex flex-col items-center justify-center">
            <section className="circle-info relative" style={{maxWidth:"650px"}}>
              <Title text="よくある質問" className="m-0" />
              <FQAList />
            </section>
        </div>
      </div>
    </Layout>
  );
};

export default FQA;