<template>
  <div class="madeProgress-w">
    <div class="wrap-w">
      <div class="content">
        <div class="progress-w">
          <ul class="progress-uls">
            <div class="line"></div>
            <li class="progress-item" v-for="(item, index) in 4" :class="{'active-progress': currentIndex >= index}" :key="index"><span>{{item}}</span></li>
          </ul>
        </div>
<!--        第一步 -->
        <div v-show="currentIndex === 0">
          <div class="question"><div class="label">问题1：</div>简单介绍一下[机器人名称]</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..." v-model.trim="answer1"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg1}}</p>
          <div class="question margin-que"><div class="label">问题2：</div>[机器人名称]会做什么？</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..." v-model.trim="answer2"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg2}}</p>
        </div>
        <!--        第二步 -->
        <div v-show="currentIndex === 1">
          <div class="question"><div class="label">问题3：</div>虚拟币的名称是什么？</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..."  v-model.trim="answer3"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg3}}</p>
          <div class="question margin-que"><div class="label">问题4：</div>介绍一下[虚拟币名称]</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..." v-model.trim="answer4"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg4}}</p>
          <div class="question margin-que"><div class="label">问题5：</div>[虚拟币名称]的官网是？</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..."  v-model.trim="answer5"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg5}}</p>
        </div>
        <!--        第三步 -->
        <div v-show="currentIndex === 2">
          <div class="question"><div class="label">问题6：</div>如何开户交易[虚拟币名称]？</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..." v-model.trim="answer6"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg6}}</p>
          <div class="question margin-que"><div class="label">问题7：</div>[虚拟币名称]的收益与分红情况如何？</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..." v-model.trim="answer7"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg7}}</p>
          <div class="question margin-que"><div class="label">问题8：</div>交易[虚拟币名称]的税费是多少？</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..." v-model.trim="answer8"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg8}}</p>
        </div>
        <!--        第四步 -->
        <div v-show="currentIndex === 3">
          <div class="question"><div class="label">问题9：</div>介绍一下[虚拟币名称]的投资安全。</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..." v-model.trim="answer9"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg9}}</p>
          <div class="question margin-que"><div class="label">问题10：</div>如何保护[虚拟币名称]投资人的信息安全？</div>
          <div class="answer">
            <div class="label">回答：</div>
            <div class="textarea-w">
              <textarea class="textarea" placeholder="请输入你的回答..." v-model.trim="answer10"></textarea>
            </div>
          </div>
          <p class="err-text">{{errMsg10}}</p>
        </div>
        <div class="btn-w">
          <div class="btn"  v-show="currentIndex > 0" @click="preBtn">上一页</div>
          <div class="btn"  v-show="currentIndex < 3" @click="nextBtn">下一页</div>
          <div class="btn finish-btn" v-show="currentIndex === 3" @click="finishBtn">完成</div>
        </div>
        <div class="link" @click="fullFade">跳转到完整定制</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/dialog'
	export default {
		data() {
			return {
        aiQA: [],
			  routeName: this.$route.query.name,
        errMsg1: '',
        errMsg2: '',
        errMsg3: '',
        errMsg4: '',
        errMsg5: '',
        errMsg6: '',
        errMsg7: '',
        errMsg8: '',
        errMsg9: '',
        errMsg10: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        answer6: '',
        answer7: '',
        answer8: '',
        answer9: '',
        answer10: '',
        currentIndex: 0
      }
		},
    created () {
		  this.getA()
    },
    methods: {
      fullFade () {
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
      },
      getA () {
        this.$fetch.post('/template', {
          operation: 'GetTemplateSimple',
          chatbotId: this.$route.query.uuid,
          type: 'CRYPTO'
        }).then(res => {
          if (res.length) {
            this.aiQA = res
            this.answer1 = res[0].answer
            this.answer2 = res[1].answer
            this.answer3 = res[2].answer
            this.answer4 = res[3].answer
            this.answer5 = res[4].answer
            this.answer6 = res[5].answer
            this.answer7 = res[6].answer
            this.answer8 = res[7].answer
            this.answer9 = res[8].answer
            this.answer10 = res[9].answer
          }
        })
      },
      preBtn () {
        this.currentIndex--
      },
      nextBtn () {
        this.errMsg1 = ''
        this.errMsg2 = ''
        this.errMsg3 = ''
        this.errMsg4 = ''
        this.errMsg5 = ''
        this.errMsg6 = ''
        this.errMsg7 = ''
        this.errMsg8 = ''
        this.errMsg9 = ''
        this.errMsg10 = ''
        if (this.currentIndex === 0) {
          if (this.answer1 === '') {
            this.errMsg1 = '请输入回答'
          }
          if (this.answer2 === '') {
            this.errMsg2 = '请输入回答'
          }
          if (this.answer1 !== '' && this.answer2 !== '') {
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[0].category,
              id: this.aiQA[0].id,
              answer: this.answer1
            }).then(res => {
            })
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[1].category,
              id: this.aiQA[1].id,
              answer: this.answer2
            }).then(res => {
              this.currentIndex++
            })
          }
        } else if (this.currentIndex === 1) {
          if (this.answer3 === '') {
            this.errMsg3 = '请输入回答'
          }
          if (this.answer4 === '') {
            this.errMsg4 = '请输入回答'
          }
          if (this.answer5 === '') {
            this.errMsg5 = '请输入回答'
          }
          if (this.answer3 !== '' && this.answer4 !== '' && this.answer5 !== '') {
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[2].category,
              id: this.aiQA[2].id,
              answer: this.answer3
            }).then(res => {})
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[3].category,
              id: this.aiQA[3].id,
              answer: this.answer4
            }).then(res => {})
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[4].category,
              id: this.aiQA[4].id,
              answer: this.answer5
            }).then(res => {
              this.currentIndex++
            })
          }
        } else if (this.currentIndex === 2) {
          if (this.answer6 === '') {
            this.errMsg6 = '请输入回答'
          }
          if (this.answer7 === '') {
            this.errMsg7 = '请输入回答'
          }
          if (this.answer8 === '') {
            this.errMsg8 = '请输入回答'
          }
          if (this.answer6 !== '' && this.answer7 !== '' && this.answer8 !== '') {
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[5].category,
              id: this.aiQA[5].id,
              answer: this.answer6
            }).then(res => {})
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[6].category,
              id: this.aiQA[6].id,
              answer: this.answer7
            }).then(res => {})
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[7].category,
              id: this.aiQA[7].id,
              answer: this.answer8
            }).then(res => {
              this.currentIndex++
            })
          }
        }
      },
      finishBtn () {
        if (this.currentIndex === 3) {
          if (this.answer9 === '') {
            this.errMsg9 = '请输入回答'
          }
          if (this.answer10 === '') {
            this.errMsg10 = '请输入回答'
          }
          if (this.answer9 !== '' && this.answer10 !== '') {
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[8].category,
              id: this.aiQA[8].id,
              answer: this.answer9
            }).then(res => {})
            this.$fetch.post('/template', {
              operation: 'UpdateTemplateEntry',
              chatbotId: this.$route.query.uuid,
              category: this.aiQA[9].category,
              id: this.aiQA[9].id,
              answer: this.answer10
            }).then(res => {
              Dialog({
                content: '定制完成',
                type: 'confirm',
                cancelText: '立即聊天',
                okText: '继续定制',
                okFn: () => {
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
                },
                cancelFn: () => {
                  this.$router.push({
                    path: '/aiChat',
                    query: {
                      uuid: this.$route.query.uuid,
                      name: this.$route.query.name,
                      apiKey: this.$route.query.apiKey,
                      createdAt: this.$route.query.createdAt,
                      endpoint: this.$route.query.endpoint
                    }
                  })
                }
              })
            })
          }
        }
      }
    }
	}
