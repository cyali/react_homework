import React from 'react'
import ReactDOM from 'react-dom'
class Clock extends React.Component{
    state={
        date:new Date()
    }
    componentDidMount(){
        this.timeId=setInterval(()=>{
            this.setState({
                date:new Date()
            })
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.timeId)
    }
    render(){
        return <div>{this.state.date.toLocaleTimeString()}</div>
    }
}
ReactDOM.render(<Clock />,document.getElementById('clock'))