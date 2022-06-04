<template>
  <div class="ts-loading-spinner" :class="props.classes"></div>
</template>

<script setup lang="ts">
// props
interface Props {
  classes: string[]
}

const props = withDefaults(defineProps<Props>(), {
  classes: () => ['w-16', 'h-16', 'border-4', 'border-blue-400'],
})
</script>
