<template>
  <div class="add-w">
    <div class="path-navigation">
      <div class="link">
        <div class="line">
          <img src="../../../assets/img/common/border.png" alt="">
        </div>安全信息
      </div>
    </div>
    <div class="wrap-a">
      <!--      1 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">介绍一下[{{$route.query.name}}]的投资安全</div><div class="add-icon" @click="addName(1)">+ {{$t('corpus.text6')}}</div>
        </div>
        <ul class="input-box">
          <li v-for="(item, index) in value1" :key="index" ref="input1">
            <div class="li-one">
              <input type="text" class="input" placeholder="" v-model.trim="item.name" @keyup.enter="addName(1, index)">
              <div class="delete-icon" @click="delIntr(index, 1)" v-show="value1.length > 1"><img src="../../../assets/img/common/delete.png"></div>
            </div>
            <div class="error-m">{{item.errorText}}</div>
          </li>
        </ul>
      </div>
      <!--      2 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">介绍一下[{{$route.query.name}}]的本金风险情况</div>
        </div>
        <p class="tips-input">例如，可以回答这些问题：投资[虚拟币名称]本金是否会亏损？是否可能在某些情况下无法回本？ </p>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value2">
          </li>
        </ul>
      </div>
      <!--      3 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">介绍一下[{{$route.query.name}}]的收益风险情况</div>
        </div>
        <p class="tips-input">例如，可以回答这些问题：投资[虚拟币名称]的收益是否有保障？由谁保证收益？ </p>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value3">
          </li>
        </ul>
      </div>
      <!--      4 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">介绍一下[{{$route.query.name}}]的投资协议</div>
        </div>
        <p class="tips-input">例如，可以回答这些问题：是否有投资协议？在哪里查看投资协议？是否有规避风险的协议？在哪里查看风险规避措施？ </p>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value4">
          </li>
        </ul>
      </div>
      <!--      5 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">如何保护[{{$route.query.name}}]投资人的用户信息安全？</div><div class="add-icon" @click="addName(5)">+ {{$t('corpus.text6')}}</div>
        </div>
        <p class="tips-input">例如，可以回答这些问题：投资人信息会泄露吗？怎样防范用户信息泄露？ </p>
        <ul class="input-box">
          <li v-for="(item, index) in value5" :key="index" ref="input5">
            <div class="li-one">
              <input type="text" class="input" placeholder="" v-model.trim="item.name" @keyup.enter="addName(5, index)">
              <div class="delete-icon" @click="delIntr(index, 5)" v-show="value5.length > 1"><img src="../../../assets/img/common/delete.png"></div>
            </div>
            <div class="error-m">{{item.errorText}}</div>
          </li>
        </ul>
      </div>
      <!--      6 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">如何保护 [{{$route.query.name}}]投资人的交易信息？</div>
        </div>
        <p class="tips-input">例如，可以回答这些问题：交易信息会泄露吗？怎样防交易范信息泄露？ </p>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value6">
          </li>
        </ul>
      </div>
      <!--      7 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">如果忘记账户信息，比如忘记账户名或密码，怎样找回？ </div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value7">
          </li>
        </ul>
      </div>
      <!--      8 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">介绍一下 [{{$route.query.name}}]的合法性</div>
        </div>
        <p class="tips-input">例如，可以回答这些问题：是否有法律法规支持？在哪里查看政府的批准公文？ </p>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value8">
          </li>
        </ul>
      </div>
      <!--      9 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">介绍一下 [{{$route.query.name}}]的监管</div>
        </div>
        <p class="tips-input">例如，可以回答这些问题：是否有监管？监管机构有哪些？如何进行监管？ </p>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value9">
          </li>
        </ul>
      </div>
      <!--      10 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">如果用户怀疑 [{{$route.query.name}}]的可信度，[机器人名称]如何回应？</div>
        </div>
        <p class="tips-input">例如，可以回答这些问题：采取了什么措施保证可信度和透明度？如何消除用户担心上当受骗？</p>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value10">
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
	      value1: [{name: '', errorText: ''}],
	      value2: '',
	      value3: '',
	      value4: '',
	      value5: [{name: '', errorText: ''}],
	      value6: '',
	      value7: '',
	      value8: '',
	      value9: '',
	      value10: ''
      }
    },
	  created () {
		  this.getTemp()
	  },
    methods: {
	    // 保存
	    saveFn () {
		    let answer1 = []
		    this.value1.forEach(item => {
			    answer1.push(item.name)
		    })
		    let answer5 = []
		    this.value1.forEach(item => {
			    answer5.push(item.name)
		    })
		    this.loadingBtn = true
		    this.$fetch.post('/template', {
			    "operation": "UpdateTemplateCategory",  // 操作名称
			    'chatbotId': this.$route.query.uuid,
			    category: '安全信息',
			    entries: [
				    {
					    id: this.templateArr[20].id,
					    question: this.templateArr[20].question,
					    answer: answer1
				    },
				    {
					    id: this.templateArr[21].id,
					    question: this.templateArr[21].question,
					    answer: this.value2
				    },
				    {
					    id: this.templateArr[22].id,
					    question: this.templateArr[22].question,
					    answer: this.value3
				    },
				    {
					    id: this.templateArr[23].id,
					    question: this.templateArr[23].question,
					    answer: this.value4
				    },
				    {
					    id: this.templateArr[24].id,
					    question: this.templateArr[24].question,
					    answer: answer5
				    },
				    {
					    id: this.templateArr[25].id,
					    question: this.templateArr[25].question,
					    answer: this.value6
				    },
				    {
					    id: this.templateArr[26].id,
					    question: this.templateArr[26].question,
					    answer:this.value7
				    },
				    {
					    id: this.templateArr[27].id,
					    question: this.templateArr[27].question,
					    answer: this.value8
				    },
				    {
					    id: this.templateArr[28].id,
					    question: this.templateArr[28].question,
					    answer: this.value9
				    },
				    {
					    id: this.templateArr[29].id,
					    question: this.templateArr[29].question,
					    answer: this.value10
				    }
			    ]
		    }).then(res => {
			    this.loadingBtn = false
			    Dialog({
				    content: '保存成功'
			    })
		    })
	    },
	    getTemp () {
		    this.$fetch.post('/template', {
			    "operation": "GetTemplateFull",  // 操作名称
			    "chatbotId": this.$route.query.uuid,    // 机器人Id
			    "type": "CRYPTO"         // 模板类型，从注册服务得到
		    }).then(res => {
			    if (res.length) {
				    this.templateArr = res
				    let v1 = []
            if (this.templateArr[20].answer.length) {
	            this.templateArr[20].answer.forEach(c => {
		            v1.push({name: c, errorText: ''})
	            })
            } else {
            	v1 = [{name: '', errorText: ''}]
            }
				    let v5 = []
				    if (this.templateArr[24].answer.length) {
					    this.templateArr[24].answer.forEach(c => {
						    v5.push({name: c, errorText: ''})
					    })
				    } else {
					    v5 = [{name: '', errorText: ''}]
            }
				    this.value1 = v1
				    this.value2 = this.templateArr[21].answer
				    this.value3 = this.templateArr[22].answer
				    this.value4 = this.templateArr[23].answer
				    this.value5 = v5
				    this.value6 = this.templateArr[25].answer
				    this.value7 = this.templateArr[26].answer
				    this.value8 = this.templateArr[27].answer
				    this.value9 = this.templateArr[28].answer
				    this.value10 = this.templateArr[29].answer
			    }
		    })
	    },
	    // 删除
	    delIntr(index, type) {
		    if (type === 1) this.value1.splice(index, 1)
		    if (type === 5) this.value5.splice(index, 1)
	    },
	    // 添加
	    addName(type, n) {
		    let cope = {name: '', errorText: ''}
		    if (type === 1) {
		    	this.value1.push(cope);
		    	if (n) {
				    setTimeout(() => {
					    if(this.$refs.input1) {
						    this.$refs.input1[n+1].getElementsByClassName('input')[0].focus()
					    }
				    }, 100)
          }
		    }
		    if (type === 5) {
		    	this.value5.push(cope);
		    	if (n) {
				    setTimeout(() => {
					    if(this.$refs.input5) {
						    this.$refs.input5[n+1].getElementsByClassName('input')[0].focus()
					    }
            }, 100)
          }
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
        padding-left  30px
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
          height: 100%
          display: flex
          justify-content center
          align-items center
          cursor pointer
          padding: 0 30px
          img{
            display block
            width 17px
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
