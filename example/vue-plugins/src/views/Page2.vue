<script>
const updateKey = function (vm) {
  return function () {
    vm.$nextTick(() => {
      // 更新 key 值，强制刷新子组件
      vm.key += 1
      // console.log(vm.key)
    })
  }
}

const debounce = function (callback, delay) {
  let timer
  return function () {
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(this, args)
    }, delay)
  }
}

export default {
  name: 'Home',
  data () {
    return {
      config: {},
      key: 1
    }
  },
  mounted () {
    this.getConfigData()
    this.renderAgain()
  },

  beforeUpdate () {
    // console.log('beforeUpdate')
  },
  updated () {
    // console.log('updated')
  },

  methods: {
    renderAgain () {
      const vm = this
      window.addEventListener('resize', debounce(updateKey(vm), 300))
    },

    getConfigData () {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          const config = {
            header: ['列1', '列2', '列3'],
            data: [
              ['行1列1', '行1列2', '行1列3'],
              ['行2列1', '行2列2', '行2列3'],
              ['行3列1', '行3列2', '行3列3'],
              ['行4列1', '行4列2', '行4列3'],
              ['行5列1', '行5列2', '行5列3'],
              ['行6列1', '行6列2', '行6列3'],
              ['行7列1', '行7列2', '行7列3'],
              ['行8列1', '行8列2', '行8列3'],
              ['行9列1', '行9列2', '行9列3'],
              ['行10列1', '行10列2', '行10列3']
            ],
            index: true,
            columnWidth: [50],
            align: ['center']
          }
          resolve(config)
        }, 0)
      })

      promise.then(data => {
        this.config = data
      })
    }
  }
}
</script>

<template>
  <div class="home">
    <BaseScrollBoard
      ref="scrollBoard"
      :key="key"
      :config="config"
    />
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
