export default function (
  vertices: {
    id: number;
    edges: number[];
    colorId?: number;
  }[]
) {
  addColorFieldToGraph(vertices);

  for (let i = 0; i < vertices.length; i++) {
    let currentColor: number = 0;
    for (let j = 0; j < vertices[i].edges.length; j++) {
      let adjacentVertex = vertices.find(
        (vertex) => vertex.id === vertices[i].edges[j]
      );
      if (currentColor === adjacentVertex?.colorId) {
        currentColor++;
        j = -1;
      }
    }
    vertices[i]!.colorId = currentColor;
  }
  return vertices;
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
  });
}
