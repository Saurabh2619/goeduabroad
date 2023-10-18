import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GKQuiz = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /quiz/gk-quiz immediately (without page load)
    router.push('/quiz/gk-quiz');
  }, [router]);

  return null; // You don't need to render anything in this case
};

export default GKQuiz;
