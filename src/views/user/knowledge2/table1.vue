<template>
  <div class="add-w">
    <div class="path-navigation">
      <div class="link">
        <div class="line">
          <img src="../../../assets/img/common/border.png" alt="">
        </div>基本信息
      </div>
    </div>
    <div class="wrap-a">
<!--      1 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">虚拟币名称*</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value1" @input="inputM">
          </li>
          <div class="error-m">{{errorText1}}</div>
        </ul>
      </div>
      <!--      2 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">币种简称/币种代码（e.g. BTC）</div>
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
          <div class="input-name">官方网站*</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value3">
          </li>
          <div class="error-m">{{errorText3}}</div>
        </ul>
      </div>
      <!--      4 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">白皮书地址*</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value4">
          </li>
          <div class="error-m">{{errorText4}}</div>
        </ul>
      </div>
      <!--      5 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">智能合约地址</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value5">
          </li>
        </ul>
      </div>
      <!--      6 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">钱包下载地址</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value6">
          </li>
        </ul>
      </div>
      <!--      7 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">介绍一下[{{$route.query.name}}] *</div><div class="add-icon" @click="addName(1)">+ {{$t('corpus.text6')}}</div>
        </div>
        <ul class="input-box">
          <li v-for="(item, index) in value7" :key="index">
            <div class="li-one">
              <input type="text" class="input" placeholder="" v-model.trim="item.name">
              <div class="delete-icon" @click="delIntr(index, 1)" v-show="value7.length > 1"><img src="../../../assets/img/common/delete.png"></div>
            </div>
            <div class="error-m">{{item.errorText}}</div>
          </li>
        </ul>
      </div>
      <!--      8 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">[{{$route.query.name}}]的实时价格可以从哪里获取？</div>
        </div>
        <p class="tips-input">提示：请提供实时价格网址名称和具体网址。例如，RADR charts， <a href="https://c.radarlab.org/" target="_blank">https://c.radarlab.org/</a>。</p>
        <ul class="input-box flex-input-w">
          <li class="li-one li-one-first">
            <input type="text" class="input" placeholder="请填写网址名称" v-model.trim="value8">
          </li>
          <li class="li-one">
            <input type="text" class="input" placeholder="请填写具体网址" v-model.trim="value08">
          </li>
        </ul>
      </div>
