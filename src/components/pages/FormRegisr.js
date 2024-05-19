
import { useEffect, useState } from 'react';
import './scssPages/formRegistr.scss'
import { useDispatch, useSelector } from 'react-redux';
import { sendingfetchForm, fetchDbFilter, onToggleAuthorization } from './slicePages/formRegisterSlice';
//import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from "yup"

const FormRegisr = () => {

      const dispatch = useDispatch();
      const [formValueLogin, setFormValueLogin] = useState('');
      const [formValuePassword, setFormValuePassword] = useState('');
      const [checked, setChecked] = useState(false)
      const [loginRegister, setloginRegister] = useState()
      const [resAuthorization, setResAuthorization] = useState()
      const { registerObj, stateAuthorization } = useSelector(state => state.formRegisterSlice)

      console.log(stateAuthorization);
      //const { stateAuthorization } = useSelector(state => state.formRegisterSlice)
      //const { stateCheckbox } = useSelector(state => state.formRegisterSlice)
      //const { v4: uuidv4 } = require('uuid');
      //console.log(registerObj);

      useEffect(() => {
            dispatch(fetchDbFilter())

      }, []);

      const userAuthorization = () => {
            registerObj.map((item) => {
                  if (item === formValueLogin + formValuePassword) {
                        setResAuthorization(`${formValueLogin} вы авторизованы!`);
                        dispatch(onToggleAuthorization([true, formValueLogin]))
                  }

            })
      }

      const resObj = {
            login: formValueLogin,
            password: formValuePassword,
      };

      const onSubmit = (e) => {
            if (loginRegister === 'Registration') {
                  //e.preventDefault()
                  //fetchData()
                  dispatch(sendingfetchForm(resObj))
                  alert(`Ваш login: ${resObj.login},
Ваш password: ${resObj.password}`)
                  setFormValueLogin('');
                  setFormValuePassword('');
                  setChecked(false);
            } else if (loginRegister === 'Authorization') {
                  e.preventDefault()
                  userAuthorization()
                  setFormValueLogin('');
                  setFormValuePassword('');
                  setChecked(false);
                  //console.log('Authorization');
            }

      }

      const optionChecked = loginRegister === 'Registration' ? "Согласие на регистрацию" : 'Согласие на авторизацию';
      const optionH1 = loginRegister === 'Registration' ? "Форма регистрации" : 'Форма авторизации';
      const divElse = <div className='wrapper__registe-true'>Привет {stateAuthorization[1]}</div>



      return (

            <div className='wrapper__register'>
                  {!stateAuthorization[0] ? <div className='form_registr'>
                        <h1>{optionH1}</h1>
                        <form onSubmit={onSubmit} className='forma__registration'>
                              <label htmlFor="login">Логин: </label>
                              <input
                                    className="form-control"
                                    type="text"
                                    required
                                    onChange={(e) => setFormValueLogin(e.target.value)}
                                    name="login"
                                    value={formValueLogin}
                                    id="login"
                                    placeholder="Введите логин" />

                              <label htmlFor="password" className='forma__registration'> Пароль:</label>
                              <input
                                    type="password"
                                    className="form-control"
                                    required
                                    onChange={(e) => setFormValuePassword(e.target.value)}
                                    name="password"
                                    value={formValuePassword}
                                    id="password"
                                    placeholder="Введите пароль"
                              />

                              <label htmlFor="currency" className="forma__registration">Регистрация/Авторизация</label>
                              <select
                                    required
                                    onChange={(e) => setloginRegister(e.target.value)}
                                    className="form-select"
                                    id="currency"
                                    value={loginRegister}
                                    name="currency"
                                    as="select"
                              >
                                    <option></option>
                                    <option value="Registration">Регистрация</option>
                                    <option value="Authorization">Авторизация</option>

                              </select>

                              <label htmlFor='happy' className={checked ? 'custom-label custom-checkbox-active' : 'custom-label'}>
                                    <input id="happy"
                                          type="checkbox"
                                          onChange={() => setChecked(!checked)}
                                          className='custom-checkbox'
                                          checked={checked}
                                          name="terms"
                                    />{optionChecked}
                              </label>
                              <button
                                    disabled={!loginRegister || !checked || !formValuePassword || !formValueLogin}
                                    type="submit"
                                    className="btn btn-primary forma__registration">отправить
                              </button>
                        </form>


                  </div> : divElse}

            </div>

      );
}

export default FormRegisr;
