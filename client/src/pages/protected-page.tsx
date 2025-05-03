export default function ProtectedPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <p>This page is only visible to logged-in users.</p>
    </div>
  );
}
