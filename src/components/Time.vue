<template>
  <div class="m-active-time flex justify-center">{{time}}</div>
</template>

<script>
  export default {
    name: "Time",

    data: function () {
      return {
        time: this.getCurrentTime()
      }
    },
    methods: {
      getCurrentTime: () => {
        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes }`
      }
    },
    mounted: function () {
      setInterval(() => {
        this.time = this.getCurrentTime()
      }, 20000)
    }
  }
</script>

<style scoped>

</style>
