<template>
  <div class="dialogChat-w" :style="{bottom: dialogChatBottom}">
    <div class="chat-btn" @click="changeBox">
      <img src="../assets/img/user/box_open.png" alt="" v-show="showChatBox">
      <img src="../assets/img/user/box_close.png" alt="" v-show="!showChatBox">
    </div>
    <div class="y-chat__main y-chat" v-show="showChatBox" ref="yChat" :style="{height: mainHeight}">
      <div class="y-chat__main__header">
        <div class="left-box">
          <span class="y-chat__main__header__logo">
            <img src="../assets/img/user/box.png">
          </span>
          <span class="y-chat__main__header__name">小盒子</span>
        </div>
        <div class="close" @click="closeBox">
          <img src="../assets/img/user/close.png" alt="">
        </div>
      </div>
      <div class="y-chat__main__chatbox" ref="chatMain">
        <div class="y-chat__item y-chat__item--other"  v-show="!isQALeng">
          <div class="y-chat__item__txt">
            <div>{{chatTips}}</div>
          </div>
        </div>
        <div class="y-chat__item y-chat__item--other order-m">
          <div class="y-chat__item__txt">
            <div>
              <div>
                <div class="suggest">
                  <div class="suggest__main">
                    <div class="suggest__main__ctn">
                      <div class="suggest__main__type">
                        <div v-for="(item, index) in menuTop" :key="index"
                             class="main__type-item"
                             :class="{'active-type': activeIndex === index}"
                             @click="switchMenu(index)">{{item}}</div>
                      </div>
                      <div class="suggest__main__txts">
                        <div v-for="(item, index) in menuData" :key="index" class="suggest__main-item"  @click="ask(item, 1)">{{item}}</div>
                      </div>
                    </div>
                    <div class="btn-w" @click="refreshMenu">
                      <a href="javascript:void(0)" class="btn-a">
                      <span class="icon">
                        <img src="../assets/img/user/refresh.png" alt="">
                      </span><span>换一批</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<!--        聊天内容-->
        <div v-for="(item, index) in qaList" :key="index + 111111111111"
             class="y-chat__item"
             v-show="!isQALeng || (isQALeng === true && index < spliceLeng)"
             :class="{'y-chat__item--other': item.type === 1,'y-chat__item--kefu': item.type === 2}">
          <div  class="y-chat__item__txt">
            <div v-if="typeof item.question === 'object'">
              <div v-for="(msg, mindex) in item.question" :key="mindex">{{msg}}</div>
            </div>
            <div v-else>{{item.question}}</div>
            <div class="answer">
              <div class="y-chat__item__time">{{$changeDate(item.date, '-', 4)}}</div>
              <div class="evaluate-w" v-if="item.type === 1">
                <div class="evaluate-list" :class="{'good': item.good === true}" @click="goodFn(item, index)">
                  <img src="../assets/img/user/good_light.png" alt="" v-show="item.good === true">
                  <img src="../assets/img/user/good_normal.png" alt=""  v-show="item.good === false">
                  <span>回答不错</span>
                </div>
              </div>
            </div>
          </div>
