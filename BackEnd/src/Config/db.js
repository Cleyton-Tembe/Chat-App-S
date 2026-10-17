import moongose from 'mongoose'



export const ConnectDB =  async () => {

    try {
        const connect = await moongose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (error) {
        console.error("ERROR:", error.message)
        process.exit(1)
    }
}