
import { useEffect, useState } from 'react';
import './scssPages/formRegistr.scss'
import { useDispatch, useSelector } from 'react-redux';
import { sendingfetchForm, fetchDbFilter, onToggleAuthorization } from './slicePages/formRegisterSlice';
//import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from "yup"
import Fofms from '../forms/Forms';




const FormRegisr = () => {

      const dispatch = useDispatch();


      const [login, setFormValueLogin] = useState('');
      const [password, setFormValuePassword] = useState('');


      const [loginDirty, setLoginDirty] = useState(false)
      const [passwordDirty, setPasswordDirty] = useState(false)
      const [loginError, setLoginError] = useState("login не может быть пустым")
      const [passwordError, setPasswordError] = useState("Password не может быть пустым")


      const [loginRegister, setloginRegister] = useState()
      const [resAuthorization, setResAuthorization] = useState()
      const { registerObj, stateAuthorization } = useSelector(state => state.formRegisterSlice)





      const [checked, setChecked] = useState(false)

      useEffect(() => {
            dispatch(fetchDbFilter())

      }, []);

      const userAuthorization = () => {
            registerObj.map((item) => {
                  if (item === login + password) {
                        setResAuthorization(`${login} вы авторизованы!`);
                        dispatch(onToggleAuthorization([true, login]))
                  }

            })
      }

      const resObj = {
            login: login,
            password: password,
      };

      const onSubmit = (e) => {
            if (loginRegister === 'Registration') {
                  //e.preventDefault()
                  //fetchData()
                  dispatch(sendingfetchForm(resObj))
                  alert(`Ваш login: ${resObj.login},Ваш password: ${resObj.password}`)
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


      const loginHandler = (e) => {
            setFormValueLogin(e.target.value.trim().toLowerCase())
            if (!/^[a-zA-Z1-9]+$/.test(login)) {
                  setLoginError('Login должен использовать латинские буквы и цифры!')
            }
            else if (login.length < 5 || login.length > 10) {
                  setLoginError('Login должен быть не менее 5 и не более 8 символов')
            }
            else { setLoginError('') }

      }
      // !/^[a-zA-Z1-9]+$/.test(login)
      const passwordHandler = (e) => {
            setFormValuePassword(e.target.value.trim())
            if (password.length < 5 || password.length > 12) {
                  setPasswordError('Password должен быть не менее 5 и не более 8 символов!')
            }
            else if (password.search(/[a-z]/i) < 0) {
                  setPasswordError('Password должен содержать как минимум одну букву ')
            }
            else if (password.search(/[0-9]/) < 0) {
                  setPasswordError('Password должен содержать как минимум одну цифру ')
            }
            else {
                  setPasswordError("")
            }
      }

      const blurHandler = (e) => {
            switch (e.target.name) {
                  case "login": setLoginDirty(true)
                        break;
                  case "password": setPasswordDirty(true)
                        break;
            }
      }


      return (
            <>

                  <div className='wrapper__register'>
                        <Fofms />
                        {!stateAuthorization[0] ? <div className='form_registr'>
                              <h1>{optionH1}</h1>
                              <form onSubmit={onSubmit} className='forma__registration'>
                                    <label htmlFor="login">Логин: </label>
                                    <input
                                          className="form-control"
                                          type="text"
                                          required
                                          onChange={(e) => loginHandler(e)}
                                          onBlur={(e) => { blurHandler(e) }}
                                          name="login"
                                          value={login}
                                          id="login"
                                          placeholder="Введите логин" />
                                    {(loginDirty && loginError) && <div style={{ "color": "red" }}> {loginError}</div>}
                                    <label htmlFor="password" className='forma__registration'> Пароль:</label>
                                    <input
                                          type="text"
                                          className="form-control"
                                          required
                                          onChange={(e) => passwordHandler(e)}
                                          name="password"
                                          value={password}
                                          id="password"
                                          placeholder="Введите пароль"
                                          onBlur={(e) => { blurHandler(e) }}
                                    />
                                    {(passwordDirty && passwordError) && <div style={{ "color": "red" }}> {passwordError}</div>}
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
                                          disabled={!loginRegister || !checked || passwordError || loginError}
                                          type="submit"
                                          className="btn btn-primary forma__registration">отправить
                                    </button>
                              </form>
                        </div> : divElse}

                  </div>
            </>



      );
}

export default FormRegisr;
