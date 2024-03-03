import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { PropsWithChildren } from "react";

const Dashboard = () => {
    

    const {user} = useUser()
    const clerk = useClerk()
    const {isSignedIn} = useAuth()
    
    console.log(user);
    
   
    if(!isSignedIn){
        return clerk.openSignIn({redirectUrl:"/dashboard"})
    }
    return (
        <div>
            Welcome to Dashboard {user?.fullName}
            <button onClick={()=>clerk.openUserProfile()}>Profile</button>
        </div>
    );
};

export default Dashboard;
