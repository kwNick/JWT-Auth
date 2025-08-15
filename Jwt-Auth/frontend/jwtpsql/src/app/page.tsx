export default function Home() {
  return (
    <div className="p-10 flex flex-col items-center justify-center w-4/5 min-h-[120vh] font-[family-name:var(--font-geist-sans)] bg-primary rounded-tl-2xl rounded-br-2xl shadow-md">
      <main className="w-full min-h-full flex flex-col gap-y-14 items-center sm:items-start pb-5 ">

        <div className="h-full w-full flex flex-col items-center justify-center ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
            POS System
          </h1>
        </div>

        <div className="h-full w-full flex flex-col items-center sm:items-start justify-center">
          <p className="text-base sm:text-2xl md:text-3xl text-center ">
            This is a simple POS system built with Next.js, TypeScript, and PostgreSQL.
            It uses JWT for authentication and is designed to be easy to use and extend authentication system to any application.
          </p>
        </div>

        <div className="h-full w-full flex flex-col items-center gap-y-5  sm:items-start justify-center">
          <p className="text-base sm:text-2xl md:text-3xl text-center sm:text-left">
            You can log in with the following <em>User</em> credentials:
          </p>

          <p className="text-base sm:text-2xl md:text-3xl text-center sm:text-left">
            <strong>Email:</strong> <em>Alex</em>
            <br />
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

        <div className="h-full w-full flex flex-col items-center sm:items-start justify-center">
          <p className="text-base sm:text-2xl md:text-3xl text-center sm:text-left">
            You can also register a new user by clicking the &quot;Register&quot; button in the navigation bar.
          </p>
        </div>

        <div className="h-full w-full flex flex-col items-center sm:items-start justify-center">
          <p className="text-base sm:text-2xl md:text-3xl text-center sm:text-left">
            Each user has a unique JWT token that is used for authentication. Users can <strong>create</strong>, <strong>read</strong>, <strong>update</strong>, and <strong>delete</strong> their own data.<br /> Each user has the User role by default, and the Admin role can be assigned to a user by an administrator.
          </p>
        </div>

        <div className="h-full w-full flex flex-col gap-y-5 items-center sm:items-start justify-center">
          <p className="text-base sm:text-2xl md:text-3xl text-center sm:text-left">
            This project is open source and available on GitHub.
            <br />
            Feel free to contribute and make it better!
          </p>
        </div>

      </main>
    </div>
  );
}
