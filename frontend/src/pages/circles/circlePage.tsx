import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import useCircleData from "../../hooks/useSingleCircle";
import CenterLoader from "../../components/common/loader/centerLoader";
import usePageData from "../../hooks/usePageData";
import Title from "../../components/common/title/title";
import { useEffect, useRef } from "react";
import { richTextsToHtml } from "../../libs/richTextHelper";

const CirclePage=()=>{
    const { id } = useParams();
    const {circleData,loading} = useCircleData(id);
    const {pageData,loading:pageLoad} = usePageData(id);
    const inputRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        pageData.forEach((text, i) => {
            const el = inputRefs.current[i];
            const html = richTextsToHtml(text.richTexts) 
            if(el && el.innerHTML !== html){
                el.innerHTML =  html;
            }
            });
      }, [pageData]);

    return (
        <Layout>
            <div className="manage-container">
                <div className="main-content flex flex-col items-center justify-center">
                    <section className="circle-info relative" style={{maxWidth:"650px"}}>
                    {!loading && !pageLoad && circleData && <div>
                        <Title text={circleData.name} className={circleData.image!=="" ? "relative l-2 m-0" : "m-0 relative l-3"} />
                        {circleData.image!==""&& <img src={circleData.image} className="circle-cover" />}
                        {circleData.image===""&& <div className={circleData.image!=="" ? "border-b h-1 border-gray-2 my-2" : "border-b h-1 border-gray-2 m-0"} />}
                        {pageData.map((block,i)=>(
                            <div
                            key={i}
                            ref={(el) => {
                                inputRefs.current[i] = el;
                                }}
                                className={`${block.type}`}
                            />
                        ))}
                    </div>}
                    {(loading || pageLoad) && <CenterLoader />}
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default CirclePage;