<!--      9-->
      <div>
        <div class="input-title title-one">
          <div class="input-name">[{{$route.query.name}}]的主要站点/客户端有什么？</div>
        </div>
        <p class="tips-input">提示：请提供站点/客户端名称和具体网址。例如，RADR交易平台，<a href="https://www.radarlab.org/cn" target="_blank">https://www.radarlab.org/cn</a>。</p>
        <ul class="input-box flex-input-w">
          <li class="li-one li-one-first">
            <input type="text" class="input" placeholder="请填写站点或客户端名称" v-model.trim="value90">
          </li>
          <li class="li-one">
            <input type="text" class="input" placeholder="请填写站点或客户端的网址" v-model.trim="value91">
          </li>
        </ul>
      </div>
      <!--      10 -->
      <div>
        <div class="input-title title-one">
          <div class="input-name">[虚拟币名称]系统主要角色有什么？介绍一下。</div>
        </div>
        <ul class="input-box flex-input-w">
          <li class="li-one li-one-first">
            <input type="text" class="input" placeholder="请填写角色名称" v-model.trim="value10">
          </li>
          <li class="li-one">
            <input type="text" class="input" placeholder="请填写角色介绍" v-model.trim="value11">
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
	      templateArr: [],
        errorText1: '',
	      errorText3: '',
        errorText4: '',
        loadingBtn: false,
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
	      value7: [
		      {name: '', errorText: ''}
	      ],
	      value8: '',
	      value08: '',
        value90: '',
        value91: '',
        value10: '',
        value11: '',

      }
    },
    created () {
    	this.getTemp()
    },
    methods: {
	    inputM () {
		    let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
		    if (reg.test(this.value1)) {
			    this.errorText1 = ''
		    } else {
			    this.errorText1 = this.$t('charles.text12')
		    }
	    },
	    getTemp () {
		    this.$fetch.post('/template', {
			    "operation": "GetTemplateFull",  // 操作名称
			    "chatbotId": this.$route.query.uuid,    // 机器人Id
			    "type": "CRYPTO"         // 模板类型，从注册服务得到
		    }).then(res => {
			    if (res.length) {
				    this.templateArr = res
				    let v7 = []
            this.templateArr[6].answer.forEach(c => {
	            v7.push({name: c, errorText: ''})
            })
				    this.value1 = this.templateArr[0].answer
				    this.value2 = this.templateArr[1].answer
				    this.value3 = this.templateArr[2].answer
				    this.value4 = this.templateArr[3].answer
				    this.value5 = this.templateArr[4].answer
				    this.value6 = this.templateArr[5].answer
				    this.value7 = v7
            if (this.templateArr[7].answer.length) {
	            this.value8 = this.templateArr[7].answer[0]
	            this.value08 = this.templateArr[7].answer[1]
            }
				    if (this.templateArr[8].answer.length) {
					    this.value90 = this.templateArr[8].answer[0]
					    this.value91 = this.templateArr[8].answer[1]
				    }
				    if (this.templateArr[9].answer.length) {
					    this.value10 = this.templateArr[9].answer[0]
					    this.value11 = this.templateArr[9].answer[1]
				    }
			    }
		    })
	    },
      // 保存
      saveFn () {
        if (this.verify()) {
        	this.loadingBtn = true
        	let answer7 = []
	        this.value7.forEach(item => {
		        answer7.push(item.name)
          })
          this.$fetch.post('/template', {
	          "operation": "UpdateTemplateCategory",  // 操作名称
	          'chatbotId': this.$route.query.uuid,
	          category: '基本信息',
            entries: [
	            {
		            id: this.templateArr[0].id,
		            question: this.templateArr[0].question,
		            answer: this.value1
	            },
	            {
		            id: this.templateArr[1].id,
		            question: this.templateArr[1].question,
		            answer: this.value2
	            },
	            {
		            id: this.templateArr[2].id,
		            question: this.templateArr[2].question,
		            answer: this.value3
	            },
	            {
		            id: this.templateArr[3].id,
		            question: this.templateArr[3].question,
		            answer: this.value4
	            },
	            {
		            id: this.templateArr[4].id,
		            question: this.templateArr[4].question,
		            answer: this.value5
	            },
	            {
		            id: this.templateArr[5].id,
		            question: this.templateArr[5].question,
		            answer: this.value6
	            },
	            {
		            id: this.templateArr[6].id,
		            question: this.templateArr[6].question,
		            answer: answer7
	            },
	            {
		            id: this.templateArr[7].id,
		            question: this.templateArr[7].question,
		            answer: [this.value8, this.value08]
	            },
	            {
		            id: this.templateArr[8].id,
		            question: this.templateArr[8].question,
		            answer: [this.value90, this.value91]
	            },
	            {
		            id: this.templateArr[9].id,
		            question: this.templateArr[9].question,
		            answer: [this.value10, this.value11]
	            }
            ]
          }).then(res => {
	          this.loadingBtn = false
	          Dialog({
		          content: '保存成功'
	          })
          })
        }
      },
      // 验证
      verify () {
        let flag = true
        if (this.value1 === '') {
          this.errorText1 = '请输入虚拟币名称'
          flag = false
        }
        if (this.value3 === '') {
          this.errorText3 = '请输入官方网站'
          flag = false
        }
        if (this.value4 === '') {
          this.errorText4 = '请输入白皮书地址'
          flag = false
        }
        this.value7.forEach(item => {
          if (item.name === '') {
            item.errorText = '请介绍一下虚拟币'
            flag = false
          }
        })
        return flag
      },
      // 删除
      delIntr(index, type) {
        if (type === 1) this.value7.splice(index, 1)
      },
      // 添加
      addName(type) {
        let cope = {name: '', errorText: ''}
        this.value7.push(cope);
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
