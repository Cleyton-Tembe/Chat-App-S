import { create } from "zustand";
import { axiosInstance } from "../Utils/axios";
import toast from "react-hot-toast";
import useAuthStore from "./auth-store";




const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessage: false,

    getUsers: async () => {

        set({isUserLoading: true})
        try {

            const response = await axiosInstance.get('/messages/users');
            set({users: response.data})
            
        } catch (error) {
            console.error("ERROR getUsers", error.e.response.data)
            toast.error('Something went wrong while fecthing users')
        } finally {
            set({isUserLoading: false})
        }
        
    }, 
    
    getMessages: async (id) => {

        set({isMessage: true})

        try {

            const respone = await axiosInstance.get(`/messages/${id}`)
            set({messages: respone.data})
            
        } catch (error) {
            console.error("ERROR getMessages", error.message)
            toast.error("Something went wrong while fecthing messages")
        } finally {
            set({isMessage: false})
        }
    },

    SendMessage: async (data) => {

        const {selectedUser, messages} = get()


        try {
            const respone = await axiosInstance.post(`/messages/send/${selectedUser._id}`, data)
            set({messages: [...messages, respone.data]})
        } catch (error) {

            console.error("ERROR sending msg:", error.message)
            toast.error("Something went wrong while sending MSG")
        }
    },

    ListenMessage: () => {
        const {selectedUser} = get()

        if(!selectedUser) return;   

        const socket = useAuthStore.getState().socket


        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return;
            set({messages: [...get().messages, newMessage],})
        })
    },

    StopListenMessage: () => {
        const socket = useAuthStore.getState().socket

        socket.off("newMessage")
    },

    setSelectedUser: (user) => set({selectedUser: user})
}));

export default useChatStore;