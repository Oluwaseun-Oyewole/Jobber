export default function Home() {
  console.log("process", process.env.NODE_ENV);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Jobber</h1>
    </main>
  );
}
