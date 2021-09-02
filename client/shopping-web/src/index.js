import {Router} from '@vaadin/router';
import './views/dashboard';
import './views/notfound';

const rootContainer = document.getElementById('root');
const router = new Router(rootContainer);
router.setRoutes([
  {path: '/',     component: 'shopping-dashboard'},
  {path: '(.*)', component: 'not-found'},
]);