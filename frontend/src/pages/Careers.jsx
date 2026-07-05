import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchJobs, submitJobApplication } from '../utils/api';

const defaultJobs = [
  { _id: '1', title: 'Senior Product Designer', department: 'Design', location: 'Remote', type: 'Full-time' },
  { _id: '2', title: 'Backend Engineer (Node.js)', department: 'Engineering', location: 'Austin, TX', type: 'Full-time' },
  { _id: '3', title: 'Veterinary Content Lead', department: 'Content', location: 'Remote', type: 'Full-time' },
  { _id: '4', title: 'Customer Experience Specialist', department: 'Support', location: 'Remote', type: 'Part-time' },
  { _id: '5', title: 'Growth Marketing Manager', department: 'Marketing', location: 'Austin, TX', type: 'Full-time' },
];

const Careers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    coverLetter: '',
  });
  const [submittingApp, setSubmittingApp] = useState(false);
  const [appSuccess, setAppSuccess] = useState(false);
  const [appError, setAppError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        if (data && data.jobs) {
          setJobs(data.jobs);
        } else {
          setJobs(defaultJobs);
        }
      } catch (err) {
        console.warn('Could not fetch jobs from API, using default listings:', err.message);
        setJobs(defaultJobs);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    setSubmittingApp(true);
    setAppError(null);
    setAppSuccess(false);

    try {
      await submitJobApplication({
        jobId: selectedJob._id,
        name: applicationData.name,
        email: applicationData.email,
        coverLetter: applicationData.coverLetter
      });
      setAppSuccess(true);
      setApplicationData({ name: '', email: '', coverLetter: '' });
    } catch (err) {
      console.error('Backend application request failed:', err.message);
      setAppError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmittingApp(false);
    }
  };

  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-24 md:pb-32 font-manrope animate-[fadeIn_0.5s_ease-out] flex flex-col items-center justify-center">

      {/* Header Section */}
      <div className="w-full max-w-[720px] mx-auto text-center flex flex-col items-center mb-16 md:mb-24">
        <div className="inline-flex items-center gap-2 bg-[#f3f4f6] px-4 py-2 rounded-full mb-6 text-[#4b5563] text-[14px] font-medium">
          <svg className="w-4 h-4 text-[#0f766e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Careers
        </div>
        <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.1] text-[#1f2937] mb-6">
          Build the calmest pet-care experience on the internet
        </h1>
        <p className="text-[#6b7280] text-[18px] lg:text-[20px] leading-relaxed">
          We're a small, cross-functional team who move quickly to make pet care simple. Join us.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-24">
        <div className="bg-[#fcfbf9] border border-[#e7e2d9] rounded-[24px] p-8 flex flex-col justify-center items-center text-center">
          <h2 className="font-sora font-semibold text-[24px] text-[#1f2937] mb-4">Remote-friendly</h2>
          <p className="text-[#4b5563] text-[16px] leading-relaxed">Work from anywhere in the US. Quarterly team weeks to connect in person.</p>
        </div>
        <div className="bg-[#fcfbf9] border border-[#e7e2d9] rounded-[24px] p-8 flex flex-col justify-center text-center">
          <h2 className="font-sora font-semibold text-[24px] text-[#1f2937] mb-4">Real ownership</h2>
          <p className="text-[#4b5563] text-[16px] leading-relaxed">Ship end-to-end. No layers of approval — just good ideas and execution.</p>
        </div>
        <div className="bg-[#fcfbf9] border border-[#e7e2d9] rounded-[24px] p-8 flex flex-col justify-center text-center">
          <h2 className="font-sora font-semibold text-[24px] text-[#1f2937] mb-4">Pet perks</h2>
          <p className="text-[#4b5563] text-[16px] leading-relaxed">Monthly Zootopia credit and paid time off for new pet additions.</p>
        </div>
      </div>

      {/* Open Roles Section */}
      <div className="w-full max-w-[1032px] mb-16 md:mb-24 text-center md:text-left">
        <h2 className="font-sora font-semibold text-[28px] md:text-[32px] text-[#1f2937] mb-8 text-center md:text-left">Open roles</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f766e]"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {jobs.map((role) => (
              <div
                key={role._id}
                onClick={() => setSelectedJob(role)}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-[#e7e2d9] rounded-[20px] hover:border-[#0f766e] transition-colors group cursor-pointer"
              >
                <div className="mb-4 md:mb-0">
                  <h3 className="font-sora font-semibold text-[20px] text-[#1f2937] mb-1">{role.title}</h3>
                  <p className="text-[#6b7280] text-[15px]">{role.department} · {role.location} · {role.type}</p>
                </div>
                <button className="inline-flex items-center justify-center gap-2 h-[48px] px-6 bg-[#f3f4f6] group-hover:bg-[#0f766e] group-hover:text-white text-[#4b5563] rounded-full font-manrope font-semibold text-[15px] transition-all">
                  Apply
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-[1032px] bg-[#fcfbf9] border border-[#e7e2d9] rounded-[32px] p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center mx-auto">
        <div className="w-14 h-14 bg-[#ecfdf5] rounded-full flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="font-sora font-semibold text-[32px] lg:text-[40px] text-[#1f2937] mb-8">
          Ready to meet smarter care?
        </h2>
        <button
          onClick={() => navigate('/onboarding')}
          className="inline-flex items-center gap-2 h-[56px] px-8 bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[16px] transition-all hover:shadow-lg active:scale-95"
        >
          Start free — add your first pet
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Job Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white border border-[#e7e2d9] rounded-[32px] w-full max-w-[540px] p-8 md:p-10 shadow-2xl relative animate-[scaleUp_0.3s_ease-out]">
            <button
              onClick={() => {
                setSelectedJob(null);
                setAppSuccess(false);
                setAppError(null);
                setApplicationData({ name: '', email: '', coverLetter: '' });
              }}
              className="absolute right-6 top-6 text-[#9ca3af] hover:text-[#1f2937] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {appSuccess ? (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-250 rounded-full flex items-center justify-center mb-6 text-emerald-600">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-sora font-semibold text-[24px] text-[#1f2937] mb-2">Application Sent!</h3>
                <p className="text-[#6b7280] text-[15px] leading-relaxed max-w-[360px]">
                  Thank you for applying for the <strong>{selectedJob.title}</strong> role. We'll review your application and get back to you soon.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[#0f766e] text-[12px] font-bold tracking-widest uppercase mb-1 block">
                  APPLY FOR ROLE
                </span>
                <h3 className="font-sora font-semibold text-[24px] text-[#1f2937] mb-6">
                  {selectedJob.title}
                </h3>

                {appError && (
                  <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-[20px] font-medium text-[14px]">
                    {appError}
                  </div>
                )}

                <form onSubmit={handleAppSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#4b5563] text-[14px] font-medium ml-1">Full name</label>
                    <input
                      type="text"
                      required
                      value={applicationData.name}
                      onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                      placeholder="Your name"
                      className="h-[52px] px-5 rounded-2xl border border-[#e7e2d9] bg-[#fcfbf9] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0f766e] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#4b5563] text-[14px] font-medium ml-1">Email address</label>
                    <input
                      type="email"
                      required
                      value={applicationData.email}
                      onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="h-[52px] px-5 rounded-2xl border border-[#e7e2d9] bg-[#fcfbf9] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0f766e] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#4b5563] text-[14px] font-medium ml-1">Cover letter</label>
                    <textarea
                      required
                      rows={4}
                      value={applicationData.coverLetter}
                      onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                      placeholder="Why do you want to join Zootopia?"
                      className="p-5 rounded-2xl border border-[#e7e2d9] bg-[#fcfbf9] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0f766e] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingApp}
                    className="inline-flex items-center justify-center gap-2 h-[52px] bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[16px] transition-all hover:shadow-lg active:scale-95 disabled:opacity-50 mt-2"
                  >
                    {submittingApp ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Careers;