</script>

<style scoped lang="stylus">
.madeProgress-w
  background-color: #e4e4e6;
  padding: 50px 30px;
  position: relative;
  .wrap-w
    max-width: 1620px
    margin: 0 auto
    min-height: calc(100vh - 180px);
    background-color: #fff
    display: flex
    align-items center
    flex-direction column
    padding-bottom: 50px
    .content
      width: 910px
      .link
        margin-top: 50px
        cursor pointer
        text-align: right
        display inline-block
        float: right
        border-bottom: 1px solid #3376ff
      .progress-w
        position: relative
        margin-top: 120px
        display: flex
        flex-direction column
        align-items center
        .line
          position: absolute
          left: 50%
          top: 50%
          transform translate(-50%, -50%)
          width: 690px;
          height: 4px
          background-color: #f2f2f2
        .progress-uls
          display: flex
          align-items center
          justify-content center
          width: 700px;
          .progress-item
            width: 52px
            height: 52px
            border-radius 50%
            display: flex
            align-items center
            justify-content center
            font-size: 24px
            color #ccc
            background-color: #f2f2f2
            margin-right: 160px
            position: relative
            z-index: 10
            &.active-progress
              width: 58px
              height: 58px
              color #fff
              background-color: rgba(51,118,255, .2)
              &::before
                content ''
                width: 44px
                height: 44px
                border-radius 50%
                background-color: #3376ff
                position: absolute
                left: 50%
                top: 50%
                transform translate(-50%,-50%)
              span
                position: relative
                z-index: 30
            &:last-child
              margin-right: 0
      .label
        width: 76px;
        line-height: 2;
      .question
        font-size: 18px
        color #090d21
        margin: 100px 0 40px
        display: flex
        align-items center
      .margin-que
        margin-top: 40px
      .answer
        font-size: 18px
        color #090d21
        display: flex
        .textarea-w
          width: 840px
          height: 140px
          border-radius 6px
          border: 1px solid #d9d9d9
          .textarea
            width: 100%
            height: 100%
            padding: 20px
            font-size: 16px
      .err-text
        font-size: 14px
        color #fd3e4b
        margin-left: 76px;
        margin-top: 10px
      .btn-w
        display: flex
        align-items center
        justify-content center
        margin-top: 60px
        .btn
          width: 160px
          height: 54px
          border: 1px solid #d9d9d9
          color #999
          font-size: 20px
          display: flex
          align-items center
          justify-content center
          border-radius 6px
          cursor pointer
          &:nth-child(2), &.finish-btn
            margin-left: 30px
            color #fff
            background-color: #3376ff
</style>
