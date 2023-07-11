import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApislice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Users'],
        }),
        register:builder.mutation({
            query:(data)=>({
                url:USERS_URL,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Users'],
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST'
            })
        }),
        profile:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                body:data
            })
        }),
        getusers:builder.query({
            query:()=>({
                url:USERS_URL,
                
            }),
            invalidatesTags:['Users'],
            keepUnusedDataFor:5
        }),
        deleteusers:builder.mutation({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
                method:'DELETE'
            })
        }),
        getuserdetails:builder.query({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
                
            }),
        
            keepUnusedDataFor:5
        }),
        updateuser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/${data.userId}`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Users'],
        })
        
        
    })
})

export const {useLoginMutation,useRegisterMutation,
    useLogoutMutation,useProfileMutation,useGetusersQuery,
    useDeleteusersMutation,useGetuserdetailsQuery,useUpdateuserMutation}=userApislice;