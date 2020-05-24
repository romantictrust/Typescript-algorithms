export default (
  blocks: {
    capacity: number;
    stored: number;
    processList: typeof processes;
  }[],
  processes: { id: number; size: number; isDistributed: boolean }[]
) => {
  let j: number = 0;

  for (let i = 0; i < processes.length; i++) {
    while (j < blocks.length) {
      if (blocks[j].capacity - blocks[j].stored >= processes[i]?.size) {
        blocks[j].processList.push(processes[i]);
        blocks[j].stored += processes[i].size;
        processes[i].isDistributed = true;
        break;
      }

      // mod m will help in traversing the blocks from
      // starting block after we reach the end.
      j = (j + 1) % blocks.length;
    }
  }

  return { blocks, processes };
};
