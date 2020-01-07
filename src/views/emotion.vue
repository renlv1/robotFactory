<template>
    <div class="emotion">
      <div class="closeImg" @click="goBack()">
        <img src="../assets/img/newFunction/close.png">
      </div>
      <div class="wrap">
        <div class="function-t">人脸识别</div>
        <div class="bottom-line"></div>
        <div class="function-c">【 分析检测到的人脸 】</div>
        <div class="c-t">AI会自动获取用户的面部表情，肢体语言等信号对用户的人脸和情绪进行自动识别。</div>
        <div class="upload-m">
          <div class="big" ref="bigImg" v-show="clickShow">
            <img :src="require('@/assets/img/emotion/'+ index +'.jpg')" alt="" v-show="activeI === index" v-for="(item, index) in 6" :key="index">
          </div>
          <div class="big2" v-show="!clickShow">
            <v-loading v-show="loadingShow"></v-loading>
            <img :src="bigImg" alt="" ref="uploadBig" v-show="bigImg">
          </div>
          <div class="bottom">
            <button class="left arrow" @click="gotoImg(-1)" :class="{'disable-btn': translateX === 0}">
              <img src="../assets/img/user/left.png" alt="">
            </button>
            <div class="uls-w-box">
              <div class="uls-w" ref="ulsBox">
                <ul class="uls" >
                  <li v-for="(item, index) in imgArr3" class="list" ref="imgList" :key="index" @click="showBig(item, index)" :class="{'currentCls': activeI === index}">
                    <img :src="item" alt="">
                  </li>
                </ul>
              </div>
            </div>
            <button class="right arrow" @click="gotoImg(1)" :class="{'disable-btn': translateX === -222}">
              <img src="../assets/img/user/right.png" alt="">
            </button>
          </div>
          <div class="btn-w">
            <a class="btn-download" :href="bigImg" download >
              <img width="14" height="14" src="../assets/img/newFunction/download.png">
              <div class="download-fn">下载图片</div>
            </a>
            <div class="btn-box btn-box2">
              <div class="btn-upload">
                <input @change="uploadImg()" ref="uploadFile" type="file" id="uploadFile" accept="image/*" multiple="multiple" />
                <img width="14" height="14" src="../assets/img/newFunction/upload.png">
                <div class="btn-fn">上传图片</div>
              </div>
              <div class="tips">图片大小不超过3.5M</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Dialog from '@/components/dialog'
    export default {
       data() {
         return{
	         clickShow: true,
	         activeI: 0,
	         bigImg: require('@/assets/img/emotion/0.jpg'),
           liActive: 0,
           isMaxLoading2: true,
	         imgArr3: [
		         require('@/assets/img/emotion/happy.jpg'),
		         require('@/assets/img/emotion/surprise.jpg'),
		         require('@/assets/img/emotion/fear.jpg'),
		         require('@/assets/img/emotion/sad.jpg'),
		         require('@/assets/img/emotion/angry.jpg'),
		         require('@/assets/img/emotion/neutral.jpg')
	         ],
           imgArr: [
             require('@/assets/img/emotion/happy.jpg'),
             require('@/assets/img/emotion/surprise.jpg'),
             require('@/assets/img/emotion/fear.jpg'),
             require('@/assets/img/emotion/sad.jpg'),
             require('@/assets/img/emotion/angry.jpg'),
             require('@/assets/img/emotion/neutral.jpg')
           ],
           imgArr2: [
             require('@/assets/img/emotion/0.jpg'),
             require('@/assets/img/emotion/1.jpg'),
             require('@/assets/img/emotion/2.jpg'),
             require('@/assets/img/emotion/3.jpg'),
             require('@/assets/img/emotion/4.jpg'),
             require('@/assets/img/emotion/5.jpg')
           ],
           uploadShow: true,
           imgDataObj: '',
           errInputMsg: '',
           loadingShow: false,
           isMaxLoading: true,
           myfile1: '',
	         aMind: 0,
	         translateX: 0
         }
       },
      created () {
        this.imgDataObj = this.imgArr2[0]
      },
      components: {
        vLoading: resolve => require(['@/components/loading.vue'], resolve),
      },
      mounted () {
       	setTimeout(() => {
	        this.imgArr3.forEach((item, index) => {
		        this.DrawImage(this.$refs.imgList[index].children[0], 100, 100)
	        })
	        this.imgArr3.forEach((item, index) => {
		        this.DrawImage(this.$refs.bigImg.children[index], 500, 500)
	        })
        }, 500)
      },
      methods: {
	      showBig(item, index) {
	      	this.clickShow = true
          this.activeI = index
		      this.bigImg = require('@/assets/img/emotion/'+ index +'.jpg')
		      setTimeout(() => {
			      this.DrawImage(this.$refs.bigImg.children[0], 500, 500)
		      }, 500)
        },
	      gotoImg (index) {
	      	if (index === 1) {
	      		if (this.aMind < 2) {
				      this.aMind++
				      this.translateX = -111 * this.aMind
				      if (this.translateX === -111) {
					      this.$refs.ulsBox.style.transform = "translateX("+ -111 +"px)";
				      } else 	if (this.translateX === -222) {
					      this.$refs.ulsBox.style.transform = "translateX("+ -222 +"px)";
				      }
            }
          } else {
	      		if (this.aMind > 0 && this.aMind < 3) {
				      this.aMind--
				      this.translateX = this.translateX + 111 * this.aMind
				      if (this.aMind === 1) {
					      this.$refs.ulsBox.style.transform = "translateX("+ -111 +"px)";
				      } else 	if (this.aMind === 0) {
					      this.$refs.ulsBox.style.transform = "translateX("+ 0 +"px)";
					      this.translateX = 0
				      }
            }
          }
        },
	      DrawImage(ImgObj, maxWidth, maxHeight){
          var image = ImgObj
          //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
          // 用于设定图片的宽度和高度
          var tempWidth;
          var tempHeight;
          console.log(image.width, image.height)
          if(image.width > 0 && image.height > 0){
            //原图片宽高比例 大于 指定的宽高比例，这就说明了原图片的宽度必然 > 高度
            if (image.width/image.height >= maxWidth/maxHeight) {
	            tempWidth = maxWidth;
	            ImgObj.style.width = tempWidth + 'px'
            } else {// 原图片的高度必然 > 宽度
	            tempHeight = maxHeight;
	            ImgObj.style.height = tempHeight + 'px'
            }
            // 设置页面图片的宽和高
            // ImgObj.height = tempHeight;
            // ImgObj.width = tempWidth;
            // // 提示图片的原来大小
            // ImgObj.alt = image.width + "×" + image.height;
          }
        },
        deleteIndex(index) {
          this.imgArr.splice(index, 1)
          this.imgArr2.splice(index, 1)
          this.imgDataObj = ''
        },
        downloadIamge() {//下载图片地址和图片名
          var image = new Image();
          // 解决跨域 Canvas 污染问题
          image.setAttribute("crossOrigin", "anonymous");
          image.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

            var a = document.createElement("a"); // 生成一个a元素
            var event = new MouseEvent("click"); // 创建一个单击事件
            a.download = name || "photo"; // 设置图片名称
            a.href = url; // 将生成的URL设置为a.href属性
            a.dispatchEvent(event); // 触发a的单击事件
          };
          image.src = this.imgDataObj;
        },
        changeFn(item, index) {
          let config = {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'EwTdkNBUuS9PqpGHL0YEQ4eJPFpBT4BvaOveNl96'
            }
          }
          this.liActive = index
          let a = item.indexOf(',')
          let f = item.substring(a + 1)
          this.isMaxLoading = false
          this.loadingShow = true
          this.imgDataObj = ''
          if(a > -1) {
            this.$http.post(`${this.$api}facedetection`, {
              encoded_objImg: f,
            },config).then(res => {
              let msg = ''
              if (res.status === 200) {
                let data = res.data.result
                this.loadingShow = false
                this.uploadShow = true
                msg = this.$t('corpus.text30')
                let base = "data:image/png;base64," + data
                this.imgDataObj = base
              } else {
                this.uploadShow = true
                this.isMaxLoading = true
                this.loadingShow = false
                msg = this.$t('corpus.text30')
              }
              Dialog({
                content: msg
              })
            }).catch(err => {
              this.uploadShow = true
              this.isMaxLoading = true
              this.loadingShow = false
              console.log(err)
            })
          } else {
            this.imgDataObj = this.imgArr2[index]
            this.uploadShow = true
            this.isMaxLoading = true
            this.loadingShow = false
          }
        },
        goBack() {
          this.$router.push({
            path: '/aiExploration',
            query: {name: 'a'}
          })
        },
        uploadImg () {
          let imgVal = this.$refs.uploadFile
          let imgObj = imgVal.files[0]
          if (imgObj) {
            let isLt2M = imgObj.size / 1024 / 1024 <= 3.5
            let isType = /(jpg|png|JPG|PNG|jpeg)$/g.test(imgObj.type)
            if (!isType) {
              Dialog({
                content:  '格式不正确'
              })
              imgVal.value = ''
              return
            }
            if (!isLt2M) {
              Dialog({
                content:  '图片超过3.5M'
              })
              imgVal.value = ''
              return
            }
          } else {
            return
          }
          let self = this
	        self.bigImg = ''
          self.loadingShow = true
          self.clickShow = false
          self.activeI = -1




          let reader = new FileReader()
          reader.readAsDataURL(imgObj)
          reader.onloadend = function () {
            // let f = reader.result.split(',')[1]
            // let img =  "data:image/png;base64," + f
            // self.bigImg = img
	          // self.loadingShow = false
            // self.$refs.uploadFile.value = ''
	          let config = {
		          headers: {
			          'Content-Type': 'application/json',
			          'x-api-key': 'EwTdkNBUuS9PqpGHL0YEQ4eJPFpBT4BvaOveNl96'
		          }
	          }
	          let f = reader.result.split(',')[1]
	          self.isMaxLoading = false
	          self.loadingShow = true
	          self.$http.post(`${self.$api}facedetection`, {
              encoded_objImg: f,
            },config).then(res => {
              let msg = ''
              if (res.status === 200) {
                let data = res.data.result
	              self.loadingShow = false
	              self.uploadShow = true
                msg = self.$t('corpus.text30')
                let base = "data:image/png;base64," + data
	              self.bigImg = base
	              self.$refs.uploadBig.style = ''
                setTimeout(() => {
                	let imgBig = self.$refs.uploadBig
	                if(imgBig.width > 0 && imgBig.height > 0){
	                	if (imgBig.width > imgBig.height) {
			                imgBig.style.width = 500 + 'px'
                    } else {
			                imgBig.style.height = 500 + 'px'
                    }
	                }
	                // self.DrawImage(self.$refs.uploadBig, 500, 500)
                }, 500)
              } else {
	              self.uploadShow = true
	              self.isMaxLoading = true
	              self.loadingShow = false
                msg = self.$t('corpus.text30')
              }
              Dialog({
                content: msg
              })
            }).catch(err => {
		          self.uploadShow = true
		          self.isMaxLoading = true
		          self.loadingShow = false
              console.log(err)
            })
          }
        }
      }
    }
