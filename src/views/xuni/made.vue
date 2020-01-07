<template>
  <div class="made-w">
    <p class="tips">*基础定制与完整定制机器人的区别在于聊天内容的精确与丰富程度，后者机器人表现更佳。</p>
    <ul class="uls">
      <li v-for="(item, index) in dingzhiData" :key="index" class="list" @click="madeFn(index)">
        <h3 class="text1">{{item.text1}}</h3>
        <p class="text2">{{item.text2}}</p>
        <div class="btn">开始定制</div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
			  dingzhiData: [
          {text1: '基础定制', text2: '预计用时5分钟'},
          {text1: '完整定制', text2: '预计用时30分钟'},
        ]
      }
		},
    methods: {
      madeFn (index) {
		    if (index === 0) {
		      this.$router.push({
            path: '/madeProgress',
            query: {
              uuid: this.$route.query.uuid,
              name: this.$route.query.name,
              apiKey: this.$route.query.apiKey,
              createdAt: this.$route.query.createdAt,
              endpoint: this.$route.query.endpoint
            }
          })
        } else {
          this.$router.push({
            path: '/user2/knowledge/productXmind',
            query: {
              uuid: this.$route.query.uuid,
              name: this.$route.query.name,
              apiKey: this.$route.query.apiKey,
              createdAt: this.$route.query.createdAt,
              endpoint: this.$route.query.endpoint
            }
          })
        }
      }
    }
	}
</script>

<style scoped lang="stylus">
.made-w
  display: flex
  align-items center
  flex-direction column
  padding-top: 222px
  .tips
    font-size: 16px
    color #090d21
    margin-bottom: 60px
  .uls
    display: flex
    align-items center
    .list
      width: 430px
      height: 400px
      border: 1px solid #d9d9d9
      border-radius 6px
      background-color: #fafafc
      display: flex
      align-items center
      flex-direction column
      &:first-child
        margin-right: 50px
      .text1
        font-size: 48px
        color #090d21
        margin: 112px 0 44px
      .text2
        color #666
        font-size: 20px
      .btn
        margin-top: 60px
        width: 220px
        height: 60px
        border-radius 6px
        display: flex
        align-items center
        justify-content center
        color #fff
        font-size: 20px
        cursor pointer
        background-color: #3376ff
</style>
