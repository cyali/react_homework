import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
class Cart extends React.Component {
    state = {
        carts: [
            {
                id: 1,
                name: '卫衣',
                price: 200,
                count: 1,
                total: 200,
                isChecked: false
            },
            {
                id: 2,
                name: '裤子',
                price: 300,
                count: 1,
                total: 300,
                isChecked: false
            },
            {
                id: 3,
                name: '毛呢',
                price: 500,
                count: 1,
                total: 500,
                isChecked: false
            }
        ],
        allChecked: false,
        total: 0
    }
    //   componentDidMount() {
    //     console.log("componentDidMount")
    //   }
    //   componentDidUpdate() {
    //     console.log("componentDidUpdate")
    //   }
    //   减法
    reduce = id => {
        console.log(id)
        this.state.carts.map((item, i) => {
            if (item.id === +id) {
                if (item.count > 0) {
                    item.count--
                    item.total = item.count * item.price
                }
            }
        })
        this.setState({})
        this.counTotal()
    }
    // 加法
    add = id => {
        // console.log(id) // 字符串格式的
        this.state.carts.map(item => {
            if (item.id === +id) {
                item.count++
                item.total = item.count * item.price
            }
            //    return item
        })
        this.setState({})
        this.counTotal()
    }
    // 计算总价
    counTotal = () => {
        // 先清空总价
        this.state.total = 0
        this.state.carts.map(item => {
            if (item.isChecked) {
                this.state.total += item.count * item.price
            }
        })
    }
    // 商品选中状态发生变化
    checkStatus = (status, id) => {
        // 假设是全选状态
        let flag = true
        this.state.carts.map(item => {
            // 如果传过来的id和当前点中的id一致，要修改状态
            if (item.id == id) {
                item.isChecked = status
            }
            // 判断是否全选
            if (item.isChecked) {
                flag = false
            }
            this.state.allChecked = flag
            // console.log(this.state.allChecked)
            this.setState({})
            this.counTotal()
        })
    }
    // 全选
    allCheckedStatus = e => {
        // 将全选按钮选中的状态与allchecked绑定
        this.state.allChecked = e.target.checked
        // 并将商品选中状态
        this.state.carts.map(item => {
            item.isChecked = e.target.checked
            //   console.log(item.isChecked,this.state.allChecked)
        })
        this.setState({})
        this.counTotal()
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.carts.map((item, i) => {
                        return <Lis item={item} key={item.id} add={this.add} reduce={this.reduce} checkStatus={this.checkStatus} />
                    })}
                </ul>
                <hr />
                <div className="footer">
                    <input type="checkbox" checked={this.state.allChecked} onChange={this.allCheckedStatus} />全选
                    <span>总计：￥{this.state.total}</span>
                </div>
            </div>
        )
    }
}
class Lis extends React.Component {
    subReduce = e => {
        this.props.reduce(e.target.dataset.id)
    }
    subAdd = e => {
        this.props.add(e.target.dataset.id)
    }
    subCheckStatus = e => {
        // 将商品选中状态和id传给父组件
        this.props.checkStatus(e.target.checked, e.target.dataset.id)
    }
    render() {
        return (
            <li>
                <input type="checkbox" checked={this.props.item.isChecked} onChange={this.subCheckStatus} data-id={this.props.item.id} />
                <span>{this.props.item.name}</span>
                <button onClick={this.subReduce} data-id={this.props.item.id}>
                    -
                </button>
                <input type="text" value={this.props.item.count} disabled />
                <button onClick={this.subAdd} data-id={this.props.item.id}>
                    +
                </button>
                <span>总价：￥{this.props.item.total}</span>
            </li>
        )
    }
}
ReactDOM.render(<Cart />, document.getElementById('cart'))
