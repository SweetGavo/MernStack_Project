import FileTree from "./fileTree";

export function createFileTree(input) {
  const fileTree = new FileTree();

  // First: create all nodes without assigning parents
  const nodeMap = new Map();
  for (const item of input) {
    fileTree.createNode(item.id, item.name, item.type, null);
    nodeMap.set(item.id, item);
  }

  // Now link parents manually
  for (const item of input) {
    if (item.parentId) {
      const parentNode = fileTree.findNodeById(item.parentId);
      const currentNode = fileTree.findNodeById(item.id);

      if (parentNode && currentNode) {
        parentNode.addChild(currentNode);
      }
    }
  }

  return fileTree;
}
