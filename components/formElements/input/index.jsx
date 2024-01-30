import { ChangeEvent } from 'react'
import styles from './styles.module.css';


 const Input = ({Class, labelValue, disabled, type,   ...props}) => {
  return (
    <>
        <label
        className={Class?.label ? Class?.label : styles.label }
        htmlFor={props.id}>

          {labelValue}

        </label>

        <input
        {...props}
        type={type ? type : 'text'}
        disabled={disabled ? disabled : false}
        className={Class?.input ? Class?.input : styles.input}/>
    </>
  )
}

export default Input