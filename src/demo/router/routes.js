import Index from '../views'

import BtnDemo from '../../components/btn/demo'
import DrawerDemo from '../../components/drawer/demo'
import IconDemo from '../../components/icon/demo'
import InputItemDemo from '../../components/input-item/demo'
import ListDemo from '../../components/list/demo'
import ListItemDemo from '../../components/list/demo/list-item'
import NavbarDemo from '../../components/navbar/demo'
import PageDemo from '../../components/page/demo'
import PullDemo from '../../components/pull/demo'
import SearchbarDemo from '../../components/searchbar/demo'
import SwiperDemo from '../../components/swiper/demo'
import TabbarDemo from '../../components/tabbar/demo'
import TabbarHomeDemo from '../../components/tabbar/demo/tabbar-home'
import TabbarAndroidDemo from '../../components/tabbar/demo/tabbar-android'
import TabbarAppleDemo from '../../components/tabbar/demo/tabbar-apple'
import TabbarHeartDemo from '../../components/tabbar/demo/tabbar-heart'
import ToastDemo from '../../components/toast/demo'

export default [{
    path: '/',
    name: 'Index',
    component: Index
}, {
    path: '/btn/demo',
    name: 'Btn',
    component: BtnDemo
}, {
    path: '/drawer/demo',
    name: 'Drawer',
    component: DrawerDemo
}, {
    path: '/icon/demo',
    name: 'Icon',
    component: IconDemo
}, {
    path: '/input-item/demo',
    name: 'InputItem',
    component: InputItemDemo
}, {
    path: '/list/demo',
    name: 'List',
    component: ListDemo
}, {
    path: '/list-item/demo',
    name: 'ListItem',
    component: ListItemDemo
}, {
    path: '/navbar/demo',
    name: 'Navbar',
    component: NavbarDemo
}, {
    path: '/page/demo',
    name: 'Page',
    component: PageDemo
}, {
    path: '/pull/demo',
    name: 'Pull',
    component: PullDemo
}, {
    path: '/searchbar/demo',
    name: 'Searchbar',
    component: SearchbarDemo
}, {
    path: '/swiper/demo',
    name: 'Swiper',
    component: SwiperDemo
}, {
    path: '/tabbar/demo',
    component: TabbarDemo,
    children: [{
        path: '',
        name: 'Tabbar',
        components: {
            home: TabbarHomeDemo,
            android: TabbarAndroidDemo,
            apple: TabbarAppleDemo,
            heart: TabbarHeartDemo
        }
    }]
}, {
    path: '/toast/demo',
    name: 'Toast',
    component: ToastDemo
}]
