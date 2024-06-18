// 'use client';
// import { useSession } from 'next-auth/react';

// import Link from 'next/link';
// // import NavLinks from "@/app/ui/dashboard/nav-links";
// // import AcmeLogo from "@/app/ui/acme-logo";
// // import { ArrowRightIcon, PowerIcon } from "@heroicons/react/24/outline";
// import { signOut } from '@/auth';
// import useSetPath from '../hooks/useSetPath';
// import { useEffect, useRef, useState } from 'react';
// // import { UserCircleIcon } from "@heroicons/react/20/solid";
// import styles from '@/app/_assets/css/Cart.module.css';
// // import { Router, useRouter } from "next/navigation";
// import { usePathname, useSearchParams } from 'next/navigation';
// import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

// export default function LoginLink() {
//   // const { data: session, status } = useSession();
//   // console.log('LoginLink', session, status);
//   // const pathRef = useRef("/");
//   // const [link, setLink] = useState("");
//   // const path = useSetPath();
//   // console.log(path);

//   let pathname = usePathname();

//   return (
//     <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
//       {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}
//       <Link href={`/login?callbackUrl=${pathname}`}>
//         {/* <UserCircleIcon className={styles.user} /> */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke-width="1.5"
//           stroke="currentColor"
//           className={styles.user}
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//           />
//         </svg>
//       </Link>
//       <hr />
//     </div>
//   );
// }
