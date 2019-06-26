
// Object.defineProperty()示例
// let data = {name: 'lin'};
// observe(data);
// data.name = 'luan';

function observe(data){
	Object.keys(data).forEach((key) => {
		let val = data[key];
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: false,
			get: function() {
				return val;
			},
			set: function (newVal) {
				console.log('value change ' + val + '---->' + newVal);
				val = newVal
			}
		})
	});
}
// let data = {
//     arr: [1,2,3,4]
// }
// observe(data);
// data.arr = [5,6,78,8];
// data.arr[0] = 18;
// data.arr.push(108);

// let data = {
//     name: 'lin'
// }
// observe(data);
// data.name = 'luan';
// data.age = 12;
// https://cn.vuejs.org/v2/guide/list.html#注意事项


// 使用Proxy示例
const createProxy = data => {
	if (typeof data === 'object' && data.toString() === '[object Object]') {
		for (let k in data) {
			if (typeof data[k] === 'object'){
				// 如果是对象的话，类似数组，采用一下方式
				defineObject(data, k,data[k]);
			} else {
				// 如果是其他类型：数字/字符串 则采用以下方式
				defineBasic(data, k, data[k]);
			}
		}
	}
}

function defineObject(obj, key, value) {
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

function defineBasic(obj, key, value) {
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
data.userInfo.movies.push('星际穿越');
data.list.push(100);
data.list[0] = 'THE FIRST VALUE';