<!--          <div v-show="item.type === 1" class="editor-img" @click="editorFn(item, index)">-->
<!--            <img src="../assets/img/user/editor.png" alt="">-->
<!--          </div>-->
        </div>
        <div class="y-chat__item y-chat__item--other" v-show="isQALeng">
          <div class="y-chat__item__txt">
            <div>{{chatTips}}</div>
          </div>
        </div>
        <div v-for="(item, index) in qaList" :key="index - 111111111111"
             v-show="isQALeng === true && index >= spliceLeng"
             class="y-chat__item"
             :class="{'y-chat__item--other': item.type === 1,'y-chat__item--kefu': item.type === 2}">
          <div  class="y-chat__item__txt">
            <div v-if="typeof item.question === 'object'">
              <div v-for="(msg, mindex) in item.question" :key="mindex">{{msg}}</div>
            </div>
            <div v-else>{{item.question}}</div>
            <div class="answer">
              <div class="y-chat__item__time">{{$changeDate(item.date, '-', 4)}}</div>
              <div class="evaluate-w" v-if="item.type === 1">
                <div class="evaluate-list" :class="{'good': item.good === true}" @click="goodFn(item, index)">
                  <img src="../assets/img/user/good_light.png" alt="" v-show="item.good === true">
                  <img src="../assets/img/user/good_normal.png" alt=""  v-show="item.good === false">
                  <span>回答不错</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="loading-w" v-show="sendShow">
          <img src="../assets/img/common/loading.gif" alt="">
        </div>
      </div>
      <div class="y-chat__main__footer">
        <div class="y-chat__main__footer__input input--noborder el-input">
          <input type="text" @input="changeInput" autocomplete="off" placeholder="请输入你想问的问题…" class="el-input__inner" @keyup.enter="ask(input)" v-model.trim="input">
        </div>
        <div class="send" @click="ask(input)">
          <img src="../assets/img/aiExploration/send_blue.png" alt="" v-show="sendFlag">
          <img src="../assets/img/common/send.png" alt="" v-show="!sendFlag">
        </div>
      </div>
    </div>
