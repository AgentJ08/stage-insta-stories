import Image from "next/image";
import Stories from "./components/stories";

export default function Home() {
  return (
    <div className=" flex-col gap-1">
      <Image src={'/logo.png'} alt="logo" width={120} height={5} className="p-2" />
      <Stories />
    </div>
  );
}
