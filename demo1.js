// 声明一个全局发布-订阅对象
const Observer = (function () {
	// 订阅器
	const _observer = {};
	// 历史记录
	const _cache = {};
	const _shift = Array.prototype.shift;
	const _slice = Array.prototype.slice;
	const _toString = Array.prototype.toString;
	// 订阅
	const subscribe = function (type, callback) {
		if (_toString.call(callback) !== '[object Function]')
			return
		if (!_observer[type]) {
			_observer[type] = [];
		}
		_observer[type].push(callback);
		return this;
	}
	// 发布
	const publish = function () {
		// publish函数有两个传参，一个为发布行为，一个为发布主题
		// 获取发布行为,获取第一个传参
		let type = _shift.call(arguments);
		// 获取发布主题，获取第二个传参
		let theme = _slice.call(arguments);
		// 保存历史发布记录
		if (!_cache[type]) {
			_cache[type] = [theme];
		} else {
			_cache[type].push(theme);
		}

		// 获取相关主题所有订阅者行为
		let subscribes = _observer[type];
		if (!subscribes || !subscribes.length) 
			return;
		subscribes.forEach(callback => {
			// 执行订阅者行为
			callback.apply(this, theme)
		})
		return this;
	}
	//取订
	const unsubscribe = function (type, callback) {
		if (!_observer[type] || !_observer[type].length) 
			return;
		let subscribes = _observer[type];
		subscribes.some((item, index, arr) => {
			if (item === callback) {
				arr.splice(index, 1)
				return true;
			}
		})
		return this;
	}
	// 查看发布记录
	const viewLog = function (type, callback) {
		if (!_cache[type] || _toString.call(callback) !== '[object Function]') {
			return;
		}
		_cache[type].forEach(item => {
			callback.apply(this, item);
		})
		return this;
	}
	return {
		_observer,
		_cache,
		subscribe,
		publish,
		unsubscribe,
		viewLog
	}
}())

// 发布主题
Observer.publish('click', '第一次点击发布消息');
Observer.publish('focus', '第一次发布聚焦消息');
Observer.publish('blur', '第一次发布失焦消息');

let sub1 = function (data) {
	console.log('sub1 ' + data);
}
let sub2 = function (data) {
	console.log('sub2 ' + data);
}
let sub3 = function (data) {
	console.log('sub3 ' + data);
}

Observer.subscribe('click', sub1);
Observer.subscribe('click', sub2);
Observer.subscribe('focus', sub3)


Observer.publish('click', '第二次发布点击消息')
		.unsubscribe('click', sub2)
		.publish('click', '第三次发布点击消息')
		.publish('focus', '第二次发布聚焦消息')
		.viewLog('click', function (message) {
            console.log(message)
        })