# tpage
滚动分页插件，目前只是初步版本，后期会加入更多的分页功能
```javascript
   var page = new TPage("place", {
       page: 2,
       url: "http://www.wutongwei.com/page/{page}.htm",
       callback: bottom
   });
   //回调函数
   function bottom(data) {
      console.log(data);
   }

```

###参数说明
|参数名   | 参数作用               |
|--------|:---------------------|
|element | 将滚动分页应用到哪个标签里|
|options |  可选参数              |

###可选参数说明
|参数     | 参数作用               |
|---------|:----------------------|
|page    | 初始化分页，默认为第一页   |
|callback | 滚动到底部时候触发的时间  |
|url     | 请求链接，链接中需要替换的分页数，必须用{page}来标注，比如http://www.wutongwei.com/page/{page}.htm |

###函数说明
|函数     |函数作用
|---------|:-------------|
|scroll(function)   | 滚动时触发的事件, function中有两个回调参数，滚动位置top和事件e |
|toTop()    | 滚动到顶部 |
|to(number) | 滚动到某个位置|
|extend     | 扩展函数  |

##反馈
如果期间遇到什么问题， 请反馈给我微信号：bboyer, 我会及时的处理bug，谢谢！ 如果对你有用， 就拿去吧！
