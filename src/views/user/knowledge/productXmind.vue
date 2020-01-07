<template>
  <div class="xmind-w">
    <div class="top-m">
      <div class="left">
        <img src="../../../assets/img/common/border.png" alt="">
        <span>{{$t('knowledge.text22')}}</span>
      </div>
    </div>
    <div class="xmind-cont" id="jsmind_container"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import jsMind from 'jsmind'
  import 'jsmind/style/jsmind.css'
	export default {
		data() {
			return {}
		},
    mounted () {
      var options = {                   // options 将在下一章中详细介绍
        container:'jsmind_container', // [必选] 容器的ID，或者为容器的对象
        editable:true,                // [可选] 是否启用编辑
        theme:'primary',                // [可选] 主题
        mode :'full',           // 显示模式
        support_html : true,    // 是否支持节点里的HTML元素
        view:{
          engine: 'canvas',   // 思维导图各节点之间线条的绘制引擎
          hmargin:100,        // 思维导图距容器外框的最小水平距离
          vmargin:50,         // 思维导图距容器外框的最小垂直距离
          line_width:2,       // 思维导图线条的粗细
          line_color:'#555'   // 思维导图线条的颜色
        },
        layout:{
          hspace:30,          // 节点之间的水平间距
          vspace:20,          // 节点之间的垂直间距
          pspace:13           // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
        shortcut:{
          enable:true,        // 是否启用快捷键
          handles:{},         // 命名的快捷键事件处理器
          mapping:{           // 快捷键映射
            addchild   : 45,    // <Insert>
            addbrother : 13,    // <Enter>
            editnode   : 113,   // <F2>
            delnode    : 46,    // <Delete>
            toggle     : 32,    // <Space>
            left       : 37,    // <Left>
            up         : 38,    // <Up>
            right      : 39,    // <Right>
            down       : 40,    // <Down>
          }
        }
      };
      var mind = {
        /* 元数据，定义思维导图的名称、作者、版本等信息 */
        "meta":{
          "name":"jsMind-demo-tree",
          "author":"",
          "version":"0.2"
        },
        /* 数据格式声明 */
        "format":"node_tree",
        /* 数据内容 */
        "data":{"id":"root","topic":this.$route.query.name,"children":[
            {"id":"easy","topic":"语料库","direction":"left","expanded":true,"children":[
                {"id":"easy1","topic":"语料库管理"},
                {"id":"easy2","topic":"语料库文件"}
              ]},
            {"id":"open","topic":"知识库","direction":"right","expanded":true,"children":[
                {"id":"open1","topic":"基础信息"},
                {"id":"open2","topic":"交易信息"},
                {"id":"open3","topic":"技术信息"},
                {"id":"open4","topic":"安全信息"},
                {"id":"open5","topic":"机器人设置"}
              ]}
          ]}
      };
      var jm = new jsMind(options);
      jm.show(mind);
    },
	}
</script>

<style scoped lang="stylus">
.xmind-w
  .top-m
    .left
      display: flex
      align-items center
      padding-bottom: 20px
      border-bottom: 1px dashed #ccc
      font-size: 26px
      color #090d21
      img
        margin-right: 14px
  .xmind-cont
    margin-top: 60px
    height: 500px
    background-color: #FBFBFB
</style>
