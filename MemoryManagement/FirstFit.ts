export default (
  blocks: {
    capacity: number;
    stored: number;
    processList: typeof processes;
  }[],
  processes: { id: number; size: number; isDistributed: boolean }[]
) => {
  for (let i = 0; i < processes.length; i++) {
    for (let j = 0; j < blocks.length; j++) {
      const blockCapacityLeft: number = blocks[j].capacity - blocks[j].stored;

      if (blockCapacityLeft >= processes[i]?.size) {
        blocks[j].processList.push(processes[i]);
        blocks[j].stored += processes[i].size;
        processes[i].isDistributed = true;
        break;
      }
    }
  }

  return { blocks, processes };
};
