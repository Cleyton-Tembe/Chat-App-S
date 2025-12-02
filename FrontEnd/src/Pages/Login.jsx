import { useState } from 'react'
import useAuthStore  from '../Store/auth-store'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare,} from 'lucide-react'
import AuthImagePattern from '../Components/AuthImagePattern'
import { ValidateEmail } from '../Utils/Validation'
import { Link } from 'react-router-dom'

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [showpassword, setShowpassword] = useState(false)

  const {isLoggingIn, LoggIn} = useAuthStore()

  const ValidateForm = () => {
    
    if(!data.email.trim() || !data.password.trim()) {
      toast.error('Please provide all credentials')
      return false
    }

    if(!ValidateEmail(data.email.trim())) {
      toast.error('Invalid email')
      return false
    }

    return true

  }

  const HandleSubmit = (e) => {
    e.preventDefault()

    if(ValidateForm()) {
      LoggIn(data)
      setData({email: '', password: ''})
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
              <h1 className='text-2xl font-bold mt-2'> Login in Your Account</h1>
              <p className='text-base-content/60'> Start Chatting with your friends </p>

            </div>
          </div>
          <form onSubmit={(e) => HandleSubmit(e)} className='space-y-3'>

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
                      value={data.email}
                      onChange={(e) => setData({...data, email: e.target.value})}
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
                      value={data.password}
                      onChange={(e) => setData({...data, password: e.target.value})}
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
                  disabled={isLoggingIn}
                >
                  { isLoggingIn ? 
                    (<>
                      <Loader2 className='size-5 animate-spin' />
                       ...Loading
                    </>)
                    :
                    ("Login")
                  }
                </button>

                <p className='text-center text-primary'> Don't have an account? <Link to={'/signup'}>
                  <span className='text-base-content font-bold hover:underline'>Sign Up</span>
                </Link>
                
                </p>
          </form>

        </div>
      </div>

      <AuthImagePattern title={"Join Our community"} subtitle={"Connect with friends, family, share moments and more"} />
      
    </div>
  )
}

export default Login
