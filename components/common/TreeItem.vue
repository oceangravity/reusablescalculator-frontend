<template>
  <ul v-if="node.children" :class="indent">
    <li v-for="(item, index) in node.children" :key="index">
      <slot name="item" :item="item" :props="props">{{ item.name }}</slot>
      <template v-if="item.children.length && item.isOpen">
        <tree-item :node-id="item.id" :uuid="props.uuid">
          <template #item="{ item }">
            <slot name="item" :item="item" :props="props" v-if="item">{{ item.name }}</slot>
          </template>
        </tree-item>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from '@nuxtjs/composition-api'
import { defineEmits } from '@vue/runtime-dom'
import useTree from './TreeState'

// props
type OpenMethod = 'toggle' | 'unique'
interface Props {
  uuid: string
  nodeId: number
}

const props = withDefaults(defineProps<Props>(), {})

// emits
const emit = defineEmits<{
  (event: 'update:children', item: TreeNodeInterface[]): void
}>()

// tree
const { getNode, open, init, indent } = useTree(props.uuid, undefined, props.nodeId)

onMounted(() => {
  // console.log(props)
})

// computed
const node = ref(getNode())

// methods
const showPath = () => {
  // console.log(getPath(id))
}

// watchers
watch(
  () => props.nodeId,
  (nodeId) => {
    init(props.uuid, undefined, nodeId)
    node.value = getNode()
  }
)
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TreeItem',
})
</script>
