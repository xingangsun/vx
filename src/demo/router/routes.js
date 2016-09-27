import Index from '../views'

import DrawerDemo from '../../components/drawer/demo'
import IconDemo from '../../components/icon/demo'
import InputItemDemo from '../../components/input-item/demo'
import ListDemo from '../../components/list/demo'
import ListItemDemo from '../../components/list/demo/list-item'
import NavbarDemo from '../../components/navbar/demo'
import PullDemo from '../../components/pull/demo'

export default [{
    path: '/',
    component: Index
}, {
    path: '/drawer/demo',
    component: DrawerDemo
}, {
    path: '/icon/demo',
    component: IconDemo
}, {
    path: '/input-item/demo',
    component: InputItemDemo
}, {
    path: '/list/demo',
    component: ListDemo
}, {
    path: '/list-item/demo',
    component: ListItemDemo
}, {
    path: '/navbar/demo',
    component: NavbarDemo
}, {
    path: '/pull/demo',
    component: PullDemo
}]
