// const DeleteButton = () => {
//     const handleDelete = async () => { //maybe put this in a server action file
//         const data = await fetch(`/api/delete`, { method: 'POST' });
//         console.log(data);
//         // router.replace('/');
//         // router.refresh(); // Trigger a soft page reload after logout; If you don't want to use context

//     };

//     return (
//         <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//             Delete
//         </button>
//     )
// }
// export default DeleteButton
'use client';

import { DeleteAction } from '@/lib/action';
import { useTransition } from 'react';
// import { useRouter } from 'next/navigation';

const DeleteButton = () => {
    const [isPending, startTransition] = useTransition();
    // const router = useRouter();

    const handleClick = () => {
        startTransition(() => {
            DeleteAction();
        });
        // router.replace('/');
        // router.refresh(); // Trigger a soft page reload after logout; If you don't want to use context
    };

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
            {isPending ? 'Deleting...' : 'Delete Account'}
        </button>
    );
};

export default DeleteButton;