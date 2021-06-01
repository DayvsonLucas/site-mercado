import { createStore } from 'redux';
import rootReducer from './ducks';

const store = createStore(rootReducer);
const getStore = () => store;

export { getStore }
export default { getStore }
