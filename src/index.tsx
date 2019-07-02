import * as React from 'react'
import * as ReactDOM from 'react-dom'

//import Hello from './components/hello'  /* 写法错误，没有default默认导出*/
import {Hello} from './components/hello'
let age: number = 23
let str: string = `my age is ${age}`
const uldata: Array<ulData> = [{name: 'bobo', age:21},  {name: 'chechen', age: 23}]

declare namespace JSX {
    interface IntrinsicElements {
        li: any
    }
}
interface ulData  {
    name: string | null,
    age: number |null
}
class Comment extends React.Component<ulData> {
    render() {
        return (
            <li>my name is {this.props.name}, and age is {this.props.age}</li>
        )
    }
}
ReactDOM.render(
    <div>
        <Hello compiler='typeScript' framework='React'/>
        <p>{str}</p>
        {/*  */}
        {/* {uldata.map(item => {
            return <span>{item.name}</span>
        })} */}
        <Comment name='chc' age={12}></Comment>
        <ul>
            {uldata.map((item, index) => {  //不能用forEach,并且保证key值得唯一性，有助于react的diff算法
            //map 是返回一个数组，forEach不返回
            return  <Comment key={index} name={item.name} age={item.age}></Comment>
            })}
        </ul>
        
        
    </div> :any
    ,
    document.getElementById('root')
)