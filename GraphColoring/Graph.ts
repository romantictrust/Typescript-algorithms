export function formMatrix(initialGraph: {
  vertices: { id: number; edges: number[] }[];
}) {
  const vertexAmount = initialGraph.vertices.length;
  let emptyMatrix = createEmptyMatrix(vertexAmount);
  let matrix = fillMatrix(initialGraph, emptyMatrix);
  return matrix;
}

function createEmptyMatrix(vertexAmount: number) {
  let matrix: number[][] = [];
  for (var i = 0; i < vertexAmount; i++) {
    matrix[i] = [];
    for (var j = 0; j < vertexAmount; j++) {
      matrix[i][j] = i === j ? 1 : 0;
    }
  }
  return matrix;
}

function fillMatrix(initialGraph: any, matrix: number[][]) {
  initialGraph.vertices.map((vertex: { id: number; edges: number[] }) => {
    vertex.edges.map((edge: number) => {
      matrix[vertex.id][edge] = 1;
      matrix[edge][vertex.id] = 1;
    });
  });
  return matrix;
}
