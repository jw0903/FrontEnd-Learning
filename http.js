/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import { Message } from 'element-ui'
// import store from './store/store'
// import * as types from './store/types'
// import router from './router'

// axios 配置
axios.defaults.timeout = 3000
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.HOST

// http request 拦截器
axios.interceptors.request.use(config => {
    return config;
}, err => {
    Message.error({ message: '请求超时!' });
    return Promise.resolve(err);
})


// http response 拦截器
axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.status == 'error') {
        Message.error({ message: data.data.msg });
        return;
    }
    return data;
}, err => {
    console.log(err);
    Message.error({ message: '未知错误!' });
    if (err.response.status == 504 || err.response.status == 404) {
        Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
    } else if (err.response.status == 403) {
        Message.error({ message: '权限不足,请联系管理员!' });
    } else {
        Message.error({ message: '未知错误!' });
    }
    return Promise.resolve(err);
})

export default axios


// 最开始依照Vue-cli脚手架进行搭建项目，vue + vue-router + axios + vuex 
// ajax请求需要在每一次调用中使用如下函数
this.axios.get('/get')
.then(res => {
    console.log(res);
}).catch(error => {
    console.log(error);
});

// 重构第一次,将ajax请求放到了api文件夹中得index.js文件中，如

import axios from 'axios'
import store from '../stroe'
let httpURL = "http://10.12.12.12" // 服务器地址
let localURL = "http:/10.22.84.25" // 本地api接口
axios.defaults.baseURL = localURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlen'

export default {
    getUser () {

    },
    getOrders () {

    },
    submitOrder () {

    }
}

// 页面上如何使用
methods() {
    getUser() {
        this.api.getUser()
        .then(res => {

        }).catch(error => {
            console.log(error);
        })
    }
}

// 再次重构，统一进行错误处理

import axios from 'axios'
import seting from './setting'

let httpURL = "http://10.12.12.12" // 服务器地址
let localURL = "http:/10.22.84.25" // 本地api接口
axios.defaults.baseURL = localURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default class AxiosCache {
    constructor () {
        this.__config = {}
        this.__setting = setting;
        this.init()
    }

    init () {
        this.doFlushSetting(CACHE_KEY,)
    }

    doFlushSetting (key, conf) {
        if (!key && typeof key !== 'string') {
            return
        }
        this.__config[key] = conf
    }

    // 判断状态码
    resultJudge (code) {
        return code;
    }

    // 发送请求数据
    sendRequest (key, options) {
        let send = this.__config[this.settingKey][key];
        let self = this;
        let baseURL = send.url;
        send.method = 'get'
            ? options.data && (send.url += options.data)
            : send.data = options.data;
        axios(send)
            .then(function(response) {
                send.url = baseURL;
                if (self.resultJudge(response.data.status)) {
                    options.success(response.data.dataA);
                } else {
                    options.fail
                        ? options.fail(response.data.data)
                        : self.handleErrorCase(response.data.status)
                }
            }).catch(function(error) {
                self.handleErrorCase(error);
            })
    }

    // 处理错误信息
    handleErrorCase (error) {
        if (typeof error == 'Number') {
            console.log(error);
        } else {
            alert(error);
        }
    }
}

// 发送请求时只需要
getUser () {
    this.userCache.getUser({
        success: res => this.user = res
    })
}
