'use strict';

var formatNumber = function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
};
var wxTimer = function wxTimer(initObj) {
	initObj = initObj || {};
	this.beginTime = Number(initObj.beginTime) || 0; //开始时间
	this.interval = initObj.interval || 0; //间隔时间
	this.complete = initObj.complete; //结束任务
	this.intervalFn = initObj.intervalFn; //间隔任务
	this.name = initObj.name; //当前计时器在计时器数组对象中的名字

	this.intervarID; //计时ID
	this.endTime; //结束时间
	this.endSystemTime; //结束的系统时间
};

wxTimer.prototype = {
	//开始
	start: function start(self) {
		// this.endTime = new Date("1970/01/01 " + this.beginTime).getTime();//1970年1月1日的00：00：00的字符串日期
		// this.endSystemTime = new Date(Date.now() + this.endTime);
		var that = this;
		//开始倒计时
		var count = 0; //这个count在这里应该是表示s数，js中获得时间是ms，所以下面*1000都换成ms
		function begin() {
			// var tmpTime = new Date(that.endTime - 1000 * count++);
			// //把2011年1月1日日 00：00：00换成数字型，这样就可以直接1s，1s的减，就变成了倒计时，为了看的更明确，又用new date把字符串换回来了
			// var tmpTimeStr = tmpTime.toString().substr(16, 8);//去掉前面的年月日就剩时分秒了
			// var wxTimerSecond = (tmpTime.getTime() - new Date("1970/01/01 00:00:00").getTime()) / 1000;
			// var h = formatNumber(parseInt(wxTimerSecond / 3600))
			// var m = formatNumber(parseInt((wxTimerSecond % 3600) / 60)) 
			// var s = formatNumber(parseInt(wxTimerSecond % 60)) 
			var wxTimerSecond = that.beginTime--;
			// console.log(wxTimerSecond)
			var h = formatNumber(parseInt(wxTimerSecond / 3600));
			var m = formatNumber(parseInt(wxTimerSecond % 3600 / 60));
			var s = formatNumber(parseInt(wxTimerSecond % 60));
			var wxTimerList = self.wxTimerList || {};
			//更新计时器数组
			wxTimerList[that.name] = {
				wxTimer: h + ':' + m + ':' + s,
				wxTimerSecond: wxTimerSecond,
				h: h,
				m: m,
				s: s
			};
			self.wxTimerList = wxTimerList;
			self.$apply();
			//时间间隔执行函数
			if (0 == (count - 1) % that.interval && that.intervalFn) {
				that.intervalFn();
			}
			//结束执行函数
			if (wxTimerSecond <= 0) {
				if (that.complete) {
					that.complete();
				}
				that.stop();
			}
		}
		begin();
		this.intervarID = setInterval(begin, 1000);
	},
	//结束
	stop: function stop() {
		clearInterval(this.intervarID);
	},
	//校准
	calibration: function calibration() {
		this.endTime = this.endSystemTime - Date.now();
	}
};

