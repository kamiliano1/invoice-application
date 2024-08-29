export default function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="rounded-md bg-05 p-2 text-center font-bold text-08 dark:bg-04 dark:text-11">
      <p>{message}</p>
    </div>
  );
}
