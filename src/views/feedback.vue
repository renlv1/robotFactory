<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="right-content v-right-content">
<!--问句-->
            <div>
                <div class="input-title title-one">
                  <div class="input-name">{{$t('corpus.text3')}}*</div><div class="add-icon" @click="add(1)">+ {{$t('corpus.text6')}}</div>
                </div>
                <ul class="input-box">
                  <li v-for="(item, index) in questionsArr" :key="index">
                    <div class="li-one">
                      <input type="text" class="input" placeholder="" v-model.trim="item.name" @focus="focusInput(index, 1)" @blur="blurInput(index, 1)">
                      <div class="delete-icon" @click="delIntr(index, 1)"><img src="../assets/img/common/delete.png"></div>
                      </div>
                      <div class="error-m">{{item.errorText}}</div>
                  </li>
                </ul>
            </div>
<!--答句-->
            <div>
              <div class="input-title title-one">
                <div class="input-name">{{$t('corpus.text5')}}*</div><div class="add-icon" @click="add(2)">+ {{$t('corpus.text6')}}</div>
                </div>
                <ul class="input-box">
                  <li  v-for="(item, index) in answersArr" :key="index">
                    <div class="li-one">
                      <input type="text" class="input" placeholder="" v-model.trim="item.name"  @focus="focusInput(index, 2)" @blur="blurInput(index, 2)">
                      <div class="delete-icon" @click="delIntr(index, 2)"><img src="../assets/img/common/delete.png"></div>
                    </div>
                    <div class="error-m">{{item.errorText}}</div>
                  </li>
                </ul>
            </div>
            <div class="save" @click="save" :class="{'loading-btn': loadingBtnShow}">
                <img src="../assets/img/common/loading.gif" alt="" v-show="loadingBtnShow">
                <span>{{$t('corpus.text56')}}</span>
            </div>
            <div class="save" @click="cancel" :class="{'loading-btn': loadingBtnShow}">
                <img src="../assets/img/common/loading.gif" alt="" v-show="loadingBtnShow">
                <span>{{$t('corpus.text50')}}</span>
            </div>
          </div>
        </div>
      </div>
    <div class="dialog-w dialog-safe-w" v-show="visible">
      <div class="dialog-safe">
        <div class="close" @click="visible = false">
          <div class="close-icon"></div>
        </div>
        <div class="dialog-title">{{$t('corpus.text57')}}</div>
        <div class="dialog-content">{{$t('corpus.text58')}}</div>
        <div class="g-dialog-btn-wrap">
          <div class="g-dialog-btn g-dialog-cancel" @click="cancelCallback">{{$t('dialog.text4')}}</div>
          <div class="comfirm g-dialog-btn" @click="okCallback">{{$t('dialog.text5')}}</div>
        </div>
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
        loadingBtnShow: false,
        answersArr: [
        ],
        questionsArr: [
        ],
        questionIndex: 0,
        question: '',
        answer: '',
        visible: false
      }
    },
    props: {
        chatContent: Array,
        answerIndex: Number,
        chatbotId: String
    },
    created () {
      // handle answer
      this.answer = this.chatContent[this.answerIndex].msg
      if (this.answer != null) {
        if(Array.isArray(this.answer)) {
          this.answer.forEach(ans => {
            this.answersArr.push({name: ans, errorText: ""})
          })
        } else {
          this.answersArr.push({name: this.answer, errorText: ""})
        }
      }
      
      //handle question
      for(let i = this.answerIndex; i >= 0; i--) {
        if (this.chatContent[i].isMy == true) {
          this.question = this.chatContent[i].msg
          this.questionsArr.push({name: this.question, errorText: ""})
          this.questionIndex = i
          break
        }
      }
    },
    methods: {
      // 添加
      add(type) {
        let cope = {
          name: "",
        }
        if(type === 1) {
          this.questionsArr.push(cope);
        } else if(type === 2) {
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
      // 删除
      delIntr(index, type) {
        if (type === 1) this.questionsArr.splice(index, 1)
        if (type === 2) this.answersArr.splice(index, 1)

        if (this.questionsArr.length == 0) {
          this.questionsArr.push({name: "", errorText: ""})
        }

        if (this.answersArr.length == 0) {
          this.answersArr.push({name: "", errorText: ""})
        }

      },
      save() {
        console.log('save')

        let canSave = true
        let suggestedAnswer = []
        let suggestedQuestion = []

        this.answersArr.forEach((ans, i) => {
          if (ans.name === '') {
            this.answersArr[i].errorText = this.$t('corpus.text14')
            canSave = false
          }
          if(Array.isArray(ans.name)) {
            suggestedAnswer.concat(ans.name)
          } else {
            suggestedAnswer.push(ans.name)
          }
        });

        this.questionsArr.forEach((que, i) => {
          if (que.name === '') {
            this.questionsArr[i].errorText = this.$t('corpus.text13')
            canSave = false
          }
          suggestedQuestion.push(que.name)
        });

        if (!canSave) {
          return
        }

        let payload = {
          operation: "AddFeedback",
          chatbotId: this.chatbotId,
          userId: localStorage.getItem('__userEmail__'),
          question: this.question,
          suggestedQuestion: suggestedQuestion,
          answer: this.answer,
          suggestedAnswer: suggestedAnswer,
          isUseful: false
        }
        console.log(payload)
        this.$fetch.post('/feedback', payload).then(res =>{
          console.log(res)
        })
        this.$emit('close', {'queMsg': this.questionsArr[0].name, 'queIdx': this.questionIndex, 'ansMsg': this.answersArr, 'ansIdx': this.answerIndex})
      },
      cancel() {
        this.visible = true
      },
      okCallback () {
        this.visible = false
        this.$emit('close')
      },
      cancelCallback() {
        this.visible = false
      }
    }
  }
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1000px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>


<style scoped lang="stylus">
  /* 控制编辑区域的 */
  /*控制下拉小箭头的*/
.right-content
  .loading-w-m
    position: fixed
    top: 0
    right: 0
    left: 620px
    height: 100%
    z-index: 1000
    display: flex
    align-items center
    justify-content center
    background-color: rgba(0,0,0,.5)
    img
      width: 60px
      display: block
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
  .save
    cursor pointer
    width: 300px
    height 50px
    background #3376ff
    text-align center
    line-height 50px
    color #fff
    font-size 18px
    border-radius 6px
    margin 30px auto 40px
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
</style>
