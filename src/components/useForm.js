import { useState } from 'react'

export default function useForm(initialValues) {

    const [values,setValues]=useState(initialValues)
    const [errors,setErrors]=useState({})

    const handleInput= (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
        handleInput,
        errors,
        setErrors
    }
}
