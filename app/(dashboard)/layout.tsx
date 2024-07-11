import { Provider } from "@/provider";
import Appbar from "@/app/components/Appbar";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <Provider>
        <body className={inter.className}>
        <Appbar/>
          {children}</body>
        </Provider>
      </html>
    );
  }