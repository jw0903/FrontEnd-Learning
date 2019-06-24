const createProxy = data => {
	if (typeof data === 'object' && data.toString() === '[object Object]') {
		for (let k in data) {
			if (typeof data[k] === 'object'){
				// 如果是对象的话，类似数组，采用一下方式
				defineObjectReactive(data, k,data[k]);
			} else {
				// 如果是其他类型：数字/字符串 则采用以下方式
				defineBasicReactive(data, k, data[k]);
			}
		}
	}
}

function defineObjectReactive(obj, key, value) {
	createProxy(value);
	obj[key] = new Proxy(value, {
		set(target, property, val, receiver) {
			if (property !== 'length') {
				console.log('set %s to %o', property, val);
			}
			return Reflect.set(target, property, val, receiver);
		}
	})
}

function defineBasicReactive(obj, key, value) {
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: false,
		get () {
			return value
		},
		set(newVal) {
			if (value === newVal) return;
			console.log(`发现${key} 属性 ${value} ---> ${newVal}`)
			value = newVal;
		}
	})
}

let data = {
	name: 'jiang',
	userInfo: {
		gender: 0,
		movies: []
	},
	list: []
};
createProxy(data);
data.name = 'solo';
data.userInfo.gender = 0;
data.userInfo.movies.push('星际穿越');
data.list.push(1);
data.list.push('hhhh 我是新增加的值');
data.list[0] = '我才是第一个值';


const defineReactiveProxyData = data => new Proxy(data, {
	get: function (data, key) {
		console.log(`getting ${key}`);
		return Reflect.get(data, key);
	},k
	set: function (data, key, newVal) {
		console.log(`setting ${key}`);
		if (typeof newVal === 'object') {
			return Reflect.set(data, key, defineReactiveProxyData(newVal));
		}
		return Reflect.set(data, key, newVal);
	}
})

const data = {
	name: 'nanjing',
	age: 19
};

const vm = defineReactiveProxyData(data);
vm.name
vm.age = 20;