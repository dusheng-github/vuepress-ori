import Element from 'element-ui';
import plugins from './plugins'
import 'element-ui/lib/theme-chalk/index.css';

export default ({ Vue, options, router }) => {
  Vue.use(Element);
  Vue.use(plugins);
};