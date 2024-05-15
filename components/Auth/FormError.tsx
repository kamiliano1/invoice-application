export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="p-2 rounded-md text-center font-bold bg-10 text-12 ">
      <p>{message}</p>
    </div>
  );
}
