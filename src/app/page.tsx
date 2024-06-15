import Image from "next/image";
import Stories from "./components/stories";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" hidden md:flex md:flex-col md:justify-center md:items-center md:h-screen "><p className=" text-lg font-semibold text-center ">Please open the application on your mobile device or open developer tools on your desktop browser and select the mobile dimensions to view the application. <br />Thank you.</p></div>
      <div className=" flex-col gap-1 md:hidden ">
        <Link href={'/'}><Image src={'/logo.png'} alt="logo" width={120} height={5} className="p-2" /></Link>
        <Stories />
      </div>
    </>
  );
}
