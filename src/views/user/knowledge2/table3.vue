<template>
  <div class="add-w">
    <div class="path-navigation">
      <div class="link">
        <div class="line">
          <img src="../../../assets/img/common/border.png" alt="">
        </div>技术信息
      </div>
    </div>
    <div class="wrap-a">
      <!--      1 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">请提供[{{$route.query.name}}]的算法说明</div>
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
          <div class="input-name">请介绍[{{$route.query.name}}]包含的关键角色</div>
        </div>
        <p class="tips-input">提示：请提供关键角色名称和介绍。例如，钱老板，“钱老板”是雷达系统推出的一个P2P社交充值、提现和支付功能。</p>
        <ul class="input-box flex-input-w">
          <li class="li-one li-one-first">
            <input type="text" class="input" placeholder="请填写关键角色的名称" v-model.trim="value02">
          </li>
          <li class="li-one">
            <input type="text" class="input" placeholder="请填写关键角色的介绍" v-model.trim="value2">
          </li>
        </ul>
      </div>
      <!--      3 -->

      <!--      4 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">请提供[{{$route.query.name}}]的开源代码</div>
        </div>
        <p class="tips-input">提示：请提供开源代码名称和地址。例如，零钱包，<a href="https://github.com/radrbiz/radar-wallet" target="_blank">https://github.com/radrbiz/radar-wallet</a>。</p>
        <ul class="input-box flex-input-w">
          <li class="li-one li-one-first">
            <input type="text" class="input" placeholder="请填写开源代码的名称" v-model.trim="value03">
          </li>
          <li class="li-one">
            <input type="text" class="input" placeholder="请填写开源代码的地址" v-model.trim="value3">
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
        loadingBtn: false,
	      value1: '',
	      value02: '',
	      value2: '',
	      value03: '',
	      value3: '',
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
				    this.value1 = this.templateArr[17].answer
            if (this.templateArr[18].answer.length) {
	            this.value02 = this.templateArr[18].answer[0]
	            this.value2 = this.templateArr[18].answer[1]
            }
				    if (this.templateArr[19].answer.length) {
					    this.value03 = this.templateArr[19].answer[0]
					    this.value3 = this.templateArr[19].answer[1]
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
          category: '技术信息',
          entries: [
            {
              id: this.templateArr[17].id,
              question: this.templateArr[17].question,
              answer: this.value1
            },
	          {
		          id: this.templateArr[18].id,
		          question: this.templateArr[18].question,
		          answer: [this.value02, this.value2]
	          },
	          {
		          id: this.templateArr[19].id,
		          question: this.templateArr[19].question,
		          answer: [this.value03, this.value3]
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
        } else if(type === 2) {
          this.keywordsArr.push(cope);
        } else if(type === 3) {
          this.answersArr.push(cope);
        }
      },
      focusInput (index, type) {
        if (type === 1) {
          if (this.questionsArr[index].name !== '') {
            this.questionsArr[index].errorText = ''
          }
        } else if (type === 2) {
          if (this.answersArr[index].name !== '') {
            this.answersArr[index].errorText = ''
          }
        }
      },
      blurInput (index, type) {
        if (type === 1) {
          if (this.questionsArr[index].name === '') {
            this.questionsArr[index].errorText = this.$t('corpus.text13')
          } else {
            this.questionsArr[index].errorText = ''
          }
        } else if (type === 2) {
          if (this.answersArr[index].name === '') {
            this.answersArr[index].errorText = this.$t('corpus.text14')
          } else {
            this.answersArr[index].errorText = ''
          }
        }

      },
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
