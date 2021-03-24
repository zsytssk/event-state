- @ques 在 state.useSelector 中监听 state.inner 的改变，怎么处理
  - 首先需要监听 inner 的修改

return {..., userInner}

- state.inner?.bind 必须实现
  - 中监听 state.inner 的改变
  - return fn 取消绑定
  - 重新触发 useSelector
  - 性能优化
    ·
