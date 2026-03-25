# quickgit

Done: 

1. 防命令注入fix, command injection. [使用 execFile代替exec]
2. 空参数的process.exit 和 归并退出至 catch block 中
3. 3. 拿**git log 对比一下 msg 浅度去重**，防止unexpected 连着push 两条（主要是 上下键的命令太近了

---

TODO:

1. 多参数enhance 比如说 prefix
2. 实时print out cmd输出
3. `str.trim().replace(/\r\n/g, '\n')` 多行git commit msg 的复杂样式handler
4. latestMsg 为空的fallback， errorHandler

