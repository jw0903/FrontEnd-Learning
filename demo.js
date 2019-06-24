
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
