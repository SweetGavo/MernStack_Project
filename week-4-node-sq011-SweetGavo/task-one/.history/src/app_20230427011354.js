import FileTree from "./fileTree";

export function createFileTree(input) {
  let array = [];

  for (let i = 0; i < input.length; i++) {
    //  sort input
    if (input[i].parentId === undefined) {
      array.push(input[i]);
      input.slice(input[i], 1);
      input.sort((a, b) => a.id - b.id);
    }
  }

  input = [...array, ...input];
  console.log(i);

  const fileTree = new FileTree();

  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode,
    );
  }

  return fileTree;
}
