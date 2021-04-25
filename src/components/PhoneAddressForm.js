import React,{useState,useEffect} from 'react'
import { makeStyles,TextField,Button } from '@material-ui/core'
import useForm from './useForm';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumber,isValidPhoneNumber  } from 'react-phone-number-input'
import * as phoneService from './phoneService'
import { Alert} from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40%',
      },
    },
    phone:{
        textAlign:'center',
        width: '10%',
        
    }
  }));

const initialValues={
    firstName:'',
    lastName:'',
}
export default function PhoneAddressForm(props) {
    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props

    const validate=()=>{
        console.log(phoneValue)
        let temp=[]
        if(phoneValue!== 0){
        temp.firstName=values.firstName?"":"This field Cannot be Empty"
        temp.lastName=values.lastName?"":"This field Cannot be Empty"
        temp.phoneNumber=isValidPhoneNumber(phoneValue)?"":"Invalid Number"
        setErrors({
            ...temp
        })
       }
       else{
         temp.phoneNumber="This field Cannot be Empty"
         setErrors({
            ...temp
        })
       }
        return Object.values(temp).every(x => x=== "")
    }

    const {values,setValues,handleInput,errors,setErrors}=useForm(initialValues)
    const [phoneValue,setPhoneValue]=useState(0)

    useEffect(() => {
        console.log(recordForEdit)
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const handleSubmit=e=>{
        e.preventDefault()
        
        if (validate()){
            const phoneNumber = parsePhoneNumber(phoneValue)
        const data={
            firstName:values.firstName,
            lastName:values.lastName,
            phoneNumber:phoneValue,
            extension:phoneNumber.country
        }
            //phoneService.insertContact(data)
            if(props.addOrEdit){
                console.log(values)
                addOrEdit(values);
            }
            else{
                phoneService.insertContact(data)
            }
            handleReset()
            window.location.href='/'
            
        }
        
    }
    

    const handleReset=()=>{
        setValues(initialValues)
        setPhoneValue('')
        setErrors({})
    }


    
    return (
        <form className={classes.root} noValidate autoComplete="off">
           <TextField id="outlined-basic" label="First Name" variant="outlined" value={values.firstName} name="firstName" onChange={handleInput} error={errors.firstName?true:false} helperText={errors.firstName} />
           <TextField id="outlined-basic" label="Second Name" variant="outlined" value={values.lastName} name="lastName" onChange={handleInput}  error={errors.lastName?true:false} helperText={errors.lastName}/>
           <PhoneInput  countryCallingCodeEditable={false}  placeholder="Phone Number" value={values.phoneNumber} name="phoneNumber" onChange={setPhoneValue} />
           {errors.phoneNumber?<Alert severity="error">This is not a valid number</Alert>:""}
           <br />
           <Button className={classes.phone} variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
           <Button className={classes.phone} variant="contained" color="default" onClick={handleReset}>Reset</Button>
        </form>
    )
}
