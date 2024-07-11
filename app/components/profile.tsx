"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { useState } from "react";
export default function Profile() {
  const session=useSession();
  const user=session.data?.user;
  const router=useRouter();
  const [isOpen,setIsOpen]=useState(false);
  const handleSignout= ()=>{
        signOut()
  }
  return (
    <div>
<nav className="inline bg-white border-gray-200 dark:bg-gray-900">
<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div className="absoute z-40 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" onClick={() => setIsOpen(!isOpen)}>
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg" alt="user photo"/>
        </button>
      {isOpen&&(
        <div className="z-40 w-max my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700  absolute  top-10 right-10 " id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-white-900  ">{user?.name}</span>
          <span className="block text-sm  text-gray-500 truncate ">{user?.email}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <Link href={"/profile"}>
            <div  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Home</div>
            </Link>
          </li>
          <Link href={"/profile/posts"}>
          <li>
            <div  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Posts</div>
          </li>
          </Link>
          <Link href="/blog/editor">
          <li>
            <div  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Create post</div>
          </li>
          </Link>
          <li>
            <div  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={()=>{
              (user)?handleSignout():router.push(`/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`)
            }}>{(user)?"Sign out":"Sign in"}</div>
          </li>
        </ul>
      </div>
      )}
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
  </div>
  </div>
</nav>

    </div>
  )
}