<!--    <feedback-dialog v-show="isFShow" @closeDialog="closeDialog" :chatbotIdF="chatbotIdF" :questionF="questionF" :answerF="answerF"></feedback-dialog>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    data() {
      return {
	      dialogChatBottom: '40px',
        chatbotIdF: '',
        questionF: [],
        answerF: [],
        isFShow: false,
        sendShow: false,
        sendFlag: false,
        showChatBox: false,
        input: '',
        loading: false,
        activeIndex: 0,
        chatTips: '',
        qaList: [],
	      spliceLeng: 0,
        isQALeng: false,
	      screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        menuTop: ['机器人定制', 'AI体验馆', '公司介绍'],
        menuData: ['基本介绍', '定制基础模板', '定制完整模板']
      }
    },
    computed: {
	    mainHeight () {
		    let calcHeight = this.screenHeight - 110 - 80
		    calcHeight = calcHeight > 640 ? 640 : calcHeight
		    calcHeight = calcHeight < 300 ? 300 : calcHeight
		    return calcHeight + 'px'
	    }
    },
    mounted () {
      this.routerChange()
	    window.addEventListener('resize', () => {
	    	this.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	    })
    },
    methods: {
      routerChange () {
        let route = this.$route.path
        if(window.name === 'isReload'){
          this.showChatBox = false
          if (route === '/home' || route === '/register' || route === '/login' || route === '/getBackPwd') {
            this.chatTips = 'Hi, 我是机器人小盒子，可以为你解答关于网站或公司的各种问题。欢迎随时向我提问。'
          } else if (route === '/aiExploration') {
            this.chatTips = '你好呀！又来AI体验馆啦！有什么问题吗？小盒子我随时为你解答。'
          } else if (route === '/robotManagement' || route === '/aiChat') {
            this.chatTips = '你好！我是小盒子，随时为你解答关于定制机器人的各种问题。'
          }
        }else{
          window.name = 'isReload'
          if (route === '/home' || route === '/register' || route === '/login' || route === '/getBackPwd' || route === '/aiChat') {
            this.chatTips = '你好！我叫小盒子，是基于机器人工厂Protagobox的智能客服机器人。我可以为你解答关于Protagobox网站的一切问题，还可以为你提供定制机器人的操作指导。有什么不懂的就来问我吧！'
            this.showChatBox = true
          } else if (route === '/aiExploration') {
            this.chatTips = 'Hi，欢迎来到AI体验馆！我是你的客服机器人小盒子。在这里，你可以尝试各种有趣的AI功能，比如人脸识别、风格转换，智能聊天。想知道模型认为你几岁吗？快点击“人脸识别”模块看看吧~ '
            this.showChatBox = true
          } else if (route === '/robotManagement') {
            this.chatTips = '你好，欢迎来到机器人定制工厂！点击“新建机器人”按钮，开始创建属于你的机器人吧！定制过程中有任何问题，我会随时为你解答。'
            this.showChatBox = true
          } else {
            this.showChatBox = false
          }
        }
        if (this.$route.path === '/aiChat') {
        	this.dialogChatBottom = '120px'
        }
        if (this.qaList.length > 0) {
        	this.isQALeng = true
          this.spliceLeng = this.qaList.length
        } else {
        	this.isQALeng = false
        }
        console.log(this.isQALeng)
      },
      closeDialog () {
        this.isFShow = false
      },
      changeInput () {
        if (this.input.trim() === '') {
          this.sendFlag = false
        } else {
          this.sendFlag = true
        }
      },
      editorFn (item, index) {
        this.isFShow = true
        let question = this.qaList[index - 1].question
        this.questionF = [question]
        this.answerF = this.qaList[index].question
      },
      changeBox () {
        this.showChatBox = !this.showChatBox
      },
      // 回答点赞
      goodFn (item, index) {
        item.good = true
        this.$fetch.post('/feedback', {
          operation: 'AddFeedback',
          userId: localStorage.getItem('__userEmail__'),
          question: [this.qaList[index - 1].question],
          answer: this.qaList[index].question,
          isUseful: true
        }).then(res => {
          if (JSON.stringify(res) === '{}') {
            item.good = true
          }
        }).catch(() => {

        })
      },
      closeBox () {
        this.showChatBox = false
      },
      // 发送聊天
      ask (question, findex) {
        const self = this
        if (question === '') {
          return
        }
        this.sendShow = true
        if (findex !== 1) {
	        self.qaList.push({
		        type: 2,
		        question,
		        good: false,
		        bad: false,
		        date: new Date()
	        })
        }

        self.$fetch.post('https://ijmdcu9fo8.execute-api.ap-northeast-2.amazonaws.com/prod/chat', {
          content: question,
          model: 'CASU'
        }).then(res => {
          this.sendShow = false
          if (res.textList) {
            self.qaList.push({
              type: 1,
              good: false,
              bad: false,
              question: res.textList,
              date: new Date()
            })
          } else {
            self.qaList.push({
              type: 1,
              good: false,
              bad: false,
              question: '          ',
              date: new Date()
            })
          }
        }).catch(() => {
          this.sendShow = false
          self.qaList.push({
            type: 1,
            good: false,
            bad: false,
            question: '          ',
            date: new Date()
          })
        })
        self.input = ''
        self.sendFlag = false
      },
      refreshMenu () {
        let menuArr1 = ['基本介绍', '定制基础模板', '定制完整模板', '定制语料', '聊天即时反馈']
        let menuArr2 = ['基本介绍', '人脸识别', '风格迁移', '智能聊天']
        let menuArr3 = ['公司名称', '公司发展历程', '团队介绍', '公司文化', '公司产品']
        if (this.activeIndex === 0) this.menuData = this.getRandomArrayElements(menuArr1, 3)
        if (this.activeIndex === 1) this.menuData = this.getRandomArrayElements(menuArr2, 3)
        if (this.activeIndex === 2) this.menuData = this.getRandomArrayElements(menuArr3, 3)
      },
      switchMenu (index) {
        let menuArr1 = ['基本介绍', '定制基础模板', '定制完整模板', '定制语料', '聊天即时反馈']
        let menuArr2 = ['基本介绍', '人脸识别', '风格迁移', '智能聊天']
        let menuArr3 = ['公司名称', '公司发展历程', '团队介绍', '公司文化', '公司产品']
        this.activeIndex = index
        if (index === 0) this.menuData = menuArr1.splice(0, 3)
        if (index === 1) this.menuData = menuArr2.splice(0, 3)
        if (index === 2) this.menuData = menuArr3.splice(0, 3)
      },
      // 随机数组中随机取几个元素
      getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      }
    },
    components: {
      //feedbackDialog: resolve => require(['@/components/feedbackDialog.vue'], resolve),
    },
    watch: {

      /**
       * 监听数据滚动到最底部
       */
      qaList () {
        const self = this
        Vue.nextTick(() => {
          if (self.$refs.chatMain) {
            self.$refs.chatMain.scrollTop = self.$refs.chatMain.scrollHeight
          }
        })
      },
      '$route': 'routerChange'
    }
  }
