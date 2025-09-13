'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const DeleteButton = () => {
    const { deleteProfile } = useAuth();
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setIsPending(true);
        deleteProfile();
        setIsPending(false);
        // router.replace('/');
        router.refresh(); // Trigger a soft page reload after logout; If you don't want to use context
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