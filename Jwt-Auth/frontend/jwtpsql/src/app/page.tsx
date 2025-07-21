export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] font-[family-name:var(--font-geist-sans)] bg-white rounded-tl-2xl rounded-br-2xl shadow-md">

      <main className="min-h-full flex flex-col gap-[32px]  items-center sm:items-start p-8">

        <div className="h-full w-full flex flex-col gap-[8px] items-center justify-center ">
          <h1 className="text-3xl">POS System</h1>
        </div>

        <div className="h-full w-full flex flex-col gap-[8px] items-center sm:items-start justify-center">
          <p className="text-[16px] sm:text-[20px] text-center sm:text-left">
            This is a simple POS system built with Next.js, TypeScript, and PostgreSQL.
            It uses JWT for authentication and is designed to be easy to use and extend.
          </p>
        </div>

        <div className="h-full w-full flex flex-col gap-[8px] items-center sm:items-start justify-center">
          <p className="text-[16px] sm:text-[20px] text-center sm:text-left">
            You can log in with the following <em>User</em> credentials:
          </p>
          <p className="text-[16px] sm:text-[20px] text-center sm:text-left">
            <strong>Email:</strong> <em>Alex</em>
          </p>
          <p className="text-[16px] sm:text-[20px] text-center sm:text-left">
            <strong>Password:</strong> <em>hashedpassword1</em>
          </p>
        </div>

        {/* <div className="h-full w-full flex flex-col gap-[8px] items-center sm:items-start justify-center">
          <p className="text-[16px] sm:text-[20px] text-center sm:text-left">
            You can log in with the following <em>Admin</em> credentials:
          </p>
          <p className="text-[16px] sm:text-[20px] text-center sm:text-left">
            <strong>Email:</strong> <em>nick</em>
          </p>
          <p className="text-[16px] sm:text-[20px] text-center sm:text-left">
            <strong>Password:</strong> <em>hashedpassword2</em>
          </p>
        </div> */}

        <div className="h-full w-full flex flex-col gap-[8px] items-center sm:items-start justify-center">
          <p className="text-[16px] sm:text-[20px] text-center sm:text-left">
            You can also register a new user by clicking the &quot;Register&quot; button in the navigation bar.
          </p>
        </div>

      </main>
    </div>
  );
}
