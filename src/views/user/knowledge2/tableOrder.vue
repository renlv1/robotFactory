<template>
  <div class="add-w">
    <div class="path-navigation">
      <div class="link">
        <div class="line">
          <img src="../../../assets/img/common/border.png" alt="">
        </div>{{$route.query.cname}}
      </div>
    </div>
    <div class="wrap-a">
      <!--      1 -->
      <div v-for="(item, index) in qaData" :key="index" class="input-box">
        <div class="input-title title-one flex-t">
          <div class="label">问题{{index + 1}}：</div>
          <ul class="input-box">
            <li v-for="(it2, idx2) in item.q" :key="idx2" ref="input5" class="list-f">
              <div class="li-one">
                <input type="text" class="input" placeholder="" v-model="item.q[idx2]" @keyup.enter="addName(5)">
                <div class="delete-icon" @click="delIntr(index, idx2, 1)" ><img src="../../../assets/img/common/delete.png"></div>
              </div>
              <div class="add" @click="addQ(index, idx2, 1)">+</div>
            </li>
          </ul>
        </div>
        <div class="flex-t">
          <div class="label">答案{{index + 1}}：</div>
          <ul class="input-box">
            <li v-for="(it, idx3) in item.a" :key="idx3" ref="input5" class="list-f">
              <div class="li-one">
                <input type="text" class="input" placeholder="" v-model="it.txt" @keyup.enter="addName(5)">
                <div class="delete-icon" @click="delIntr(index, idx3, 2)" ><img src="../../../assets/img/common/delete.png"></div>
              </div>
              <div class="add" @click="addQ(index, idx3, 2)">+</div>
            </li>
          </ul>
        </div>

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
	      value5: [],
	      question: [],
	      answer: [],
	      templateArr: [],
        loadingBtn: false,
	      value1: '',
	      value02: '',
	      value2: '',
	      value03: '',
	      value3: '',
        questionsArr: [
          {name: '', errorText: ''}
        ],
        qaData: []
      }
    },
	  created () {
		  this.getTemp()
	  },
    methods: {
	    addQ (index, mindex, flag) {
	    	if (flag === 1) {
			    this.qaData[index].q.push('')
        } else {
			    this.qaData[index].a.push({txt: ''})
        }
      },
	    getTemp () {
		    this.$fetch.post('/template', {
			    "operation": "GetTemplateByCategory",  // 操作名称
          "category":this.$route.query.cname,
			    "chatbotId": this.$route.query.uuid,    // 机器人Id
			    "type": "CRYPTO"         // 模板类型，从注册服务得到
		    }).then(res => {
			    if (res.length) {
				    this.templateArr = res[0]
				    this.question = this.templateArr.question
				    this.answer = this.templateArr.answer
            let an = []
            this.question.forEach((item, index) => {
	            an.push({
		            q: item,
                a: []
	            })
	            this.templateArr.answer[index].forEach((ite, idx) => {
		            an[index].a.push({
                  txt:ite
                })
	            })
            })
            this.qaData = an
			    }
		    })
	    },
      // 保存
      saveFn () {
	      this.loadingBtn = true
        console.log(this.qaData)
        let q = []
        let a = []
        this.qaData.forEach((item, index) => {
	        q.push(item.q)
          a.push([])
          item.a.forEach(it => {
          	a[index].push(it.txt)
          })
        })
	      this.$fetch.post('/template', {
          "operation": "UpdateTemplateCategory",  // 操作名称
          'chatbotId': this.$route.query.uuid,
          category: this.$route.query.cname,
          entries: [
            {
              id: this.templateArr.id,
              question: q,
              answer: a
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
	    delIntr(index, type, flag) {
        if (flag === 1) {
	        this.qaData[index].q.splice(type, 1)
        } else {
	        this.qaData[index].a.splice(type, 1)
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
  .list-f
    display: flex
    align-items center
    margin-bottom: 20px
    .add
      font-size: 30px
      color #3376ff
      padding: 0 10px
      cursor pointer
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
    .flex-t
      display: flex
      justify-content flex-start
      .label
        line-height: 50px
        width: 80px
    .input-box{
      width 100%
      .li-one{
        padding  0 30px
        display flex
        justify-content space-between
        align-items center
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
