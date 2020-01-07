<template>
  <div class="add-w">
    <div class="path-navigation">
      <div class="link">
        <div class="line">
          <img src="../../../assets/img/common/border.png" alt="">
        </div>新增信息
      </div>
    </div>
    <p class="desc">请在本页补充更多信息，以问答形式提供。</p>
    <div>
      <div>
        <div class="input-title title-one">
          <div class="input-name">信息名称</div>
        </div>
        <ul class="input-box">
          <li class="li-one">
            <input type="text" class="input" placeholder="" v-model.trim="value1" @input="inputM">
          </li>
          <div class="error-m">{{errInputMsg}}</div>
        </ul>
      </div>
      <div v-for="(item, idx) in table" :key="idx">
        <div>
          <div class="input-title title-one">
            <div class="input-name">问题</div><div class="add-icon" @click="addName(1, idx)">+ {{$t('corpus.text6')}}</div>
          </div>
          <ul class="input-box">
            <li v-for="(item, index) in questionsArr1[idx]" :key="index">
              <div class="li-one">
                <input type="text" class="input" placeholder="" v-model.trim="item.name">
                <div class="delete-icon" @click="delIntr(index, 1, idx)" v-show="questionsArr1[idx].length > 1"><img src="../../../assets/img/common/delete.png"></div>
              </div>
              <div class="error-m">{{item.errorText}}</div>
            </li>
          </ul>
        </div>
        <div>
          <div class="input-title title-one">
            <div class="input-name">答案</div><div class="add-icon" @click="addName(2, idx)">+ {{$t('corpus.text6')}}</div>
          </div>
          <ul class="input-box">
            <li v-for="(item, index) in questionsArr2[idx]" :key="index">
              <div class="li-one">
                <input type="text" class="input" placeholder="" v-model.trim="item.name">
                <div class="delete-icon" @click="delIntr(index, 2, idx)" v-show="questionsArr2[idx].length > 1"><img src="../../../assets/img/common/delete.png"></div>
              </div>
              <div class="error-m">{{item.errorText}}</div>
            </li>
          </ul>
        </div>
        <div class="save-btn save-other save-delete" @click="deleteBtn(idx)" v-show="idx > 0">
          <div class="save">删除</div>
        </div>
      </div>
      <div class="save-btn save-other" @click="addOrder">
        <div class="save">添加其他问题</div>
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
			  table: [''],
        loadingBtn: false,
        value1: '',
        errInputMsg: '',
        questionsArr1: [[{name: '', errorText: ''}]],
        questionsArr2: [[{name: '', errorText: ''}]],
      }
		},
    methods: {
	    deleteBtn (index) {
		    this.table.splice(index, 1)
		    this.questionsArr1.splice(index, 1)
		    this.questionsArr2.splice(index, 1)
      },
		  verify () {
		    let flag = true
			  this.errInputMsg = ''
		    if (this.value1 === '') {
		      this.errInputMsg = '请输入信息名称'
          flag = false
        }
		    this.questionsArr1.forEach(item => {
		      if (item.name === '') {
		        item.errorText = '请输入问题'
            flag = false
          } else {
			      item.errorText = ''
          }
        })
        this.questionsArr2.forEach(item => {
          if (item.name === '') {
            item.errorText = '请输入答案'
            flag = false
          } else {
	          item.errorText = ''
          }
        })
        return flag
      },
      addOrder () {
        this.table.push('')
	      this.questionsArr1.push([{name: '', errorText: ''}])
	      this.questionsArr2.push([{name: '', errorText: ''}])
      },
      saveFn () {
        if (this.verify()) {
        	this.loadingBtn = true
	        let q1 = []
	        this.questionsArr1.forEach((it, index) => {
		        q1.push([])
		        it.forEach(c => {
			        q1[index].push(c.name)
		        })
	        })
	        let a1 = []
	        this.questionsArr2.forEach((it, index) => {
		        a1.push([])
		        it.forEach(c => {
			        a1[index].push(c.name)
		        })
	        })
          this.$fetch.post('/template', {
            operation: 'AddTemplateEntry',
            chatbotId: this.$route.query.uuid,
            category: this.value1,
            question: q1,
            answer: a1
          }).then(res => {
	          this.loadingBtn = false
	          Dialog({
		          content: '保存成功'
            })
          })
        }
      },
      inputM () {
        let reg = /^[\u4e00-\u9fa5\u3001\a-zA-Z0-9_\s]+$/
        if (reg.test(this.value1)) {
          this.errInputMsg = ''
        } else {
          this.errInputMsg = this.$t('charles.text12')
        }
      },
      // 删除
      delIntr(index, type, mindex) {
        if (type === 1) this.questionsArr1[mindex].splice(index, 1)
        if (type === 2) this.questionsArr2[mindex].splice(index, 1)
      },
      // 添加
      addName(type, index) {
        let cope = {name: '', errorText: ''}
        if(type === 1) {
          this.questionsArr1[index].push(cope);
        } else if(type === 2) {
          this.questionsArr2[index].push(cope);
        }
      },
    }
	}
</script>

<style scoped lang="stylus">
.add-w
  .save-btn
    cursor pointer
    height 50px
    background #3376ff
    text-align center
    color #fff
    font-size 18px
    border-radius 6px
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
  .save-other
    background-color: #e1ebff
    color #3376ff
    margin: 50px 0 20px
  .save-delete
    color #fff
    background-color: #fd3e4b
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
  .path-navigation
    font-size: 20px
    color #090d21
    padding-bottom: 20px
    border-bottom: 1px dashed #ccc
  .desc
    font-size: 20px
    color #090d21
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
</style>
