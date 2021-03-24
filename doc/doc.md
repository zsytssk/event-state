- @ques 在 state.useSelector 中监听 state.inner 的改变，怎么处理
  - 首先需要监听 inner 的修改

return {..., userInner}

- state.inner?.bind 必须实现
  - 中监听 state.inner 的改变
  - return fn 取消绑定
  - 重新触发 useSelector
  - 性能优化

useSelector(fn, triggerFn | eventList);
triggerFn | eventList triggerFn 每次 return true 都修改

- 假如下面有很多的 inner 该怎么处理

  - state.inner1 ｜ state.inner2 ｜ state.inner2 ...

- eventList triggerFn 怎么样

- @todo appState.useState 监听修改
