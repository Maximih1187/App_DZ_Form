
import { Field, ErrorMessage as Error } from 'formik';
import './inputs.scss'

const Input = ({ id, name, lable, placeholder }) => {
      return (
            <div className='input__container'>
                  <label className='input__container-lable' htmlFor={id}>{lable}</label>
                  <Field
                        id={id}
                        name={name}
                        placeholder={placeholder}
                  />
                  <Error name={name} >{(error) => <span>{error}</span>}</Error>
            </div>
      );
}

export default Input;
