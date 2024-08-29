export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="rounded-md bg-10 p-2 text-center font-bold text-12">
      <p>{message}</p>
    </div>
  );
}
