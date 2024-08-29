import EmptyImage from "@/public/assets/illustration-empty.svg";
import Image from "next/image";
export default function EmptyInvoice() {
  return (
    <div className="mx-auto mt-20 max-w-[206px]">
      <div className="relative mb-10 h-[160px] w-[193px] lg:h-[200px] lg:w-[240px]">
        <Image src={EmptyImage} fill alt="empty image" />
      </div>
      <h2 className="mb-5 text-headingM font-bold text-08 dark:text-white">
        There is nothing here
      </h2>
      <p className="mx-auto w-[176px] text-center text-body text-06 lg:w-full dark:text-05">
        Create an invoice by clicking the New button and get started
      </p>
    </div>
  );
}
