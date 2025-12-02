import { create } from "zustand";
import { io } from 'socket.io-client'
import { axiosInstance } from "../Utils/axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingauth: true,
    isLoggingIn: false, 
    isSigningUp: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    CheckAuth: async () => {

        try {
            const response = await axiosInstance.get('/auth/check')
            set({authUser: response.data})
            get().ConnectSocket()
        } catch (error) {
            set({ authUser: null})
            console.error("ERROR CheckAuth fun:", error)
            
        } finally{
            set({ isCheckingauth: false})
        }

    },

    SignUp: async (data) => {

        set({isSigningUp: true})

        try {

            const response = await axiosInstance.post('/auth/signup', data)
            set({authUser: response.data}) 
            toast.success("Account was successvely created!")
            
            get().ConnectSocket()
            
        } catch (me) {
            console.error("ERROR in Signup:", me.response.data)
            toast.error(me.response.data)
            set({isSigningUp: false})
        } finally {
            set({isSigningUp: false})
        }
    },

    LogOut: async () => {

        try {

            const response = await axiosInstance.post('/auth/logout')
            set({authUser: null})
    
            toast.success(response.data.message)

            get().DisconnectSocket()

        } catch (error) {
            console.error("ERROR", error.message)
            toast.error("Couldn't logout - Internal ERROR")
        }
    },

    LoggIn: async (data) => {

        set({isLoggingIn: true})

        try {

            const response = await axiosInstance.post('auth/login', data)
          
            set({authUser: response.data})
            toast.success('You Logged with success!')
            
            get().ConnectSocket()
            
        } catch (error) {
            console.error("ERROR Logging", error.message)
            set({authUser: null})
            toast.error("Something went wrong")
        } finally {
            set({isLoggingIn: false})
        }
    },

    UpdateProfile: async (pic) => {

        set({isUpdatingProfile: true})

        try {

            const respone = await axiosInstance.patch('/users/update-profile', pic)
            set({authUser: respone.data})
            toast.success('Updated with success')
            
        } catch (error) {
            console.error("ERROR update Profile:", error.e.response.data)
            toast.error('Something went wrong!!')
        } finally {
            set({isUpdatingProfile: false})
        }
    },

    ConnectSocket: () => {
        const {authUser} = get()

        
        if(!authUser || get().socket?.connected) return;

        const socket = io("http://localhost:4000", {
            query: {
                userId: authUser._id,
            },
        })
        // socket.connect()

        set({socket: socket})

        socket.on("getOnlineUsers", (usersId) => {
            set({onlineUsers:usersId})
        })
    },

    DisconnectSocket: () => {

        if(get().socket?.connected) get().socket.disconnect()

    }

}))


export default useAuthStore