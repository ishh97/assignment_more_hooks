import React ,{ useState, useReducer, useRef } from 'react'
import './App.css'


const arr=[]
function reduer(iniState, action){
  switch(action.type){
    case 'Add':
      return[...iniState,{ name:action.data, visible:true}]
    case 'toggle':
      return iniState.map((item, index) =>{
        console.log(item.visible);
        if(index === action.index){
          
          return{...item, visible: !item.visible}
        }
        else{
          return item
        } 
      })
    default:
      return iniState
  }
}



const App = () => {

  let [value, setValue] = useState("")
  let [myArr, dispatch] = useReducer(reduer, arr)
  let inputFocus =useRef()

  function HandleContent(e){
    setValue(e.target.value)
  }
  function hideContent(index){
    dispatch({type: 'toggle', index})
    
  }
  function addContent(){
    dispatch({type: 'Add', data:value})
  }

  function focusBox(){
    inputFocus.current.focus()
  }
  return (
    <>
    <div className='inputDiv'>
      <input ref={inputFocus} type="text" onChange={(e) => HandleContent(e)}/>
      <button onClick={addContent}>Add</button>
    </div>
    <div className='content'>{
      myArr.map((item, index) =>{
        return <div key={index}>
          <p>{item.visible? item.name:'The Content is Hidden'}</p>
          <button onClick={()=>{hideContent(index)}}>Toggle</button>
        </div>
      })
      } 
      </div>
      <button onClick={focusBox}>Focus</button>
    </>
  )
}

export default App