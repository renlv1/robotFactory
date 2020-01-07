<template>
  <transition name="safeDialog">
    <div class="dialog-w dialog-safe-w">
      <div class="dialog-safe">
        <div class="close" @click="close()">
          <div class="close-icon"></div>
        </div>
        <div class="input-title title-one">
          <div class="input-name">完整问句*</div><div class="add-icon" @click="addName11(1)">+ 添加</div>
        </div>
        <ul class="input-box">
          <li class="li-one" v-for="(item, index) in intrList11" :key="index" >
            <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName11(1, index)">
            <div class="delete-icon" @click="delIntr11(1, index)" v-show="intrList11.length > 1"><img src="../assets/img/common/delete.png"></div>
          </li>
        </ul>
        <div class="input-title title-one">
          <div class="input-name">答句*</div><div class="add-icon" @click="addName11(3)">+ 添加</div>
        </div>
        <ul class="input-box">
          <li class="li-one delete-input" v-for="(item, index) in intrList22" :key="index">
            <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName11(2, index)">
            <div class="delete-icon" @click="delIntr11(2, index)" v-show="intrList22.length > 1"><img src="../assets/img/common/delete.png"></div>
            <div class="add" @click="addName11(2)">+</div>
          </li>
        </ul>

<!--        <div class="input-title title-one" v-show="intrList33.length">-->
<!--          <div class="input-name">新增答句</div>-->
<!--        </div>-->
<!--        <ul class="input-box">-->
<!--          <li class="li-one delete-input" v-for="(item, index) in intrList33" :key="index" v-show="index < 1">-->
<!--            <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName11(3, index)">-->
<!--            <div class="delete-icon" @click="delIntr11(3, index)" v-show="intrList33.length > 1"><img src="../assets/img/common/delete.png"></div>-->
<!--&lt;!&ndash;            <div class="add" @click="addName11(3)">+</div>&ndash;&gt;-->
<!--          </li>-->
<!--        </ul>-->
        <div class="g-dialog-btn g-dialog-btn more-btn" @click="openClose" v-show="otherAnswerShow">{{openCloseText}}</div>
        <div v-show="orderA">
          <div class="input-title title-one">
            <div class="input-name">完整问句*</div><div class="add-icon" @click="addName11(5)">+ 添加</div>
          </div>
          <ul class="input-box" >
            <li class="li-one" v-for="(item, index) in intrList55" :key="index" >
              <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName11(5, index)">
              <div class="delete-icon" @click="delIntr11(5, index)" v-show="intrList55.length > 1"><img src="../assets/img/common/delete.png"></div>
            </li>
          </ul>
          <div class="input-title title-one">
            <div class="input-name">答句*</div><div class="add-icon" @click="addName11(6)">+ 添加</div>
          </div>
          <ul class="input-box">
            <li class="li-one delete-input" v-for="(item, index) in intrList66" :key="index">
              <input type="text" class="input" placeholder="" v-model.trim="item.content" @keyup.enter="addName11(6, index)">
              <div class="delete-icon" @click="delIntr11(6, index)" v-show="intrList66.length > 1"><img src="../assets/img/common/delete.png"></div>
              <div class="add" @click="addName11(6)">+</div>
            </li>
          </ul>
        </div>
        <div class="err-ms" v-show="errInputMsg">{{errInputMsg}}</div>
        <div class="g-dialog-btn-wrap">
          <div class="g-dialog-btn g-dialog-cancel" @click="close">取消</div>
          <div class="comfirm g-dialog-btn" @click="okCallback"  :class="{'loading-btn': loadingF}"><img src="../assets/img/common/loading.gif" alt="" v-show="loadingF">更新</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
	export default {
		data() {
			return {
        otherAnswerShow: false,
				openCloseText: '展开其他答句',
				orderA: false,
        loadingF: false,
        intrList11: [{
          content: "",
        }],
        intrList22: [{
          content: "",
        }],
				intrList33: [],
				intrList55: [{
					content: "",
				}],
				intrList66: [{
					content: "",
				}],
        errInputMsg: ''
      }
		},
    props: {
	    cuIndex: Number,
      chatbotIdF: String,
      questionF: Array,
      answerF: Array
    },
    created () {
		  this.emptyS()
	    this.intrList11 = [{content: this.questionF[0]}]
	    this.intrList22 = [{content: this.answerF[0]}]
    },
    methods: {
	    openClose () {
	    	this.orderA = !this.orderA
        if (this.orderA === true) {
        	this.openCloseText = '收起其他答句'
        } else {
	        this.openCloseText = '展开其他答句'
        }
      },
		  emptyS () {
        this.errInputMsg = ''
        this.intrList11 = [{content: ""}]
        this.intrList22 = [{content: ""}]
      },
      addName11(i, index) {
        let cope = {
          content: ""
        }
        if(i === 1) {
          this.intrList11.push(cope);
        }else if(i === 2) {
          this.intrList22.push(cope);
        }else if(i === 3) {
          if( this.intrList33.length < 1) {
            this.intrList33.push(cope);
          }
          this.otherAnswerShow = true
        }else if(i === 5) {
	        this.intrList55.push(cope);
        }else if(i === 6) {
	        this.intrList66.push(cope);
        }
      },
      delIntr11 (i, n) {
        if (i === 1)  this.intrList11.splice(n, 1);
	      if (i === 2)  this.intrList22.splice(n, 1);
	      if (i === 3)  this.intrList33.splice(n, 1);
	      if (i === 5)  this.intrList55.splice(n, 1);
	      if (i === 6)  this.intrList66.splice(n, 1);
      },
      okCallback () {
        let flag = true
        this.errInputMsg = ''
        this.intrList11.forEach(item => {
          if(item.content === '') {
            this.errInputMsg = '请输入问句'
            flag = false
          }
        })
        this.intrList22.forEach(item => {
          if(item.content === '') {
            this.errInputMsg = '请输入答句'
            flag = false
          }
        })
        this.intrList55.forEach(item => {
          if(item.content === '') {
            this.errInputMsg = '请输入问句'
            flag = false
          }
        })
        this.intrList66.forEach(item => {
          if(item.content === '') {
            this.errInputMsg = '请输入答句'
            flag = false
          }
        })
        if (flag === true) {
          this.loadingF = true
          let suggestedQuestion = []
          let suggestedAnswer = []
          this.intrList11.forEach(item => {
            suggestedQuestion.push(item.content)
          })
          this.intrList22.forEach(item => {
            suggestedAnswer.push(item.content)
          })
	        this.intrList33.forEach(item => {
		        suggestedAnswer.push(item.content)
          })
	        this.intrList55.forEach(item => {
		        suggestedQuestion.push(item.content)
	        })
	        this.intrList66.forEach(item => {
		        suggestedAnswer.push(item.content)
	        })
          this.$fetch.post('/feedback', {
            operation: 'AddFeedback',
            suggestedQuestion: suggestedQuestion,
            suggestedAnswer: suggestedAnswer,
            chatbotId: this.chatbotIdF,
            userId: localStorage.getItem('__userEmail__'),
            question: this.questionF,
            answer: this.answerF,
            isUseful: false
          }).then(res => {
            this.loadingF = false
            this.$emit('closeDialog', this.intrList11, this.intrList22, suggestedQuestion, suggestedAnswer, this.cuIndex)
            if (JSON.stringify(res) === '{}') {
              Dialog({
                content: '更新成功'
              })
            } else {
              Dialog({
                content: '更新失败'
              })
            }
          }).catch(() => {
            this.loadingF = false
          })
        }
      },
      close () {
        this.errInputMsg = ''
        this.intrList11 = [{content: ""}]
        this.intrList22 = [{content: ""}]
        this.$emit('closeDialog')
      },
    }
	}
