'use client'
import { SignIn, useClerk} from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { user } = useClerk();  // Fetch the user from Clerk
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(true); // State to handle redirection

  useEffect(() => {
    // Redirect users to the home page if they are already signed in
    if (user) {
      router.push('/home');
    } else {
      setIsRedirecting(false); // Stop redirection after initial check
    }
  }, [user, router]);

  // If still checking, show a loading state
  if (isRedirecting) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md',
              formButtonSecondary: 'bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md',
            },
            variables: {
              fontFamily: 'sans-serif',
              borderRadius: '8px',
            },
          }}
          afterSignInUrl="/home" // Redirect after sign-in
        />
      </div>
    </div>
  );
}
