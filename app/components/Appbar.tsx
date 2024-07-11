import Profile from "./profile"
import Link from "next/link"
export default function Appbar(){
    return (
        <div className="bg-red-200 flex justify-between h-max">
            <div>
                <Link href="/send">
                Send Message
                </Link>
            </div>

            <div>
                <Link href="/notifications">
                Notifications
                </Link>
            </div>

            <div>
                <Link href="/room">
                Create or Join room
                </Link>
            </div>

            <div>
                <Profile/>  
            </div>
        </div>
    )
}