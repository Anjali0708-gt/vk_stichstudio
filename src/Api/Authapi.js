import API from "./axios";

export const login=(data)=>API.post(`/auth/login`,data)


export const getProfile=()=>API.get(`/user/profile`)

export const register=(data)=>API.post(`/auth/sigin`,data)
