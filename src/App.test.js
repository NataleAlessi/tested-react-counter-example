import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<App />);
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);


test('renders without error', () => {
	const wrapper = setup()
	const appComponent = findByTestAttr(wrapper, 'component-app')
	expect(appComponent.length).toBe(1)
});

test('shows a counter message', () => {
	const wrapper = setup()
	const message = findByTestAttr(wrapper, 'counter-message')
	expect(message.length).toBe(1)
});

test('counter starts at zero', () => {
	const wrapper = setup()
	const message = findByTestAttr(wrapper, 'counter')
	expect(message.text()).toBe('0')
});

test('shows an increment button', () => {
	const wrapper = setup()
	const button = findByTestAttr(wrapper, 'button-increment')
	expect(button.length).toBe(1)
});

test('counter updates correctly when increment button is clicked', () => {
	const wrapper = setup()
	const button = findByTestAttr(wrapper, 'button-increment')
	button.simulate('click')
	const counter = findByTestAttr(wrapper, 'counter')
	expect(counter.text()).toBe('1') 
});

test('shows a decrement button', () => {
	const wrapper = setup()
	const button = findByTestAttr(wrapper, 'button-decrement')
	expect(button.length).toBe(1)
});

test('counter updates correctly when decrement button is clicked and counter is above 0', () => {
	const wrapper = setup()
	let incrementButton = findByTestAttr(wrapper, 'button-increment')
	incrementButton.simulate('click')
	let counter = findByTestAttr(wrapper, 'counter')
	expect(counter.text()).toBe('1')
	const decrementButton = findByTestAttr(wrapper, 'button-decrement')
	decrementButton.simulate('click')
	counter = findByTestAttr(wrapper, 'counter')
	expect(counter.text()).toBe('0') 
});

test('counter cannot go below zero', () => {
	const wrapper = setup()
	let counter = findByTestAttr(wrapper, 'counter')
	expect(counter.text()).toBe('0')
	let decrementButton = findByTestAttr(wrapper, 'button-decrement')
	decrementButton.simulate('click')
	counter = findByTestAttr(wrapper, 'counter')
	expect(counter.text()).toBe('0') 
});

test('error message is not initially displayed', () => {
	const wrapper = setup()
	const errorMessage = findByTestAttr(wrapper, 'error-message')
	expect(errorMessage.length).toBe(0)
});

test('error message displayed if user try to set counter below zero', () => {
	const wrapper = setup()
	const decrementButton = findByTestAttr(wrapper, 'button-decrement')
	decrementButton.simulate('click')
	const errorMessage = findByTestAttr(wrapper, 'error-message')
	expect(errorMessage.length).toBe(1)
});

test('error message disappear when user clicks again on increment button', () => {
	const wrapper = setup()
	const decrementButton = findByTestAttr(wrapper, 'button-decrement')
	decrementButton.simulate('click')
	let errorMessage = findByTestAttr(wrapper, 'error-message')
	expect(errorMessage.length).toBe(1)
	const incrementButton = findByTestAttr(wrapper, 'button-increment')
	incrementButton.simulate('click')
	errorMessage = findByTestAttr(wrapper, 'error-message')
	expect(errorMessage.length).toBe(0)
});