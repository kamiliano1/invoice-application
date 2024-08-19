import BackButton from "@/components/ui/BackButton";

export default function PreviewNotFound() {
  return (
    <div className="max-w-[778px] mx-auto w-full">
      <BackButton className="pt-6 px-6" backLink="/" />
      <div className="p-6 sm:px-10">
        <h2 className="text-headingM sm:mr-4 dark:text-05">
          Invalid Invoice Id
        </h2>
      </div>
    </div>
  );
}
