'use client';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterForm = () => {

      const { register } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formMessage, setFormMessage] = useState("Must update fields to Register!");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate form fields
  useEffect(() => {
    if (username === "" || password === "" || email === "") {
        setIsUpdated(false);
    } else {
        setIsUpdated(true);
    }
  }, [username, email, password]);

  // Update form message
  useEffect(() => {
    if (isPending) setFormMessage("...Pending Registration");
    else if (isUpdated) setFormMessage("");
    else setFormMessage("Must update fields to register!");
  }, [isPending, isUpdated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUpdated) return;

    setIsPending(true);
    setError(null);

    const success = await register(username, email, password);
    // console.log("success: " + success);

    setIsPending(false);

    if (!success) {
      setError("Invalid username, email or password");
    }else{
      router.refresh();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-12 w-3/5">
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={!isUpdated || isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Register
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <p className={`relative opacity-0 text-xs text-center text-accent duration-500 ${(isPending || !isUpdated) && "opacity-100"}`}>
        {formMessage}
      </p>
    </form>
  )
}
export default RegisterForm