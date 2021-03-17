import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '前台用户管理',
    icon: 'folder-o',
    children: [
      { path: '/admin-usermess', title: '用户信息管理', icon: 'group' },
      { path: '/register-applyfor', title: '用户注册申请', icon: 'group' },
      { path: '/amend-email-applyfor', title: '用户邮箱变更申请', icon: 'group' },
      { path: '/logout-applyfor', title: '用户注销申请', icon: 'group' },
    ]
  },
  {
    title: '社团展示信息管理',
    icon: 'folder-o',
    children: [
      { path: '/clud-intro', title: '社团简介管理' },
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '页面 3' }
    ]
  }
])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '前台用户管理',
    icon: 'folder-o',
    children: [
      { path: '/admin-usermess', title: '用户信息管理', icon: 'group' },
      { path: '/register-applyfor', title: '用户注册申请', icon: 'group' },
      { path: '/amend-email-applyfor', title: '用户邮箱变更申请', icon: 'group' },
      { path: '/logout-applyfor', title: '用户注销申请', icon: 'group' }
    ]
  },
  {
    title: '社团展示信息管理',
    icon: 'folder-o',
    children: [
      { path: '/clud-intro', title: '社团简介管理' },
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '页面 3' }
    ]
  }
])
