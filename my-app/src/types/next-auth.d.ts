import "next-auth";

declare  module 'next-auth' {
    interface User{
        _id?:string;
        isVerified?:boolean;
        username?: string;
        email?: string;
        name?: string;
        image?: string;
    }
    interface Session{
        user:{
            _id?:string;
            isVerified?:boolean;
            username?: string;
            email?: string;
            name?: string; 
            image?: string;
        }& DefaultSession['user']
    }
}
declare  module 'next-auth/jwt' {
    interface jwt{
        _id?:string;
        isVerified?:boolean;
        username?: string;
        email?: string;
        name?: string;
        image?: string;
    }
}