<template>
  <ul>
    <li>
      <slot name="root" :item="props.data" :props="props">
        <div class="relative" @mousedown="open(props.data.id)">
          <div class="cursor-pointer select-none">{{ props.data.name }}</div>
        </div>
      </slot>

      <tree-item :node-id="props.data.id" :uuid="uuid">
        <template #item="{ item, props }">
          <slot name="item" :item="item" :props="props" />
        </template>
      </tree-item>
    </li>
  </ul>
</template>

<script setup lang="ts">
import TreeItem from '@/components/common/TreeItem.vue'
import { onMounted, ref, watch } from '@nuxtjs/composition-api'
import { defineEmits } from '@vue/runtime-dom'
import useTree from './TreeState'

// props
type OpenMethod = 'toggle' | 'unique'
interface Props {
  openPath?: number
  data: TreeNodeInterface
  instanceId?: string
}

const props = withDefaults(defineProps<Props>(), {})

// emits
const emit = defineEmits<{
  (event: 'update:children', item: TreeNodeInterface[]): void
}>()

// refs
const uuid = ref<string>(props.instanceId || String(new Date().getTime()))

// tree
const { open, init } = useTree(uuid.value, props.data, props.data.id, props.openPath)

// hooks
onMounted(() => {
  open()
})

// watchers
watch(
  () => props.data,
  () => {
    init(uuid.value, props.data)
  }
)
</script>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Tree',
})
</script>
