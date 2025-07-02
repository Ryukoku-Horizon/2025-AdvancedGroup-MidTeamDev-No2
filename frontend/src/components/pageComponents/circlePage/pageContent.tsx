import { useEffect, useRef } from "react";
import usePageData from "../../../hooks/usePageData";
import CenterLoader from "../../common/loader/centerLoader";
import { richTextsToHtml } from "../../../libs/richTextHelper";
import useSingleCircleData from "../../../hooks/useSingleCircle";
import Title from "../../common/title/title";

type Props={
    circleId:string | undefined;
}

const PageContent=({circleId}:Props)=>{
    const {circleData,loading} = useSingleCircleData(circleId);
    const {pageData,loading:pageLoad} = usePageData(circleId);
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
    )
}

export default PageContent;