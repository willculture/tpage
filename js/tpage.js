(function(win, doc) {

	function tpage(ele) {
		this.dom = doc.querySelector(ele); 
		if (ele == "html") {
			this.dom = this.dom.querySelector("body");
		}
		this.bottomfn = function() {};
		this.isbottom = false;
	 
		this.dom.onscroll = scrollEvent.call(this);

		/**
		 * scroll事件
		 */
		function scrollEvent() {
			var _this = this;
			return function(e) {
				e.preventDefault();
				var height = _this.top() + _this.sheight();
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

	tpage.prototype.toTop = function() {
		this.to(0)
	}

	tpage.prototype.to = function(val) {		
		this.dom.scrollTop != 'undefind' ? this.dom.scrollTop = val : win.scrollTo(null, val);
	}

	tpage.prototype.top = function() {
		var top = this.dom.scrollTop?this.dom.scrollTop:this.dom.scrollY;
		if(this.dom == document.body) { //body中得scrollTop在firefox被取消,但是在chrome中document中的scrollTop被取消，所以取window的 
			top = win.scrollY;
		} 
		return top;
	}

	tpage.prototype.height = function() {
		if (this.dom == win) {
			return Math.max(document.documentElement.clientHeight, this.dom.clientHeight);
		}
		return this.dom.clientHeight;
	}
	
	tpage.prototype.sheight = function () {
		console.log(document.documentElement.clientHeight)
		return document.documentElement.clientHeight;
	}

	win.TPage = tpage;

})(window, document);