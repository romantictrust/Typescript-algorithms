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

  while (!!verticesLeftUncolored.length) {
    let currentVertexId: number = chooseVertexToColor(
      vertices,
      verticesLeftUncolored
    );
    let currentVertex:
      | {
          id: number;
          edges: number[];
          colorId?: number;
          adjacentVerteicesColorDegree?: number;
        }
      | undefined = vertices.find((vertex) => vertex.id === currentVertexId);
    let currentColor: number = 0;
    for (let i = 0; i < currentVertex.edges.length; i++) {
      let adjacentVertex = vertices.find(
        (vertex) => vertex.id === currentVertex?.edges[i]
      );
      if (currentColor === adjacentVertex?.colorId) {
        currentColor++;
        i = -1;
      }
    }
    currentVertex!.colorId = currentColor;
    verticesLeftUncolored = vertices.filter(
      (vertex) => vertex.colorId === -1
    );
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
  verticesLeftUncolored: typeof vertices
) {
  let currentVertex: number = 0;

  // Count adjacent vertex color degree for every uncolored vertex
  verticesLeftUncolored.map((vertex) => {
    let adjacentVerteicesColorDegree: number = 0;
    vertex.edges.map((adjacentVertexId) => {
      let adjacentVertex:
        | {
            id: number;
            edges: number[];
            colorId?: number;
            adjacentVerteicesColorDegree?: number;
          }
        | undefined = vertices.find((vertex) => vertex.id === adjacentVertexId);
      if (adjacentVertex.colorId !== -1) {
        adjacentVerteicesColorDegree++;
      }
    });
    vertex.adjacentVerteicesColorDegree = adjacentVerteicesColorDegree;
  });

  // Sort by adjacent vertex color degree
  verticesLeftUncolored.sort((a, b) =>
    (a?.adjacentVerteicesColorDegree ?? 0) <
    (b?.adjacentVerteicesColorDegree ?? 0)
      ? 1
      : -1
  );

  // Find optimal by adjacent vertex color degree verteices
  const optimalDegree = verticesLeftUncolored[0].adjacentVerteicesColorDegree;
  const optimalVerteices = verticesLeftUncolored.filter(
    (vertex) => vertex.adjacentVerteicesColorDegree === optimalDegree
  );

  // If there are equaly optimal by adjacent vertex color degree verteices we find optimal by the amount of adjacent vertex
  if (optimalVerteices.length > 1) {
    optimalVerteices.sort((a, b) => (a.edges.length < b.edges.length ? 1 : -1));
  }

  return optimalVerteices[0].id;
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