</script>

<style scoped lang="stylus">
  .dialog-safe-w
    display: flex
    align-items center
    justify-content center
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom:0
    width: 100%
    height: 100%
    z-index: 200
    color #000
    background-color: rgba(0,0,0,.4)
    &.safeDialog-enter, &.safeDialog-leave-to
      opacity: 0;
      .dialog-safe
        transform: translate(0, -5%)
    &.safeDialog-enter-active
      transition: .3s;
      .dialog-safe
        transition: .3s
    &.safeDialog-leave-active
      transition: .1s;
      .dialog-safe
        transition: .1s
    .dialog-safe
      width: 600px
      max-height 600px
      overflow: auto
      background-color: #fff
      position: relative
      border-radius 4px
      color #17161f
      font-size: 28px;
      transform: translate(0, 0)
      padding: 50px 40px
      .close{
        cursor pointer
        width 21px
        height 21px
        position absolute
        right 20px
        top 40px
        .close-icon{
          width 21px
          height 21px
          background url("../assets/img/common/close.png")
        }
      }
      .dialog-title
        font-size: 20px
        font-weight: bold
        color #17161f
        padding: 50px 0 60px
        text-align: center
      .g-dialog-btn-wrap
        margin-top 30px
        display: flex
        align-items center
        justify-content center
      .form-item
        margin-bottom: 40px
        .label
          margin-bottom: 20px
        .input
          border-bottom 1px solid #000
          width: 100%
          height: 50px
          color #000
      .err-ms
        color: #ff717d;
        font-size 14px
        margin-top: 20px
      .g-dialog-btn
        text-align center
        cursor pointer
        flex 1
        width: 100%
        height: 50px
        display: flex
        align-items center
        justify-content center
        font-size: 20px
        border-radius 6px
        background-color: #3376ff;
        color #fff
        &:nth-child(1)
          background #ccc
          margin-right: 20px
        &.loading-btn
          pointer-events none
        img
          width: 30px
          display: flex
          margin-right: 10px
      .more-btn
        margin-top: 20px
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
      /*padding  0 30px*/
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
      position: relative
      .delete-icon{
        cursor pointer
        height: 100%
        position: absolute
        right: 0
        top: 0
        padding: 0 20px
        display: flex
        align-items center
        justify-content center
        img{
          display block
          width 17px
        }
      }
    }
    .input{
      flex 1
      height: 100%
      padding  0 30px
      border-radius 4px
      &.disable-input{
        background-color: rgb(235, 235, 228)
        cursor not-allowed
      }
    }
    .delete-input{
      width: 480px
      .add{
        line-height: 50px
        position: absolute
        right: -40px
        top: 0
        padding: 0 8px
        cursor pointer
        font-size: 30px
        font-weight: bold
        color #3376ff
      }
    }
  }
</style>