module.exports = wxTimer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4VGltZXIuanMiXSwibmFtZXMiOlsiZm9ybWF0TnVtYmVyIiwibiIsInRvU3RyaW5nIiwid3hUaW1lciIsImluaXRPYmoiLCJiZWdpblRpbWUiLCJOdW1iZXIiLCJpbnRlcnZhbCIsImNvbXBsZXRlIiwiaW50ZXJ2YWxGbiIsIm5hbWUiLCJpbnRlcnZhcklEIiwiZW5kVGltZSIsImVuZFN5c3RlbVRpbWUiLCJwcm90b3R5cGUiLCJzdGFydCIsInNlbGYiLCJ0aGF0IiwiY291bnQiLCJiZWdpbiIsInd4VGltZXJTZWNvbmQiLCJoIiwicGFyc2VJbnQiLCJtIiwicyIsInd4VGltZXJMaXN0IiwiJGFwcGx5Iiwic3RvcCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImNhbGlicmF0aW9uIiwiRGF0ZSIsIm5vdyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsZUFBZSxTQUFmQSxZQUFlLElBQUs7QUFDekJDLEtBQUlBLEVBQUVDLFFBQUYsRUFBSjtBQUNBLFFBQU9ELEVBQUUsQ0FBRixJQUFPQSxDQUFQLEdBQVcsTUFBTUEsQ0FBeEI7QUFDQSxDQUhEO0FBSUEsSUFBSUUsVUFBVSxTQUFWQSxPQUFVLENBQVVDLE9BQVYsRUFBbUI7QUFDaENBLFdBQVVBLFdBQVcsRUFBckI7QUFDQSxNQUFLQyxTQUFMLEdBQWlCQyxPQUFPRixRQUFRQyxTQUFmLEtBQTZCLENBQTlDLENBRmdDLENBRWlCO0FBQ2pELE1BQUtFLFFBQUwsR0FBZ0JILFFBQVFHLFFBQVIsSUFBb0IsQ0FBcEMsQ0FIZ0MsQ0FHVTtBQUMxQyxNQUFLQyxRQUFMLEdBQWdCSixRQUFRSSxRQUF4QixDQUpnQyxDQUlNO0FBQ3RDLE1BQUtDLFVBQUwsR0FBa0JMLFFBQVFLLFVBQTFCLENBTGdDLENBS1M7QUFDekMsTUFBS0MsSUFBTCxHQUFZTixRQUFRTSxJQUFwQixDQU5nQyxDQU1BOztBQUVoQyxNQUFLQyxVQUFMLENBUmdDLENBUVA7QUFDekIsTUFBS0MsT0FBTCxDQVRnQyxDQVNUO0FBQ3ZCLE1BQUtDLGFBQUwsQ0FWZ0MsQ0FVSjtBQUM1QixDQVhEOztBQWFBVixRQUFRVyxTQUFSLEdBQW9CO0FBQ25CO0FBQ0FDLFFBQU8sZUFBVUMsSUFBVixFQUFnQjtBQUN0QjtBQUNBO0FBQ0EsTUFBSUMsT0FBTyxJQUFYO0FBQ0E7QUFDQSxNQUFJQyxRQUFRLENBQVosQ0FMc0IsQ0FLUjtBQUNkLFdBQVNDLEtBQVQsR0FBaUI7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFJQyxnQkFBZ0JILEtBQUtaLFNBQUwsRUFBcEI7QUFDQTtBQUNBLE9BQUlnQixJQUFJckIsYUFBYXNCLFNBQVNGLGdCQUFnQixJQUF6QixDQUFiLENBQVI7QUFDQSxPQUFJRyxJQUFJdkIsYUFBYXNCLFNBQVVGLGdCQUFnQixJQUFqQixHQUF5QixFQUFsQyxDQUFiLENBQVI7QUFDQSxPQUFJSSxJQUFJeEIsYUFBYXNCLFNBQVNGLGdCQUFnQixFQUF6QixDQUFiLENBQVI7QUFDQSxPQUFJSyxjQUFjVCxLQUFLUyxXQUFMLElBQW9CLEVBQXRDO0FBQ0E7QUFDQUEsZUFBWVIsS0FBS1AsSUFBakIsSUFBeUI7QUFDeEJQLGFBQVlrQixDQUFaLFNBQWlCRSxDQUFqQixTQUFzQkMsQ0FERTtBQUV4QkosbUJBQWVBLGFBRlM7QUFHeEJDLFFBSHdCO0FBSXhCRSxRQUp3QjtBQUt4QkM7QUFMd0IsSUFBekI7QUFPQVIsUUFBS1MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQVQsUUFBS1UsTUFBTDtBQUNBO0FBQ0EsT0FBSSxLQUFLLENBQUNSLFFBQVEsQ0FBVCxJQUFjRCxLQUFLVixRQUF4QixJQUFvQ1UsS0FBS1IsVUFBN0MsRUFBeUQ7QUFDeERRLFNBQUtSLFVBQUw7QUFDQTtBQUNEO0FBQ0EsT0FBSVcsaUJBQWlCLENBQXJCLEVBQXdCO0FBQ3ZCLFFBQUlILEtBQUtULFFBQVQsRUFBbUI7QUFDbEJTLFVBQUtULFFBQUw7QUFDQTtBQUNEUyxTQUFLVSxJQUFMO0FBQ0E7QUFDRDtBQUNEUjtBQUNBLE9BQUtSLFVBQUwsR0FBa0JpQixZQUFZVCxLQUFaLEVBQW1CLElBQW5CLENBQWxCO0FBQ0EsRUE5Q2tCO0FBK0NuQjtBQUNBUSxPQUFNLGdCQUFZO0FBQ2pCRSxnQkFBYyxLQUFLbEIsVUFBbkI7QUFDQSxFQWxEa0I7QUFtRG5CO0FBQ0FtQixjQUFhLHVCQUFZO0FBQ3hCLE9BQUtsQixPQUFMLEdBQWUsS0FBS0MsYUFBTCxHQUFxQmtCLEtBQUtDLEdBQUwsRUFBcEM7QUFDQTtBQXREa0IsQ0FBcEI7O0FBeURBQyxPQUFPQyxPQUFQLEdBQWlCL0IsT0FBakIiLCJmaWxlIjoid3hUaW1lci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZvcm1hdE51bWJlciA9IG4gPT4ge1xuXHRuID0gbi50b1N0cmluZygpXG5cdHJldHVybiBuWzFdID8gbiA6ICcwJyArIG5cbn1cbnZhciB3eFRpbWVyID0gZnVuY3Rpb24gKGluaXRPYmopIHtcblx0aW5pdE9iaiA9IGluaXRPYmogfHwge307XG5cdHRoaXMuYmVnaW5UaW1lID0gTnVtYmVyKGluaXRPYmouYmVnaW5UaW1lKSB8fCAwO1x0Ly/lvIDlp4vml7bpl7Rcblx0dGhpcy5pbnRlcnZhbCA9IGluaXRPYmouaW50ZXJ2YWwgfHwgMDtcdFx0XHRcdC8v6Ze06ZqU5pe26Ze0XG5cdHRoaXMuY29tcGxldGUgPSBpbml0T2JqLmNvbXBsZXRlO1x0XHRcdFx0XHQvL+e7k+adn+S7u+WKoVxuXHR0aGlzLmludGVydmFsRm4gPSBpbml0T2JqLmludGVydmFsRm47XHRcdFx0XHQvL+mXtOmalOS7u+WKoVxuXHR0aGlzLm5hbWUgPSBpbml0T2JqLm5hbWU7XHRcdFx0XHRcdFx0XHQvL+W9k+WJjeiuoeaXtuWZqOWcqOiuoeaXtuWZqOaVsOe7hOWvueixoeS4reeahOWQjeWtl1xuXG5cdHRoaXMuaW50ZXJ2YXJJRDtcdFx0XHRcdFx0XHRcdFx0XHQvL+iuoeaXtklEXG5cdHRoaXMuZW5kVGltZTtcdFx0XHRcdFx0XHRcdFx0XHRcdC8v57uT5p2f5pe26Ze0XG5cdHRoaXMuZW5kU3lzdGVtVGltZTtcdFx0XHRcdFx0XHRcdFx0XHQvL+e7k+adn+eahOezu+e7n+aXtumXtFxufVxuXG53eFRpbWVyLnByb3RvdHlwZSA9IHtcblx0Ly/lvIDlp4tcblx0c3RhcnQ6IGZ1bmN0aW9uIChzZWxmKSB7XG5cdFx0Ly8gdGhpcy5lbmRUaW1lID0gbmV3IERhdGUoXCIxOTcwLzAxLzAxIFwiICsgdGhpcy5iZWdpblRpbWUpLmdldFRpbWUoKTsvLzE5NzDlubQx5pyIMeaXpeeahDAw77yaMDDvvJowMOeahOWtl+espuS4suaXpeacn1xuXHRcdC8vIHRoaXMuZW5kU3lzdGVtVGltZSA9IG5ldyBEYXRlKERhdGUubm93KCkgKyB0aGlzLmVuZFRpbWUpO1xuXHRcdHZhciB0aGF0ID0gdGhpcztcblx0XHQvL+W8gOWni+WAkuiuoeaXtlxuXHRcdHZhciBjb3VudCA9IDA7Ly/ov5nkuKpjb3VudOWcqOi/memHjOW6lOivpeaYr+ihqOekunPmlbDvvIxqc+S4reiOt+W+l+aXtumXtOaYr21z77yM5omA5Lul5LiL6Z2iKjEwMDDpg73mjaLmiJBtc1xuXHRcdGZ1bmN0aW9uIGJlZ2luKCkge1xuXHRcdFx0Ly8gdmFyIHRtcFRpbWUgPSBuZXcgRGF0ZSh0aGF0LmVuZFRpbWUgLSAxMDAwICogY291bnQrKyk7XG5cdFx0XHQvLyAvL+aKijIwMTHlubQx5pyIMeaXpeaXpSAwMO+8mjAw77yaMDDmjaLmiJDmlbDlrZflnovvvIzov5nmoLflsLHlj6/ku6Xnm7TmjqUxc++8jDFz55qE5YeP77yM5bCx5Y+Y5oiQ5LqG5YCS6K6h5pe277yM5Li65LqG55yL55qE5pu05piO56Gu77yM5Y+I55SobmV3IGRhdGXmiorlrZfnrKbkuLLmjaLlm57mnaXkuoZcblx0XHRcdC8vIHZhciB0bXBUaW1lU3RyID0gdG1wVGltZS50b1N0cmluZygpLnN1YnN0cigxNiwgOCk7Ly/ljrvmjonliY3pnaLnmoTlubTmnIjml6XlsLHlianml7bliIbnp5LkuoZcblx0XHRcdC8vIHZhciB3eFRpbWVyU2Vjb25kID0gKHRtcFRpbWUuZ2V0VGltZSgpIC0gbmV3IERhdGUoXCIxOTcwLzAxLzAxIDAwOjAwOjAwXCIpLmdldFRpbWUoKSkgLyAxMDAwO1xuXHRcdFx0Ly8gdmFyIGggPSBmb3JtYXROdW1iZXIocGFyc2VJbnQod3hUaW1lclNlY29uZCAvIDM2MDApKVxuXHRcdFx0Ly8gdmFyIG0gPSBmb3JtYXROdW1iZXIocGFyc2VJbnQoKHd4VGltZXJTZWNvbmQgJSAzNjAwKSAvIDYwKSkgXG5cdFx0XHQvLyB2YXIgcyA9IGZvcm1hdE51bWJlcihwYXJzZUludCh3eFRpbWVyU2Vjb25kICUgNjApKSBcblx0XHRcdHZhciB3eFRpbWVyU2Vjb25kID0gdGhhdC5iZWdpblRpbWUgLS1cblx0XHRcdC8vIGNvbnNvbGUubG9nKHd4VGltZXJTZWNvbmQpXG5cdFx0XHR2YXIgaCA9IGZvcm1hdE51bWJlcihwYXJzZUludCh3eFRpbWVyU2Vjb25kIC8gMzYwMCkpXG5cdFx0XHR2YXIgbSA9IGZvcm1hdE51bWJlcihwYXJzZUludCgod3hUaW1lclNlY29uZCAlIDM2MDApIC8gNjApKVxuXHRcdFx0dmFyIHMgPSBmb3JtYXROdW1iZXIocGFyc2VJbnQod3hUaW1lclNlY29uZCAlIDYwKSlcblx0XHRcdHZhciB3eFRpbWVyTGlzdCA9IHNlbGYud3hUaW1lckxpc3QgfHwge307XG5cdFx0XHQvL+abtOaWsOiuoeaXtuWZqOaVsOe7hFxuXHRcdFx0d3hUaW1lckxpc3RbdGhhdC5uYW1lXSA9IHtcblx0XHRcdFx0d3hUaW1lcjogYCR7aH06JHttfToke3N9YCxcblx0XHRcdFx0d3hUaW1lclNlY29uZDogd3hUaW1lclNlY29uZCxcblx0XHRcdFx0aCxcblx0XHRcdFx0bSxcblx0XHRcdFx0c1xuXHRcdFx0fVxuXHRcdFx0c2VsZi53eFRpbWVyTGlzdCA9IHd4VGltZXJMaXN0XG5cdFx0XHRzZWxmLiRhcHBseSgpO1xuXHRcdFx0Ly/ml7bpl7Tpl7TpmpTmiafooYzlh73mlbBcblx0XHRcdGlmICgwID09IChjb3VudCAtIDEpICUgdGhhdC5pbnRlcnZhbCAmJiB0aGF0LmludGVydmFsRm4pIHtcblx0XHRcdFx0dGhhdC5pbnRlcnZhbEZuKCk7XG5cdFx0XHR9XG5cdFx0XHQvL+e7k+adn+aJp+ihjOWHveaVsFxuXHRcdFx0aWYgKHd4VGltZXJTZWNvbmQgPD0gMCkge1xuXHRcdFx0XHRpZiAodGhhdC5jb21wbGV0ZSkge1xuXHRcdFx0XHRcdHRoYXQuY29tcGxldGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGF0LnN0b3AoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YmVnaW4oKTtcblx0XHR0aGlzLmludGVydmFySUQgPSBzZXRJbnRlcnZhbChiZWdpbiwgMTAwMCk7XG5cdH0sXG5cdC8v57uT5p2fXG5cdHN0b3A6IGZ1bmN0aW9uICgpIHtcblx0XHRjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YXJJRCk7XG5cdH0sXG5cdC8v5qCh5YeGXG5cdGNhbGlicmF0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy5lbmRUaW1lID0gdGhpcy5lbmRTeXN0ZW1UaW1lIC0gRGF0ZS5ub3coKTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHd4VGltZXI7XG4iXX0=