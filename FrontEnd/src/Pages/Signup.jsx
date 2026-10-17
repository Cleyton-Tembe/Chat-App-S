import { useState } from 'react'
import toast from 'react-hot-toast'
import useAuthStore  from '../Store/auth-store'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../Components/AuthImagePattern'
import { ValidateEmail } from '../Utils/Validation'

const Signup = () => {

  const [showpassword, setShowpassword] = useState(false)
  const [formdata, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  })

  const {isSigningUp, SignUp} = useAuthStore()

  const ValidateForm = () => {

    if(!formdata.fullname.trim() || !formdata.email.trim() || !formdata.password.trim()) {
      toast.error('All fields must be filled')
      return false
    }
    
    if(!ValidateEmail(formdata.email.trim()) ){
      toast.error('Email format not valid')
      return false
    }

    if(formdata.password.length < 4) {
      toast.error('Password has to have at least 4 characters!')
      return false
    }

    return true

  }

  const HandleSubmit = (e) => {

    e.preventDefault()
    if(ValidateForm()) {
      SignUp(formdata)
      setFormData({fullname: '', email: '', password:''})
    }

  }

  return (
    
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center
                  group-hover:bg-primary/20 transition-colors'>
                    <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'> Create Account</h1>
              <p className='text-base-content/60'> Get started with your free account</p>

            </div>
          </div>
          <form onSubmit={(e) => HandleSubmit(e)} className='space-y-3'>
                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text font-medium'>Full Name</span>
                    </label>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <User className='size-5 text-base-content/40' />
                  </div>

                  <input
                      type='text'
                      className={`input input-bordered w-full pl-10`}
                      placeholder='Type your full name here'
                      value={formdata.fullname}
                      onChange={(e) => setFormData({...formdata, fullname: e.target.value})}
                      name='full-name'
                  />
                </div>

                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text font-medium'> Email</span>
                    </label>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Mail className='size-5 text-base-content/40' />
                  </div>

                  <input
                      type='email'
                      className={`input input-bordered w-full pl-10 h-12`}
                      placeholder='Type your email here'
                      value={formdata.email}
                      onChange={(e) => setFormData({...formdata, email: e.target.value})}
                      name='email'
                  />
                </div>

                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text font-medium'> Password </span>
                    </label>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <Lock className='size-5 text-base-content/40' />
                  </div>

                  <input
                      type={showpassword ? 'text' : 'password'}
                      className={`input input-bordered w-full pl-10`}
                      placeholder='Type your password here'
                      value={formdata.password}
                      onChange={(e) => setFormData({...formdata, password: e.target.value})}
                      name='password'
                  />

                  <button 
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center justify-center'
                      onClick={() => setShowpassword(!showpassword)}
                  >
                      { showpassword ? 
                        (<EyeOff className='size-5 text-base-content/40' />)
                        : (<Eye className='size-5 text-base-content/40' />)
                      }
                  </button>
                </div>
                
                <button
                  type='submit'
                  className='btn btn-primary w-full'
                  disabled={isSigningUp}
                >
                  { isSigningUp ? 
                    (<>
                      <Loader2 className='size-5 animate-spin' />
                       ...Loading
                    </>)
                    :
                    ("Create Account")
                  }
                </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
                  Alreade Have an Account ? {" "}
                  <Link to={'/login'} className='link link-primary' >
                      Sign in
                  </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern title={"Join Our community"} subtitle={"Connect with friends, family, share moments and more"} />
      
    </div>
  )
}

export default Signup
