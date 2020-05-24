export default (
  blocks: {
    capacity: number;
    stored: number;
    processList: typeof processes;
  }[],
  processes: { id: number; size: number; isDistributed: boolean }[]
) => {
  for (let i = 0; i < processes.length; i++) {
    let bestIndex: number = -1;
    for (let j = 0; j < blocks.length; j++) {
      const blockCapacityLeft: number = blocks[j].capacity - blocks[j].stored;

      if (blockCapacityLeft >= processes[i].size) {
        if (bestIndex == -1) bestIndex = j;
        else if (
          blocks[bestIndex].capacity - blocks[bestIndex].stored >
          blockCapacityLeft
        ) {
          bestIndex = j;
        }
      }
    }
    if (bestIndex != -1) {
      blocks[bestIndex].processList.push(processes[i]);
      blocks[bestIndex].stored += processes[i].size;
      processes[i].isDistributed = true;
    }
  }

  return { blocks, processes };
};
