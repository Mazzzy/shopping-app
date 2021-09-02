import {Router} from '@vaadin/router';
import './views/dashboard';
import './views/notfound';
import './views/shop-list';

const rootContainer = document.getElementById('root');
const router = new Router(rootContainer);
router.setRoutes([
  {path: '/',     component: 'shopping-dashboard'},
  {path: '/list/(.*)', component: 'shopping-dashboard'},
  {path: '/list-item/(.*)', component: 'shopping-dashboard'},
  {path: '/cart', component: 'shopping-dashboard'},
  {path: '/cart/(.*)', component: 'shopping-dashboard'},
  {path: '(.*)', component: 'not-found'},
]);