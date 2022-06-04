<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <LoadingSpinner />
  </div>
</template>

<script>
import LoadingSpinner from '~/components/common/LoadingSpinner'

export default {
  components: { LoadingSpinner },
  props: ['error'],
}
</script>
