import { render, screen } from '@testing-library/react';
import configStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Home from "../../pages/Home";


test('should render todo component', () => {

  const initialState = { state: [] };
  const mockStore = configStore();
  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  const todoElement = screen.getByTestId('todo-test');
  expect(todoElement).toBeInTheDocument();

})

test('should render our todos', () => {

  const initialState = { state: [] };
  const mockStore = configStore();
  const store = mockStore(initialState);

  const transactions = [{ title: "name", description: "saurabh", isCompleted: false }];


  render(
    <Provider store={store}>
      <Home data={transactions} />
    </Provider>
  );

  const todoElement = screen.getByTestId('todo-data-test');
  expect(todoElement).toBeInTheDocument();

})