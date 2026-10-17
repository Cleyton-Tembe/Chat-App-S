import { useEffect, useRef } from "react"
import useChatStore from "../Store/useChatStore"
import MessageSkeleton from "./Skeletons/MessageSkeleton"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import useAuthStore from "../Store/auth-store"
import { FormatMessageTime } from "../Utils/FormatTime"


const ChatContainer = () => {


    const bottomMessage = useRef(null)
    const {messages, getMessages, isMessage, selectedUser, ListenMessage, StopListenMessage} = useChatStore()
    const { authUser } = useAuthStore()
    console.log(authUser)

    console.log("authUser.profilePic:", authUser.profilePic);
console.log("selectedUser.profilePic:", selectedUser);

    useEffect(()=> {
        getMessages(selectedUser._id)
        ListenMessage()

        return () => StopListenMessage()
    }, [selectedUser._id, getMessages, ListenMessage, StopListenMessage])

    useEffect(()=>{
      if(bottomMessage.current && messages) {
        bottomMessage.current.scrollIntoView({behavior: "smooth"})
      }
    }, [messages])

    if(isMessage) return <MessageSkeleton />
    
  return (
    <div className="flex-1 flex flex-col overflow-auto relative">
      <ChatHeader />
      <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={bottomMessage}
            >

              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img 
                    src={message.senderId === authUser._id  ? authUser.profilePic.trim() || "/avatar.png" : selectedUser.profilePic.trim() || "/avatar.png"} 
                    alt="user-image" 
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {FormatMessageTime(message.createdAt)}
                </time>
              </div>

              <div className="chat-bubble flex flex-col gap-0.5">
                {message.image && (
                  <img 
                    src={message.image} 
                    alt="image"
                    className="sm:max-w-[200px] rounded-md mb-2 min-w-96" 
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          )
        })}
      </div>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer
