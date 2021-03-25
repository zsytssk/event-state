## Intro

用事件实现的 react 数据管理器；它的原理是每次改变数据时触发事件，在一个地方监听事件去重新获取 state 和生成新的 stateId；
可以创建任意多个的类，任意嵌套，以你舒服的方式组织数据类；
简单是它最大的特点；

use event for react state manager, It use hook listen event change and change stateId;
you can use any class as you want, use the way you like to organize state code.
simple and easy to use.

## api

it provider to api just like redux, `useState` and `useSelector`;

```ts
...
const [state, stateId] = state.useState();
const {...} = state.useSelector(...);
```

## how to use

```
npm install react-event-state
```

- [demo](https://github.com/zsytssk/event-state-test)

```ts
//state.ts
import { EventState } from 'react-event-state';

const StateEvent = {
  UpdateIndex1: 'UpdateIndex1',
  UpdateIndex2: 'UpdateIndex2',
};
class State extends EventState {
  public index1 = 0;
  public index2 = 0;
  constructor() {
    super([StateEvent.UpdateIndex1, StateEvent.UpdateIndex2]);
  }
  public updateIndex1() {
    this.index1 += 1;
    this.emit(StateEvent.UpdateIndex1);
  }
  public updateIndex2() {
    this.index2 += 1;
    this.emit(StateEvent.UpdateIndex2);
  }
}
export const appState = new State();

//app.tsx
import { appState } from './state';

export function App() {
  const [state] = appState.useState();
  const { sum } = appState.useSelector((state) => {
    return { sum: state.index1 + state.index2 };
  });
  return (
    <>
      <button onClick={() => state.updateIndex1()}>index1:{state.index1}</button>
      <button onClick={() => state.updateIndex2()}>index2:{state.index2}</button>
      <span>{sum}</span>
    </>
  );
}
```