</script>

<style scoped lang="stylus">
.emotion{
  padding-bottom 100px
}
.upload-cont{
  display flex
  .left-box{
    border 1px solid #e4e4e4
    padding 20px
    width 450px
    height 700px
    position relative
    .btn-download{
      overflow: hidden
      display: flex;
      align-items: center;
      justify-content: center;
      background-color #3376ff
      color #fff
      cursor pointer
      border-radius 4px
      width 90%
      height 40px
      position absolute
      bottom 30px
      text-align center
      line-height 40px
      img{
        margin-right 10px
      }
    }
  }
  .img-box{
    padding 20px
    margin-right 20px
    width: 408px
    height: 700px
    /*border 1px dashed #ddd*/
    background-color #f6f7fb
    box-sizing border-box
    position relative
    /*overflow hidden*/
    .ul-parent{
      width 100%
      display flex
      flex-wrap wrap
      .li-child{
        position relative
        cursor pointer
        width 180px
        height 160px
        margin-right 8px
        margin-bottom 10px
        img{
          display block
          width 100%
          height 100%
        }
        &:nth-child(2n){
          margin-right 0
        }
        &:nth-child(5){
          margin-bottom 0
        }
        .delete-box{
          display none
          background-color: rgba(0,0,0,0.7);
          z-index: 9;
          position: absolute;
          bottom: 0;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 32px;
          .delete-icon{
            width: 20px;
            height: 20px;
            .delete{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
        &.active{
          border 1px solid #3376ff
        }
        &:hover{
          .delete-box{
            display: flex;
          }
        }
      }
      .upload-box{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position relative
        width 200px
        height 200px
        overflow hidden
        #upload_file2 {
          /*width 100%*/
          /*height 100%*/
          position: absolute
          left: 0
          top: 0
          opacity: 0
          margin-left -900px
          font-size: 200px;
          cursor: pointer;
          .text {
            width: 44px;
            height: 44px;

            .upload_add {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
.upload-img{
  /*margin-right 50px*/
  /*background-color #f6f7fb*/
  /*border 1px solid #ddd*/
  width: 410px
  height: 630px
  position: relative
  cursor pointer
  overflow: hidden
  display flex
  justify-content center
  align-items center
  box-sizing border-box
  &.activeImg{
    background-color #fff
    max-width 410px
    height: 500px
    border none
  }
  .success-box{
    width 100%
    .success-img{
      width 100%
    }
  }
  #uploadFile {
    width 100%
    height 100%
    position: absolute
    left: 0
    top: 0
    opacity: 0
    font-size: 20px;
    cursor: pointer;
  }
  .upload-box{
    display flex
    align-items center
    justify-content center
    flex-direction column
    .upload-icon{
      display block
      width 100px
    }
    span{
      display block
      margin-top 32px
      font-size 20px
      color #ccc
    }
  }
}
.btn-sure{
  position relative
  cursor pointer
  margin-top 40px
  text-align center
  line-height 40px
  width 400px
  height 40px
  background-color #3376ff
  border-radius 4px
  color #fff
  font-size 16px
  .err-ms{
    position absolute
    font-size 12px
    color #ff2121
    top -40px
    left 0
  }
}
.btn-box{
  position absolute
  bottom 30px
  /*margin-top 50px*/
  display flex
  justify-content space-between
  align-items center
  .tips{
    color #C1C2C4
    margin-left 20px
  }
  .btn-upload{
    overflow: hidden
    display: flex;
    align-items: center;
    justify-content center
    border 1px solid #3376ff
    background-color #fff
    color #3376ff
    cursor pointer
    border-radius 4px
    width 150px
    height 40px
    position relative
    text-align center
    line-height 40px
    img{
      margin-right 10px
    }
    #uploadFile {
      font-size 30px
      position: absolute;
      top: 0;
      left: 0;
      margin-left -135px
      /*width: 100%*/
      /*height: 100%*/
      display: block;
      cursor: pointer;
      opacity: 0;
    }
  }
}
.upload-m
  background-color: #f6f7fb;
  padding: 0 10px 10px 10px
  .big,.big2
    width: 500px
    height: 500px
    overflow hidden
    display: flex;
    align-items: center;
    justify-content: center;
    img
      margin: 0 auto
      display: block
      width auto
  .bottom
    display: flex
    align-items center
    margin-top: 20px
    overflow: hidden
    .arrow
      width: 20px;
      min-width 20px
      height: 100px
      display: flex
      align-items center
      justify-content center
      cursor pointer
      border none
      outline none
      background-color: #f6f7fb
      &.disable-btn
        cursor: not-allowed;
      img
        width: 14px
        display: block
    .right
      margin-left: 6px
  .uls-w-box
    width: 450px
    position: relative
    overflow: hidden
  .uls-w
    max-width 450px
    transition all .3s linear
  .uls
    display: flex
    align-items center
    .list
      width 100px
      height 100px
      min-width 100px
      overflow hidden
      margin: 0 7px
      background-color: #000;
      cursor pointer
      &.currentCls
        border: 2px solid #3376ff
      img
        display: block
        width auto
  .btn-w
    display: flex
    align-items center
    margin-top: 20px
    .btn-box2
      position: relative
      left: 0
      top: 0
    .btn-download{
      display: flex;
      align-items: center;
      justify-content: center;
      background-color #3376ff
      color #fff
      cursor pointer
      border-radius 4px
      width 150px
      height 40px
      text-align center
      line-height 40px
      margin-right: 20px
      img{
        margin-right 10px
      }
    }
</style>
