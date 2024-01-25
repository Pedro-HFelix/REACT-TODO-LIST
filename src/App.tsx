import { useState } from 'react'

import { Header } from "./components/Header.tsx";
import { Form } from './components/Forms.tsx';

import styles from './App.module.css'
import './global.css'


export function App() {

  return (
    <>
      <header>
        <Header/>
      </header>

      <div className={styles.contentForm}>
        <Form />
      </div>

    </>
  )

}
