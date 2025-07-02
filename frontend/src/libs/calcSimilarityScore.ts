import Fuse from "fuse.js"; 
import { Circle } from "../types/Circle";

type CircleWithScore = Circle & { score: number };

export const calcSimilarityScore = (circleData: Circle[], keyword: string): CircleWithScore[] => {
  const fuse = new Fuse(circleData, {
    keys: ['name', 'detail'],
    threshold: 0.4, 
  });
  
  const results = fuse.search(keyword);
  const sortedData = results.map(res => ({
    ...res.item,
    score: 1 - (res.score ?? 0) 
  }));

  return sortedData;
};
