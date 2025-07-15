import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { TodoFormPropTypes } from '../interfaces';

function TodoForm(props:TodoFormPropTypes) {
  const { addUpdateItemToList, currentItem } = props;
  const [ input, setInput ] = useState<string>('')
  const [ invalidInputFlag, setInvalidInputFlag ] = useState<boolean>(false)

  useEffect(() => {
    if (currentItem?._id) {
      setInput(currentItem.description)
    }else {
      setInput("")
    }
  },[currentItem])

  const handleOnInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.length === 0) {
      setInvalidInputFlag(true)
      setTimeout(() => {
        setInvalidInputFlag(false)
      },500)
    }else {
      setInvalidInputFlag(false)
      addUpdateItemToList(input)
      setInput('')
    }
  }

  return (
    <form className="todo-form" onSubmit={(e) => handleOnSubmit(e)}>
      <input type="text" value={input} onChange={(e) => handleOnInputChange(e)} className={`todo-input ${invalidInputFlag ? 'invalid-input' : ''}`} placeholder='What is the task today?' />
      <button type="submit" className='todo-btn'>{currentItem?._id ? 'Update Task' : 'Add Task'}</button>
    </form>
  )
}

export default TodoForm