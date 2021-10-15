<template>
  <div class="container">
    <input
      v-model="num"
      type="number"
    >
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Page3',
  rules: {
    num: {
      validate: value => value > 1,
      message: '请输入大于 1 的数字'
    }
  },
  data () {
    return {
      num: '',
      message: ''
    }
  }
}
</script>
