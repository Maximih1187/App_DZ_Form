import React from 'react';
import './forms.scss'
import Input from './inputs/Input';
import { Formik, Form } from 'formik';
import { initialValues, schemas } from './helper';
import Button from './button/Button';


const Fofms = () => {
      return (
            <Formik
                  initialValues={initialValues}
                  validationSchema={schemas.custom}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log(JSON.stringify(values, null, 2));
                        //setSubmitting(false);
                        resetForm();

                  }}
            >
                  <Form className='form'>
                        <Input id="name" name="name" lable="Ваше имя" placeholder="введите Ваше имя" />
                        <Input id="email" name="email" lable="Email" placeholder="введите email" />
                        <Input id="password" name="password" lable="Пароль" placeholder="введите пароль" />
                        <Button children='отправить' />
                  </Form>
            </Formik>

      );
}

export default Fofms;
