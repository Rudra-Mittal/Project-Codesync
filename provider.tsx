"use client"
import {SessionProvider} from 'next-auth/react';
import {RecoilRoot} from 'recoil';
export const Provider=({children}:any)=> {
  return (
    <RecoilRoot>
    <SessionProvider>
      {children}
    </SessionProvider>
    </RecoilRoot>
  );
}