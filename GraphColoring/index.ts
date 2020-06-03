import fs from "fs";
import { formMatrix } from "./Graph";
import colorsList from "./Colors";
import Greedy from "./Greedy";
import DS from "./DSatur";
import GIS from "./GIS";

// GraphEx1 CircleGraph
const initialGraphUrl = "./GraphColoring/input/CircleGraph.json";
const outputUrl = "./GraphColoring/output/ColoredGraph.txt";

export default function () {
  const initialGraphJson = fs.readFileSync(initialGraphUrl, "utf8");
  const initialGraph = JSON.parse(initialGraphJson);
  // const matrix = formMatrix(initialGraph);
  const result = GIS(initialGraph.vertices);
  writeResult(result);
}

const writeResult = (
  vertices: {
    id: number;
    edges: number[];
    colorId?: number;
    adjacentVerteicesColorDegree?: number;
  }[]
) => {
  fs.createWriteStream(outputUrl);

  let logger = fs.createWriteStream(outputUrl, {
    flags: "a",
  });

  const colorsUsed: number | undefined = vertices.sort((a, b) =>
    (a?.colorId ?? 0) < (b?.colorId ?? 0) ? 1 : -1
  )[0].colorId;

  logger.write(`${colorsUsed + 1} colors used\n`);

  vertices.map((vertex) =>
    logger.write(
      `Vertex id: ${vertex.id}, Vertex color: ${
        colorsList[vertex?.colorId ?? 0]
      }\n`
    )
  );
};
