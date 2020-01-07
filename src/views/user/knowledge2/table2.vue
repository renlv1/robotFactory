<template>
  <div class="add-w">
    <div class="path-navigation">
      <div class="link">
        <div class="line">
          <img src="../../../assets/img/common/border.png" alt="">
        </div>交易信息
      </div>
    </div>
    <div class="wrap-a">
      <!--      1 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">[{{$route.query.name}}]的发行日期</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value1">
          </li>
        </ul>
      </div>
      <!--      2 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">[{{$route.query.name}}]的发行总量</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value2">
          </li>
        </ul>
      </div>
      <!--      3 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">[{{$route.query.name}}]的流通数量</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value3">
          </li>
        </ul>
      </div>

      <!--      4 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">[{{$route.query.name}}]的发行价格</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value4">
          </li>
        </ul>
      </div>
      <!--      5 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">交易[{{$route.query.name}}]的平台有哪些？</div>
        </div>
        <p class="tips-input">提示：请提供交易平台名称和网址。例如，RADR交易平台，<a href="https://www.radarlab.org/cn" target="_blank">https://www.radarlab.org/cn</a>。</p>
        <ul class="input-box flex-input-w">
          <li class="li-one li-one-first">
            <input type="text" class="input" placeholder="请填写交易平台名称" v-model.trim="value05">
          </li>
          <li class="li-one">
            <input type="text" class="input" placeholder="请填写交易平台的网址" v-model.trim="value5">
          </li>
        </ul>
      </div>
      <!--      6 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">介绍一下[虚拟币名称]交易平台的注册流程</div>
        </div>
        <p class="tips-input">提示：请提供交易平台名称和开户流程介绍。例如，RADR交易平台，开户流程是XXX。</p>
        <ul class="input-box flex-input-w">
          <li class="li-one li-one-first">
            <input type="text" class="input" placeholder="请填写交易平台名称" v-model.trim="value06">
          </li>
          <li class="li-one">
            <input type="text" class="input" placeholder="请填写注册流程" v-model.trim="value6">
          </li>
        </ul>
      </div>
      <!--      7 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">介绍一下[虚拟币名称]交易平台的使用流程</div>
        </div>
        <p class="tips-input">提示：请提供交易平台名称和交易流程介绍。例如，RADR交易平台，交易流程是XXX。</p>
        <ul class="input-box flex-input-w">
          <li class="li-one li-one-first">
            <input type="text" class="input" placeholder="请填写交易平台名称" v-model.trim="value07">
          </li>
          <li class="li-one">
            <input type="text" class="input" placeholder="请填写使用流程" v-model.trim="value7">
          </li>
        </ul>
      </div>

      <div class="save-btn save-t" @click="saveFn()" :class="{'loading-btn': loadingBtn}">
        <img src="../../../assets/img/common/loading.gif" alt="" v-show="loadingBtn">
        <div class="save">{{$t('houseToken.text7')}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import Dialog from '@/components/dialog'
  export default {
    data() {
      return {
	      value1: '',
	      value2: '',
	      value3: '',
	      value4: '',
	      value5: '',
	      value05: '',
	      value6: '',
	      value06: '',
	      value7: '',
	      value07: '',
	      value9: '',
        loadingBtn: false,
        questionsArr: [
          {name: '', errorText: ''}
        ],
      }
    },
    created () {
    	this.getTemp()
    },
    methods: {
	    getTemp () {
		    this.$fetch.post('/template', {
			    "operation": "GetTemplateFull",  // 操作名称
			    "chatbotId": this.$route.query.uuid,    // 机器人Id
			    "type": "CRYPTO"         // 模板类型，从注册服务得到
		    }).then(res => {
			    if (res.length) {
				    this.templateArr = res
				    let v7 = []
				    this.value1 = this.templateArr[10].answer
				    this.value2 = this.templateArr[11].answer
				    this.value3 = this.templateArr[12].answer
				    this.value4 = this.templateArr[13].answer
            if (this.templateArr[14].answer.length) {
	            this.value05 = this.templateArr[14].answer[0]
	            this.value5 = this.templateArr[14].answer[1]
            }
				    if (this.templateArr[15].answer.length) {
					    this.value06 = this.templateArr[15].answer[0]
					    this.value6 = this.templateArr[15].answer[1]
				    }
				    if (this.templateArr[16].answer.length) {
					    this.value07 = this.templateArr[16].answer[0]
					    this.value7 = this.templateArr[16].answer[1]
				    }
			    }
		    })
	    },
      // 保存
      saveFn () {
	      this.loadingBtn = true
	      this.$fetch.post('/template', {
          "operation": "UpdateTemplateCategory",  // 操作名称
          'chatbotId': this.$route.query.uuid,
          category: '交易信息',
          entries: [
	          {
		          id: this.templateArr[10].id,
		          question: this.templateArr[10].question,
		          answer: this.value1
	          },
	          {
		          id: this.templateArr[11].id,
		          question: this.templateArr[11].question,
		          answer: this.value1
	          },
	          {
		          id: this.templateArr[12].id,
		          question: this.templateArr[12].question,
		          answer: this.value1
	          },
	          {
		          id: this.templateArr[13].id,
		          question: this.templateArr[13].question,
		          answer: this.value1
	          },
	          {
		          id: this.templateArr[14].id,
		          question: this.templateArr[14].question,
		          answer: [this.value05, this.value5]
	          },
	          {
		          id: this.templateArr[15].id,
		          question: this.templateArr[15].question,
		          answer: [this.value06, this.value6]
	          },
	          {
		          id: this.templateArr[16].id,
		          question: this.templateArr[16].question,
		          answer: [this.value07, this.value7]
	          }
          ]
	      }).then(res => {
		      this.loadingBtn = false
		      Dialog({
			      content: '保存成功'
		      })
        })
      },
      // 删除
      delIntr(index, type) {
        if (type === 1) this.questionsArr.splice(index, 1)
        if (type === 2) this.keywordsArr.splice(index, 1)
        if (type === 3) this.answersArr.splice(index, 1)
      },
      // 添加
      addName(type) {
        let cope = {
          name: "",
        }
        if(type === 1) {
          this.questionsArr.push(cope);
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .wrap-a
    padding-top: 28px
    .tips-input
      font-size: 14px
      color #999
      a
        color #3376ff
        text-decoration underline
    .save-btn
      cursor pointer
      height 50px
      background #3376ff
      text-align center
      color #fff
      font-size 18px
      border-radius 6px
      margin 50px 0
      position relative
      display: flex
      align-items center
      justify-content center
      &.loading-btn
        pointer-events none
      img
        width: 30px
        display: block
        margin-right: 10px
      .err-ms
        position absolute
        font-size 12px
        color #ff2121
        top -40px
        left 0
  .add-w
    .path-navigation
      font-size: 20px
      color #090d21
      padding-bottom: 20px
      border-bottom: 1px dashed #ccc
      .link
        display: flex
        align-items center
        font-size: 26px
        color #090d21
        .line
          margin-right: 16px
          img
            display: block
            width: 4px
    .input-title{
      display flex
      justify-content space-between
      margin-top 30px
      margin-bottom 20px
      .input-name{
        font-size 18px
        color #090d21
      }
      .add-icon{
        cursor pointer
        font-size 18px
        color #3376ff
      }
    }
    .input-box{
      width 100%
      .li-one{
        padding  0 30px
        display flex
        justify-content space-between
        align-items center
        margin-top 30px
        width 100%
        height 50px
        color #090d21
        font-size 16px
        border-radius 4px
        background #F2F3F7
        .delete-icon{
          cursor pointer
          width 17px
          height 20px
          img{
            display block
            width 100%
          }
        }
      }
      .error-m{
        font-size: 16px
        color red
        margin-top: 10px
      }
      .input{
        flex 1
        height: 100%
      }
    }
    .flex-input-w{
      display: flex
      align-items center
      .li-one{
        margin-top: 10px
      }
      .li-one-first{
        margin-right: 20px
      }
    }
</style>
