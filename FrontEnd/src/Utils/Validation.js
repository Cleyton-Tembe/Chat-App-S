import { axiosInstance } from "./axios";

const ValidateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

const SeeAuthUser =  async () => {
    try {
        const response = await axiosInstance.get('/auth/check')
        return response
    } catch (error) {
        console.log("ERROR CHECK AUTh", error.e.response.data)
    }
    
}

export { ValidateEmail, SeeAuthUser }