/* eslint-disable */
/**
 * This file is run when test environment is set up
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mockLocalStorage } from './TestHelper';

configure({ adapter: new Adapter() });
mockLocalStorage();
