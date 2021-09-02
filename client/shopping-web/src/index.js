import {Router} from '@vaadin/router';
import './views/home';
import './views/notfound';

const rootContainer = document.getElementById('root');
const router = new Router(rootContainer);
router.setRoutes([
  {path: '/',     component: 'shopping-web'},
  {path: '(.*)', component: 'not-found'},
]);