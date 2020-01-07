<template>
    <div class="customTemplates">
        <ul>
          <li v-for="(item, index) in templatesArr" :key="index" @click="toPath()" class="items">
            <div class="item-type">{{item.type}}</div>
            <div class="item-time">{{item.time}}</div>
            <div class="item-start">{{item.start}}</div>
          </li>
        </ul>
    </div>
</template>

<script>
    export default {
       data() {
         return{
            templatesArr: [
              {type: '基础定制', time: '预计用时5分钟', start: '开始'},
              {type: '完整定制', time: '预计用时30分钟', start: '开始'}
            ]
         }
       },
      methods: {
        toPath( ){
        }
      }
    }
</script>

<style scoped lang="stylus">
ul{
  display flex
  .items{
    flex 1
  }
}
</style>
