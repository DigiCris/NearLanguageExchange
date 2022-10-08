import React from 'react'
import Form from "../../components/form"
import { getProfile } from '../../utils/contract'

export default function MyProfile() {
  return (
    <>
      <Form />
      <button onClick={getProfile({'id':'cryptocris.testnet'})}>getProfile</button>
    </>
  )
}
