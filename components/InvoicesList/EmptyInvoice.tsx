import EmptyImage from "@/public/assets/illustration-empty.svg";
import Image from "next/image";
export default function EmptyInvoice() {
  return (
    <div className="mx-auto max-w-[206px] mt-20">
      <div className="relative w-[193px] h-[160px] lg:w-[240px] lg:h-[200px] mb-10">
        <Image src={EmptyImage} fill alt="empty image" />
      </div>
      <h2 className="mb-5 text-headingM font-bold text-08 dark:text-white">
        There is nothing here
      </h2>
      <p className="text-body text-center text-06 dark:text-05">
        Create an invoice by clicking the New button and get started
      </p>
    </div>
  );
}
