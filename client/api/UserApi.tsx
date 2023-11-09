import { ErrorInfo } from "react";
import ApiManager from "./ApiManager"
import axios from "axios";

export const user_login = async (data: any) => {
    try{
        const result = await ApiManager("/users/login" ,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            data:data,
        });        
        return result
    }   
    catch (error:any){
        return error.message
    }
}
    