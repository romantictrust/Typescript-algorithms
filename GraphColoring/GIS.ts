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
  // Check if adj to current vertices is not the same color as current
  if (vertices.length !== verticesLeftUncolored.length) {
    let optimalVerteicesList: typeof vertices = [];
    verticesLeftUncolored.map((vertex) => {
      let isOptimalVertex = vertex.edges.find((adjacentVertexId) => {
        let adjacentVertex = vertices.find((v) => v.id === adjacentVertexId);
        return adjacentVertex.colorId === previousColor;
      });
      if (isOptimalVertex === undefined) optimalVerteicesList.push(vertex);
    });

    // Vertex with lowest degree of adj vertices
    let optimalVertex = optimalVerteicesList.sort((a, b) =>
      a.edges.length > b.edges.length ? 1 : -1
    )[0];

    // If such a vertex exists we send it to color, otherwise wi change color
    if (!!optimalVertex)
      return { vertexId: optimalVertex.id, changeColor: false };
    else return { vertexId: -1, changeColor: true };
  } else {
    // Case for non-colored graph
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
