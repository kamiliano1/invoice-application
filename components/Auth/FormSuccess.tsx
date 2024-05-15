export default function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="p-2 rounded-md text-center font-bold text-08 dark:text-11  bg-05 dark:bg-04">
      <p>{message}</p>
    </div>
  );
}
