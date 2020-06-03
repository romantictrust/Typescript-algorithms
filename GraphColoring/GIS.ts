export default function (
  vertices: {
    id: number;
    edges: number[];
    colorId?: number;
    adjacentVerteicesColorDegree?: number;
  }[]
) {
  addColorFieldToGraph(vertices);

  let verticesLeftUncolored = vertices.filter(
    (vertex) => vertex.colorId === -1
  );

  let currentColor: number = 0;

  while (!!verticesLeftUncolored.length) {
    let vertexToColor: {
      vertexId: number;
      changeColor: boolean;
    } = chooseVertexToColor(vertices, verticesLeftUncolored, currentColor);

    if (vertexToColor.changeColor) {
      currentColor++;
    } else {
      let currentVertex = vertices.find(
        (vertex) => vertexToColor.vertexId === vertex.id
      );
      currentVertex.colorId = currentColor;
    }

    verticesLeftUncolored = vertices.filter((vertex) => vertex.colorId === -1);
  }
  return vertices;
}

function chooseVertexToColor(
  vertices: {
    id: number;
    edges: number[];
    colorId?: number;
    adjacentVerteicesColorDegree?: number;
  }[],
  verticesLeftUncolored: typeof vertices,
  previousColor: number
) {
  // Count adjacent vertex color degree for every uncolored vertex
  if (vertices.length !== verticesLeftUncolored.length) {
    let optimalVerteicesList: typeof vertices = [];
    verticesLeftUncolored.map((vertex) => {
      let isOptimalVertex = vertex.edges.find((adjacentVertexId) => {
        let adjacentVertex = vertices.find((v) => v.id === adjacentVertexId);
        return adjacentVertex.colorId === previousColor;
      });
      if (isOptimalVertex === undefined)
        optimalVerteicesList.push(vertex);
    });

    let optimalVertex = optimalVerteicesList.sort((a, b) =>
      a.edges.length > b.edges.length ? 1 : -1
    )[0];

    if (!!optimalVertex)
      return { vertexId: optimalVertex.id, changeColor: false };
    else return { vertexId: -1, changeColor: true };
  } else {
    let minimalAdjDegreeVertex = verticesLeftUncolored.sort((a, b) =>
      a.edges.length > b.edges.length ? 1 : -1
    )[0].id;
    return { vertexId: minimalAdjDegreeVertex, changeColor: false };
  }
}

function addColorFieldToGraph(
  vertices: {
    id: number;
    edges: number[];
    colorId?: number;
    adjacentVerteicesColorDegree?: number;
  }[]
) {
  return vertices.map((v) => {
    v.colorId = -1;
    v.adjacentVerteicesColorDegree = 0;
  });
}
