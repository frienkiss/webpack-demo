// import { create } from "domain";

// Object.defineProperty
function cb(val) {
    console.log('update modelandview...')
}
// 订阅者  对应多个观察者
class Dep{
    constructor(val) {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

//观察者
class Watcher {
    constructor() {
        Dep.target = this
    }
    update() {
        console.log('watcher update dom..')
    }
}

Dep.target = null
function defineReactive(obj, key, val) {
    console.log('define')
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true, // 可枚举
        configurable: true,// 可修改或删除
        get: function getReactive() {
            console.log('getter')
            console.log(Dep.target)
            dep.addSub(Dep.target)
            return val
        },
        set: function setReactive(newval) {
            if(newval == val) return;
            cb(newval)
            dep.notify()
        }
    })
}

function observer(value) {
    console.log(typeof value)
    if(!value || typeof value !== 'object') return

    Object.keys(value).forEach(key => {

        console.log(key)
        defineReactive(value, key, value[key])
    })
}
class Vue {
    constructor(options) {
        //super()
        this._data = options.data
        
        observer(this._data)
        console.log('new wathcer')
        new Watcher()
        //console.log('render~' + this._data.test)   //触发get
    }
}

let vue = new Vue({
    data: {
        test: 'hello world'
    }
})
vue._data.test = 'updated dom'
console.log(vue._data.test) // hello world


//VNode  虚拟树
class VNode {
    constructor(tag, data, children, text, elm) {
          /*当前节点的标签名*/
          this.tag = tag;
          /*当前节点的一些数据信息，比如 props、attrs 等数据*/
          this.data = data;
          /*当前节点的子节点，是一个数组*/
          this.children = children;
          /*当前节点的文本*/
          this.text = text;
          /*当前虚拟节点对应的真实 dom 节点*/
          this.elm = elm;
    }
}
{/* <template>
    <p class='testp' v-show='isShow'>hello world</p>
    <span>test</span>
</template> */}

let vnode = new VNode(
    'span',
    {
        directives: [
            {
                rawName: 'v-show',
                expr: 'isShow',
                name: 'show',
                value: true
            }
        ],
        staticClass: 'testp'
    },
    [new VNode(undefined, undefined, undefined, 'hello world')] //递归
)
console.log(vnode)

// 创造一个空节点
function creatEmptyNode() {
    let node = new VNode()
    node.text = ''
    return node
}
console.log(creatEmptyNode())

// 文本节点
function creatTextNode(text) {
    let node = new VNode(undefined, undefined, undefined, String(text))
    return node
}
console.log(creatTextNode('text node'))

//克隆
function cloneNode(node) {
    let newnode = new VNode(node.tag, node.data, node.children, node.text, node.elm)
    return newnode
}
console.log(cloneNode(vnode))