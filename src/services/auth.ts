import api from "./request"

export const authService = {
    login:async(params:AuthRequest)=>{
        try {
            const {request,...response} = await api.post(
                "/api/Auth/login", 
                {
                    username: params.username,
                    password: params.password
                }
            )
            return response;
        } catch (error) {
            console.log('error', error)
        }
    },
    logout:async()=>{

    }
}