</script>

<style scoped lang="stylus">
  .fiexdH
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: -1
  .dialogChat-w
    position: fixed;
    bottom: 40px;
    right: 60px;
    z-index: 700;
    .loading-w
      width: 36px
      margin: 10px auto
      img
        width: 100%
        display: block
    .chat-btn
      border-radius: 50%;
      cursor: pointer;
      height: 60px;
      position: relative;
      width: 60px;
      img
        width: 100%
        display: block
    .y-chat__main {
      -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      left: -348px;
      overflow: hidden;
      position: absolute;
      bottom: 70px;
      height: 640px
      width: 400px;
    }

    .y-chat__main__header {
      background: #3376ff;
      height: 60px;
      padding-left: 20px;
      display: flex
      align-items center
      justify-content space-between
      .left-box{
        display: flex
        align-items center
      }
      .close{
        height: 100%
        display: flex
        align-items center
        justify-content center
        padding: 0 20px
        cursor pointer
      }
    }

    .y-chat__main__header__logo img {
      width: 24px
      display: block
    }

    .y-chat__main__header__name {
      color: #fff;
      float: left;
      font-size: 18px;
      margin-left: 12px;
    }

    .y-chat__main__chatbox {
      background-color: #fff;
      left: 0;
      right: 0;
      top: 60px;
      bottom: 60px
      overflow: auto;
      padding: 30px 20px 50px;
      position: absolute;
    }

    .y-chat__main__footer {
      bottom: 0;
      background: #f9f9f9;
      border-top: 1px solid #ECECEC;
      height: 60px;
      left: 0;
      position: absolute;
      padding-left: 5px;
      right: 0;
      display: flex
      align-items center
      .send{
        padding: 0 20px
        height: 60px
        display: flex
        align-items center
        justify-content center
        cursor pointer
        img{
          width: 20px
          display: block
        }
      }
      .icon{
        fill: #b9bec6;
        height: 1em;
        overflow: hidden;
        vertical-align: -.15em;
        width: 1em;
      }
      .el-input__inner{
        background: transparent;
        border: none;
        height: 100%;
        color #090d21
        line-height: 1.5
        &::-webkit-input-placeholder{
          color:#b3b3b3
        }
        &::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#b3b3b3
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#b3b3b3
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:#b3b3b3
        }
      }
    }

    .y-chat__main__footer__input {
      height: 100%;
    }

    .y-chat__main__footer a {
      color: #B9BEC6;
      font-size: 20px;
      position: absolute;
      right: 20px;
      top: 55%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }

    .y-chat__loading {
      bottom: 52px;
      left: 50%;
      position: absolute;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }

    .y-chat .suggest a {
      color: #666;
      text-decoration: none;
    }

    .y-chat .suggest__main {
      border-radius: 14px;
      background: #EDEFF4;
    }

    .y-chat .suggest__main hr {
      border: none;
      background-image: -webkit-linear-gradient(0deg, transparent, #D8D8D8, transparent);
      height: 1px;
      margin: 0;
    }
    .y-chat .suggest__main .btn-w{
      padding: 0 16px
    }
    .y-chat .suggest__main .btn-a {
      color: #3376ff;
      display: flex;
      align-items center
      justify-content center
      font-size: 12px;
      height: 44px;
      border-top: 1px solid #e1e3e8
      .icon{
        margin-right: 10px
      }
    }

    .y-chat .suggest__main > a svg {
      margin-right: 3px;
      fill: #3376ff;
      height: 1em;
      overflow: hidden;
      vertical-align: -.15em;
      width: 1em;
    }

    .y-chat .suggest__main__type {
      border-bottom: 1px solid #D8D8D8;
      line-height: 46px;
      height: 46px;
      text-align: center;
      width: 300px;
      display: flex
      align-items center
      .main__type-item{
        flex 1
        display: flex
        align-items center
        justify-content center
        cursor pointer
        position: relative
      }
      .active-type{
        color #3376ff
        &::before{
          content ''
          border: 1px solid #D8D8D8;
          background: #EDEEEF;
          border-right: 1px solid #EDEEEF;
          bottom: -5px;
          border-bottom: 1px solid #EDEEEF;
          height: 8px;
          left: 50%;
          position: absolute;
          -webkit-transform: translateX(-50%) rotate(45deg);
          transform: translateX(-50%) rotate(45deg);
          width: 8px;
        }
      }
    }

    .y-chat .suggest__main__type a {
      color: #000;
      padding: 0 10px;
      position: relative;
    }

    .y-chat .suggest__main__type a:hover {
      color: #3376ff;
    }


    .y-chat .suggest__main__txts {
      //padding: 20px 20px 0;
      .suggest__main-item{
        height: 40px
        padding-left 16px
        line-height: 40px
        font-size: 14px
        color #3376ff
        cursor pointer
      }
    }

    .y-chat .suggest__main__txts a {
      color: #000;
      display: block;
      margin-bottom: 12px;
    }

    .y-chat .suggest__main__txts a:hover {
      color: #3376ff;
    }

    .y-chat__item {
      zoom: 1;
      .answer{
        width: 100%
        display: flex
        align-items center
        justify-content space-between
        .evaluate-w{
          display: flex
          align-items center
          .evaluate-list{
            display: flex
            align-items center
            color #999
            font-size: 12px
            cursor pointer
            &:nth-child(1){
              margin-right: 28px
            }
            img{
              width: 14px
              display: block
              margin-right: 8px
            }
          }
          .good{
            color #3376ff
          }
          .bad{
            color #fd3e4b
          }
        }
      }
      .editor-img{
        cursor pointer
        position: absolute
        top: 0
        right: -32px;
        img{
          width: 24px
        }
      }
    }

    .y-chat__item:before, .y-chat__item:after {
      content: " ";
      display: table;
    }

    .y-chat__item:after {
      clear: both;
      visibility: hidden;
      font-size: 0;
      height: 0;
    }

    .y-chat__item + .y-chat__item {
      margin-top: 10px;
    }

    .y-chat__item__txt {
      border-radius: 14px;
      font-size: 14px;
      padding: 16px;
      color #090d21;
    }

    .y-chat__item__time {
      clear: both;
      padding-top: 10px;
      font-size: 12px
      color #999
    }
    .y-chat__item--kefu{
      .y-chat__item__txt{
        max-width 300px
      }
      .y-chat__item__time{
        color #fff
      }
    }
    .y-chat__item--kefu .y-chat__item__txt {
      border-bottom-right-radius: 2px;
      background: #3376ff;
      float: right;
      color #fff
    }

    .y-chat__item--kefu .y-chat__item__time {
      text-align: right;
    }

    .y-chat__item--kehu .y-chat__item__txt {
      border-top-right-radius: 2px;
      background: #3376ff;
      color: #fff;
      float: right;
    }

    .y-chat__item--kehu .y-chat__item__time {
      text-align: right;
    }
    .y-chat__item--other{
      padding: 16px
      border-radius 14px
      border-bottom-left-radius: 2px;
      width: 300px
      background-color: #EDEFF4
      position: relative
      .answer{
        padding-top: 10px
      }
    }
    .order-m{
      padding: 0
    }
    .y-chat__item--other .y-chat__item__txt {
      float: left;
      padding: 0;
      width: 100%
      .y-chat__item__time{
        padding-top: 0
      }
    }
</style>
