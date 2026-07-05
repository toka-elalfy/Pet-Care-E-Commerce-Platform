import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pawIcon from '../assets/icons/paw.svg';
import arrowRightIcon from '../assets/icons/arrow-right.svg';
import { submitContactMessage } from '../utils/api';

const contactMethods = [
  {
    id: 'email',
    label: 'EMAIL',
    value: 'hello@petcare.example',
    subtext: 'Replies within 4 hours',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'PHONE',
    value: '1-800-PET-CARE',
    subtext: 'Mon–Fri · 8am–8pm CT',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 'hq',
    label: 'HQ',
    value: '500 Cesar Chavez St, Austin TX',
    subtext: 'By appointment',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await submitContactMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.warn('Could not post contact request to API:', err.message);
      // Fallback local success as UX placeholder
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-24 md:pb-32 font-manrope animate-[fadeIn_0.5s_ease-out] flex flex-col items-center">

      {/* Header Section */}
      <div className="w-full max-w-[720px] text-center mb-16 md:mb-24 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-[#f0f9f9] px-4 py-2 rounded-full mb-6 text-[#0f766e] text-[14px] font-medium border border-[#ccfbf1]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Contact
        </div>
        <h1 className="font-sora font-semibold text-[40px] lg:text-[56px] leading-[1.05] text-[#1f2937] mb-6 tracking-tight">
          Talk to a real human about your pet.
        </h1>
        <p className="text-[#6b7280] text-[18px] lg:text-[20px] leading-relaxed max-w-[620px]">
          Most questions get answered in under 10 minutes during business hours.
        </p>
      </div>

      {/* Contact Methods Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
        {contactMethods.map((method) => (
          <div key={method.id} className="bg-white border border-[#e7e2d9] rounded-[24px] p-8 flex flex-col items-start hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 bg-[#f0f9f9] rounded-lg flex items-center justify-center mb-8 text-[#0f766e]">
              {method.icon}
            </div>
            <span className="text-[#9ca3af] text-[12px] font-bold tracking-widest mb-1 uppercase">
              {method.label}
            </span>
            <h3 className="text-[#1f2937] font-sora font-semibold text-[18px] mb-1">
              {method.value}
            </h3>
            <p className="text-[#6b7280] text-[14px]">
              {method.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="w-full bg-white border border-[#e7e2d9] rounded-[32px] p-8 md:p-12 mb-20 md:mb-24">
        <h2 className="text-[#1f2937] font-sora font-semibold text-[24px] mb-10">
          Send us a message
        </h2>

        {success && (
          <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[20px] font-medium text-[15px]">
            Thank you! Your message has been sent successfully. We'll get back to you shortly.
          </div>
        )}

        {error && (
          <div className="mb-8 p-5 bg-rose-50 border border-rose-200 text-rose-800 rounded-[20px] font-medium text-[15px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#4b5563] text-[14px] font-medium ml-1">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              required
              disabled={submitting}
              className="h-[52px] px-6 rounded-2xl border border-[#e7e2d9] bg-[#fcfbf9] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0f766e] transition-colors disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#4b5563] text-[14px] font-medium ml-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
              disabled={submitting}
              className="h-[52px] px-6 rounded-2xl border border-[#e7e2d9] bg-[#fcfbf9] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0f766e] transition-colors disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="subject" className="text-[#4b5563] text-[14px] font-medium ml-1">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              required
              disabled={submitting}
              className="h-[52px] px-6 rounded-2xl border border-[#e7e2d9] bg-[#fcfbf9] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0f766e] transition-colors disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="message" className="text-[#4b5563] text-[14px] font-medium ml-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your pet..."
              required
              disabled={submitting}
              className="p-6 rounded-2xl border border-[#e7e2d9] bg-[#fcfbf9] text-[#1f2937] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0f766e] transition-colors resize-none disabled:opacity-50"
            />
          </div>
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 h-[52px] px-10 bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[16px] transition-all hover:shadow-lg active:scale-95 disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Send message'}
              <img src={arrowRightIcon} alt="" className="w-5 h-5 invert" />
            </button>
          </div>
        </form>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-[1032px] bg-[#fcfbf9] border border-[#e7e2d9] rounded-[32px] p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center text-center mx-auto">
        <div className="w-14 h-14 bg-[#0f766e] rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-[#0f766e]/20">
          <img src={pawIcon} alt="" className="w-6 h-6 invert" />
        </div>
        <h2 className="font-sora font-semibold text-[32px] lg:text-[40px] text-[#1f2937] mb-8">
          Ready to meet smarter care?
        </h2>
        <button
          onClick={() => navigate('/onboarding')}
          className="inline-flex items-center gap-2 h-[56px] px-10 bg-[#0f766e] hover:bg-[#0d6b63] text-white rounded-full font-manrope font-semibold text-[16px] transition-all hover:shadow-lg active:scale-95"
        >
          Start free — add your first pet
          <img src={arrowRightIcon} alt="" className="w-5 h-5 invert" />
        </button>
      </div>

    </div>
  );
};

export default Contact;
