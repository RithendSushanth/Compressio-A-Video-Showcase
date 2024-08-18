// import { SignUp } from '@clerk/nextjs';

// export default function Page() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6">
//       <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
//         <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
//         <SignUp
//           appearance={{
//             elements: {
//               formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md',
//               formButtonSecondary: 'bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md',
//               formFieldInput: 'bg-gray-800 border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500',
//               formFieldLabel: 'text-gray-300 mb-2 block',
//               formFooter: 'text-center text-gray-400 mt-4',
//             },
//             variables: {
//               fontFamily: 'sans-serif',
//               borderRadius: '8px',
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }

 
'use client';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md',
              formButtonSecondary: 'bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md',
              formFieldInput: 'bg-white border border-gray-300 text-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200',
              formFieldLabel: 'text-black-300 mb-2 block text-sm',
              formFooter: 'text-center text-gray-400 mt-4',
              formTitle: 'text-2xl font-bold text-white mb-4',
              formSocialButton: 'bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center justify-center space-x-2',
            },
            variables: {
              fontFamily: 'sans-serif',
              borderRadius: '8px',
            },
          }}
        />
      </div>
    </div>
  );
}