import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
type Inputs = {
  username: string
  email: string
}

export default function Temp() {
  // const [username,setUsername] = useState('')
  const form = useForm<Inputs>()
  // console.log(form)
  const { register,control } = form


  
  return (

  <>
    <form>

      <input type='text' {...register('username', {
      min: 3,
      onChange: (e) => console.log(e.target.value)
  })}/>

      <input type='email' {...register("email")} />


      <input type="submit" />

    </form>
    <DevTool control={control}/>
  </>
  )
}