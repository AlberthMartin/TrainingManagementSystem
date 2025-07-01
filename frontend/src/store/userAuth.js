import axios from "axios"
import { create } from "zustand"
import { axiosInstance } from "@/lib/axios"
import { toaster } from "@/components/ui/toaster"

export const useAuthStore = create((set) => ({
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check");

            set({authUser: res.data})
        }catch(error){
            console.log("Error in checkAuth:", error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth: false})
        }
    },
    //Tested with frontend and it works 1.7.2025
    signup: async (data) =>{
        set({isSigningUp: true});
        try{
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data});
        }catch(error){
            console.log("Eror in signup", error)
        }finally{
            set({isSigningUp: false})
        }   
    },

    login: async (data) => {
        set({ isLoggingIn: true})
        try{
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data})
            //Info to user
            toaster.create({
                description: "Logged in successfully",
                type: "success",
                closable: true,
              })
        }catch(error){
            console.log("Eror in login", error)
            toaster.create({
                description: error.response.data.message,
                type: "error",
                closable: true,
              })
        }finally{
            set({ isLoggingIn: false})
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null});
            toaster.create({
                description: "Logged out successfully",
                type: "success",
                closable: true,
              })
        }catch(error){
            console.log("Eror in logout", error)
            toaster.create({
                description: error.response.data.message,
                type: "error",
                closable: true,
              })
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile:true});
        try{
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({authUser: res.data})
        }catch(error){
            console.log("error in update profile:", error);
        } finally {
            set({ isUpdatingProfile: false });
          }
    }
}))