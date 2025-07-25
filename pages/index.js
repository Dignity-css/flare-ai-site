// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectToWelcome() {
  const router = useRouter();

  useEffect(() => {
    router.push('/welcome');
  }, [router]);

  return null;
}
