import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import DefaultLayout from '../../layouts/DefaultLayout';

interface Mentor {
  image: string;
  title: string;
  role: string;
  description: string;
  collegeimage: string;
}

const MentorDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !slug) return;

    const fetchMentor = async () => {
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching mentor:', error);
      } else {
        setMentor(data);
      }
      setLoading(false);
    };

    fetchMentor();
  }, [router.isReady, slug]);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-pulse text-gray-400 text-xl">Loading Mentor Details...</div>
        </div>
      </DefaultLayout>
    );
  }

  if (!mentor) {
    return (
      <DefaultLayout>
        <div className="text-center text-red-500 mt-10">Mentor not found.</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="flex justify-center py-28 px-4 bg-gray-50">
        <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden text-center p-6">

          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <img
              src={mentor.image}
              alt={mentor.title}
              className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* University Logos */}
          <div className="flex justify-center items-center gap-6 mb-4">
            <img
              src={mentor.collegeimage}
              alt="University Logo"
              className="h-12 object-contain"
            />
          </div>

          {/* Mentor Name */}
          <h2 className="text-3xl font-bold text-[#a51c30]">{mentor.title}</h2>

          {/* Role */}
          {mentor.role && (
            <p className="text-lg text-gray-600 mt-2">{mentor.role}</p>
          )}

          {/* Description Section */}
          {mentor.description && (
            <div className="mt-10 text-left">
              <h3 className="text-2xl font-semibold text-[#a51c30] mb-4">About</h3>
              <div
                className="prose prose-lg max-w-none text-gray-800 bg-gray-100 p-6 rounded-xl shadow-sm"
                dangerouslySetInnerHTML={{ __html: mentor.description }}
              />
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MentorDetail;
