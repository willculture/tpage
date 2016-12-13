/**
 * tpage用来ajax分页
 * 
 * @author tonway
 */
(function(win, doc) {

	function tpage(ele, options) {
		this.isbottom = false;
		this.dom = doc.querySelector(ele);
		if (ele == "html") {
			this.dom = this.dom.querySelector("body");
		}
		this.bottomfn = function() {
			tpage.ajax.call(this, this.requrl(), this.callback);
		};
		
		//滚动事件配置
		var _scroll = function(top) {
			
		}
		this.scroll = function(fn) {
			_scroll = fn;
		}
		this.page = 1;
		this.extend(options);
		if (this.dom == doc.body) {
			win.onscroll = scrollEvent.call(this);
		} else {
			this.dom.onscroll = scrollEvent.call(this);
		}
		// /////

		this.requrl = function() {
			return this.url.replace("{page}", this.page);
		}

		/**
		 * scroll事件
		 */
		function scrollEvent() {
			var _this = this;
			return function(e) {
				e.preventDefault();
				 _scroll.call(_this, _this.top(), e);
				var height = _this.top() + _this.sheight();
				// console.log(height, _this.height())
				if (height >= _this.height()) {
					if (!_this.isbottom) {
						_this.isbottom = true;
						_this.bottomfn();
					}
				} else {

					_this.isbottom = false;
				}

			};
		}
	}

	/**
	 * 两个参数，直接加一个键值，一个参数是对象，则直接copy
	 */
	tpage.prototype.extend = function() {
		var arg = arguments;
		if (arg.length == 2) {
			this[arg[0]] = arg[1];
		}
		if (arg.length == 1 && arg[0] instanceof Object) {
			var obj = copy(arg[0]);
			for ( var k in obj) {
				this[k] = obj[k];
			}
		}
	}

	function copy(obj) {
		if (typeof (obj) == "object") {
			var result = (obj.constructor === Array ? [] : {});

			for ( var k in obj) {
				result[k] = copy(obj[k]);
			}

			return result;
		}
		return obj;
	}
	/**
	 * ajax获取数据
	 * 
	 * data 数据格式为 { <br>
	 * state:'ok/fail', <br>
	 * msg:'消息', <br>
	 * code: '10000/10001', <br>
	 * 10001代表数据为空 data: [{},{}] //数据<br> }
	 * 
	 */
	tpage.ajax = function(url, callback) {
		if (this.page == -1) {
			callback.call(this, {
				state : 'ok',
				code : '10001',
				msg : '数据加载完成',
				data : []
			});
			return;
		}
		var _this = this;
		var xml = new XMLHttpRequest();
		xml.open("GET", url, true);
		xml.onreadystatechange = function() {
			if (xml.readyState == 4 && xml.status == 200) {
				var data = xml.responseText;
				data = JSON.parse(data);

				if (data.state == 'ok' && data.data.length > 0) {
					callback.call(_this, data);
					_this.page++;
				} else {
					_this.page = -1;
					callback.call(_this, {
						state : 'ok',
						code : '10001',
						msg : '数据加载完成',
						data : []
					});
				}
				_this.isbottom = false;
			}
		}
		xml.send(null);
	}

	tpage.prototype.toTop = function() {
		this.to(0)
	}

	tpage.prototype.to = function(val) {
		this.dom.scrollTop != 'undefind' ? this.dom.scrollTop = val : win.scrollTo(null, val);
		if (this.dom == document.body) {
			win.scrollTo(null, val);
		}
	}

	tpage.prototype.top = function() {
		var top = this.dom.scrollTop ? this.dom.scrollTop : this.dom.scrollY;
		if (this.dom == document.body) { // body中得scrollTop在firefox被取消,但是在chrome中document中的scrollTop被取消，所以取window的
			top = win.scrollY;
		}
		return top;
	}

	tpage.prototype.height = function() {
		return this.dom.scrollHeight;
	}

	tpage.prototype.sheight = function() {
		return this.dom == doc.body ? document.documentElement.clientHeight : this.dom.clientHeight;
	}

	win.TPage = tpage;

})(window, document);