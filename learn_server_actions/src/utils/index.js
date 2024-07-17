export const addNewUserFormControls =[
    {
        name:'firstName',
        label:'FirstName',
        placeholder:'Enter your First name',
        type:'input'
    },
    {
        name:'lastName',
        label:'LastName',
        placeholder:'Enter your Last name',
        type:'input'
    },
    {
        name:'email',
        label:'Email',
        placeholder:'Enter your email',
        type:'email'
    },
    {
        name:'address',
        label:'Address',
        placeholder:'Enter your address',
        type:'input'
    }
]

export const addNewUserFormInitialState = {
    firstName:'',
    lastName:'',
    email:'',
    address:''
}