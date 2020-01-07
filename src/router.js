import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { // 首页
      path: '/',
      redirect: '/home'
    },
    { // 登录
      path: '/home',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    { // AI 聊天
      path: '/aiChat',
      name: 'aiChat',
      component: () => import('./views/aiChat.vue')
    },
    { // AI 体验馆
      path: '/aiExploration',
      name: 'aiExploration',
      component: () => import('./views/aiExploration.vue')
    },
    { // AI 体验馆2
      path: '/aiHallDetails',
      name: 'aiHallDetails',
      component: () => import('./views/aiHallDetails/aiHallDetails.vue')
    },
    { // AI 体验馆 --- 智能聊天
      path: '/intelChat',
      name: 'intelChat',
      component: () => import('./views/aiHallDetails/intelChat.vue')
    },
    { // AI 新功能
      path: '/newFunction',
      name: 'newFunction',
      component: () => import('./views/newFunction.vue')
    },
    { // 人脸识别
      path: '/emotion',
      name: 'emotion',
      component: () => import('./views/emotion.vue')
    },
    { // 风格转换
      path: '/styleTransfer',
      name: 'styleTransfer',
      component: () => import('./views/styleTransfer.vue')
    },
    { // 自动驾驶
      path: '/autopilot',
      name: 'autopilot',
      component: () => import('./views/autopilot.vue')
    },
    { // 定制
      path: '/made',
      name: 'made',
      component: () => import('./views/xuni/made.vue')
    },
    { // 基础定制
      path: '/madeProgress',
      name: 'madeProgress',
      component: () => import('./views/xuni/madeProgress.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/user/userMenu.vue'),
      children: [
        { // 查尔斯
          path: 'charles',
          name: 'charles',
          component: () => import('./views/user/charles/index')
        },
        // { // 知识库-知识点
        //   path: 'knowledge/ai',
        //   name: 'ai',
        //   component: () => import('./views/user/knowledge/ai/index'),
        // },
        // { // 知识库导图
        //   path: 'knowledge/knowledgeXmind',
        //   name: 'knowledgeXmind',
        //   component: () => import('./views/user/knowledge/knowledgeXmind'),
        // },
        { // 知识库
          path: 'knowledge',
          name: 'knowledge',
          component: () => import('./views/user/knowledge/index'),
          children: [
            { // 知识库导图
              path: 'knowledgeXmind',
              name: 'knowledgeXmind',
              component: () => import('./views/user/knowledge/knowledgeXmind'),
            },
            { // 知识库-知识点
              path: 'ai',
              name: 'ai',
              component: () => import('./views/user/knowledge/ai/index'),
            },
            { // 产品导图
              path: 'productXmind',
              name: 'productXmind',
              component: () => import('./views/user/knowledge/productXmind'),
            },
            { // 产品
              path: 'houseToken',
              name: 'houseToken',
              component: () => import('./views/user/knowledge/houseToken/index'),
            }
          ]
        },
        { // 语料库-左侧导航
          path: 'corpusMenu',
          name: 'corpusMenu',
          component: () => import('./views/user/corpus/corpusMenu'),
          children: [
            { // 语料库
              path: 'corpus',
              name: 'corpus',
              component: () => import('./views/user/corpus/index')
            },
            { // 语料库管理 --- 添加语料
              path: 'addCorpus',
              name: 'addCorpus',
              component: () => import('./views/user/corpus/addCorpus.vue')
            },
            { // 语料库管理 --- 语料文件管理
              path: 'fileManagement',
              name: 'fileManagement',
              component: () => import('./views/user/corpus/fileManagement.vue')
            },
          ]
        },
        { // 机器人设置
          path: 'setting',
          name: 'setting',
          component: () => import('./views/user/setting/index')
        },
        { // 修改密码
          path: 'changePassword',
          name: 'changePassword',
          component: () => import('./views/user/userinfo/changePassword')
        },
        { // 用户信息
          path: 'userinfo',
          name: 'userinfo',
          component: () => import('./views/user/userinfo/userinfo')
        }
      ]
    },
    {
      path: '/user2',
      name: 'user2',
      component: () => import('./views/user/userMenu2.vue'),
      children: [
        { // 查尔斯
          path: 'charles',
          name: 'charles2',
          component: () => import('./views/user/charles/index')
        },
        { // 知识库
          path: 'knowledge',
          name: 'knowledge2',
          component: () => import('./views/user/knowledge2/menu'),
          children: [
            { // 知识库导图
              path: 'knowledgeXmind',
              name: 'knowledgeXmind2',
              component: () => import('./views/user/knowledge/knowledgeXmind'),
            },
            { // 添加知识库
              path: 'addMenu',
              name: 'addMenu2',
              component: () => import('./views/user/knowledge2/addMenu'),
            },
            { // 基本信息
              path: 'table1',
              name: 'table12',
              component: () => import('./views/user/knowledge2/table1'),
            },
            { // 交易信息
              path: 'table2',
              name: 'table22',
              component: () => import('./views/user/knowledge2/table2'),
            },
            { // 技术信息
              path: 'table3',
              name: 'table32',
              component: () => import('./views/user/knowledge2/table3'),
            },
            { // 安全信息
              path: 'table4',
              name: 'table42',
              component: () => import('./views/user/knowledge2/table4'),
            },
            { // 安全信息
              path: 'tableOrder',
              name: 'tableOrder',
              component: () => import('./views/user/knowledge2/tableOrder.vue'),
            },
            { // 知识库-知识点
              path: 'ai',
              name: 'ai2',
              component: () => import('./views/user/knowledge/ai/index'),
            },
            { // 产品导图
              path: 'productXmind',
              name: 'productXmind2',
              component: () => import('./views/user/knowledge/productXmind'),
            },
            { // 产品
              path: 'houseToken',
              name: 'houseToken2',
              component: () => import('./views/user/knowledge/houseToken/index'),
            }
          ]
        },
        { // 语料库-左侧导航
          path: 'corpusMenu',
          name: 'corpusMenu2',
          component: () => import('./views/user/corpus/corpusMenu'),
          children: [
            { // 语料库
              path: 'corpus',
              name: 'corpus2',
              component: () => import('./views/user/corpus/index')
            },
            { // 语料库管理 --- 添加语料
              path: 'addCorpus',
              name: 'addCorpus2',
              component: () => import('./views/user/corpus/addCorpus.vue')
            },
            { // 语料库管理 --- 语料文件管理
              path: 'fileManagement',
              name: 'fileManagement2',
              component: () => import('./views/user/corpus/fileManagement.vue')
            },
          ]
        },
        { // 机器人设置
          path: 'setting',
          name: 'setting2',
          component: () => import('./views/user/setting/index')
        },
        { // 修改密码
          path: 'changePassword',
          name: 'changePassword2',
          component: () => import('./views/user/userinfo/changePassword')
        },
        { // 用户信息
          path: 'userinfo',
          name: 'userinfo2',
          component: () => import('./views/user/userinfo/userinfo')
        }
      ]
    },
    { // 登录
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    { // 忘记密码
      path: '/getBackPwd',
      name: 'getBackPwd',
      component: () => import('./views/login/getBackPwd.vue')
    },
    { // 注册
      path: '/register',
      name: 'register',
      component: () => import('./views/login/register.vue')
    },
    { // 设置密码
      path: '/setPassword',
      name: 'setPassword',
      component: () => import('./views/login/setPassword.vue')
    },
    { // 机器人管理
      path: '/robotManagement',
      name: 'robotManagement',
      component: () => import('./views/robotManagement/robotManagement.vue')
    },
    { // 定制模板
      path: '/customTemplates',
      name: 'customTemplates',
      component: () => import('./views/robotManagement/customTemplates.vue')
    },
    { // 基础定制
      path: '/basedCustom',
      name: 'basedCustom',
      component: () => import('./views/robotManagement/basedCustom.vue')
    },
    { // 完整定制
      path: '/ompleteCustom',
      name: 'ompleteCustom',
      component: () => import('./views/robotManagement/ompleteCustom.vue')
    }
  ]
})
