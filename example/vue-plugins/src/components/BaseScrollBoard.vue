<template>
  <dv-scroll-board
    ref="scrollA"
    :config="config"
    style="width:100%;height:220px"
  />
</template>

<script>
export default {
  name: 'ScrollBoard',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  mounted () {
    // console.log('mounted')
  },
  beforeUpdate () {
    // console.log('beforeUpdate')
  },
  updated () {
    // console.log('updated')
  }
}
</script>

<style>

</style>
