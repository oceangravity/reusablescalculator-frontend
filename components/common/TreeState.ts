import { computed, reactive, ref } from '@nuxtjs/composition-api'

interface TreeInstances {
  [instanceId: string]: { tree?: TreeNodeInterface; flatTree?: FlatTree; indentFunction?: Function }
}

interface FlatTree {
  [id: number]: TreeNodeInterface
}

const treeInstances = reactive<TreeInstances>({})

export default function useTree(instanceId?: string, node?: TreeNodeInterface | undefined, nodeId?: number, openNode?: number) {
  let flatTree: FlatTree
  const INSTANCE_ID = ref(instanceId)
  const NODE_ID = ref(nodeId)

  function init(instanceId?: string, refreshNode?: TreeNodeInterface, nodeId?: number) {
    if (instanceId) {
      // set node instance
      INSTANCE_ID.value = instanceId
      if (nodeId) NODE_ID.value = nodeId

      if (refreshNode || node) {
        if (refreshNode) node = refreshNode
        node = JSON.parse(JSON.stringify(node)) as TreeNodeInterface
        const traverse = (node: TreeNodeInterface): TreeNodeInterface[] => [node].concat(...node.children.map(traverse))
        flatTree = traverse(node).reduce((obj, item) => {
          obj[item.id] = item
          return obj
        }, {} as FlatTree)

        for (let key in flatTree) {
          flatTree[key].isOpen = false
        }

        if (openNode && flatTree[openNode]) {
          const newPath = getRawPath(openNode)
          newPath.forEach((item) => {
            flatTree[item].isOpen = true
          })
        }

        if (!treeInstances[instanceId]) {
          treeInstances[instanceId] = {}
        }

        treeInstances[instanceId].tree = reactive(node)
        treeInstances[instanceId].flatTree = flatTree
      }
    }
  }

  init(instanceId)

  function getRawPath(id: number): number[] {
    let path: number[] = []
    let current: TreeNodeInterface = flatTree[id]

    path.push(current.id)
    if (current.parent) {
      path = [...path, ...getRawPath(current.parent)]
    }

    return path
  }

  function openPath(id: number) {
    const newPath = getPath(id)
    newPath.forEach((item) => {
      open(item)
    })
  }

  function getPath(id: number = Number(NODE_ID.value), componentId: string = String(INSTANCE_ID.value)): number[] {
    let path: number[] = []
    let current: TreeNodeInterface = getNode(id, componentId)

    path.push(current.id)
    if (current.parent) {
      path = [...path, ...getPath(current.parent, componentId)]
    }

    return path
  }

  function getPathFull(id: number = Number(NODE_ID.value), componentId: string = String(INSTANCE_ID.value)): TreeNodeInterface[] {
    let path: TreeNodeInterface[] = []
    let current: TreeNodeInterface = getNode(id, componentId)

    path.push(JSON.parse(JSON.stringify(current)))
    if (current.parent) {
      path = [...path, ...getPathFull(current.parent, componentId)]
    }

    return path
  }

  function getNode(id: number = Number(NODE_ID.value), componentId: string = String(INSTANCE_ID.value)): TreeNodeInterface {
    return (treeInstances[componentId].flatTree as FlatTree)[id]
  }

  function toogleOpen(id: number = Number(NODE_ID.value), componentId: string = String(INSTANCE_ID.value)) {
    ;(treeInstances[componentId].flatTree as FlatTree)[id].isOpen = !(treeInstances[componentId].flatTree as FlatTree)[id].isOpen
  }

  function open(id: number = Number(NODE_ID.value), componentId: string = String(INSTANCE_ID.value)) {
    ;(treeInstances[componentId].flatTree as FlatTree)[id].isOpen = true
  }

  function close(id: number = Number(NODE_ID.value), componentId: string = String(INSTANCE_ID.value)) {
    ;(treeInstances[componentId].flatTree as FlatTree)[id].isOpen = false
  }

  function setIndent(indentFunction: Function, componentId: string = String(INSTANCE_ID.value)): void {
    if (!treeInstances[componentId]) {
      treeInstances[componentId] = {}
    }

    if (treeInstances[componentId]) {
      treeInstances[componentId].indentFunction = indentFunction
    }
  }

  return {
    init,
    open,
    close,
    getNode,
    getPath,
    getPathFull,
    openPath,
    setIndent,
    toogleOpen,
    indent: computed(() => (treeInstances[String(INSTANCE_ID.value)] ? (treeInstances[String(INSTANCE_ID.value)].indentFunction as Function)(getNode(NODE_ID.value)) : 'pl-4')),
    instance: computed(() => (INSTANCE_ID.value ? treeInstances[String(INSTANCE_ID.value)] : undefined)),
  }
}
