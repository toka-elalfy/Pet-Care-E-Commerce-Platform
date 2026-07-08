import Job from "../models/job.mjs";
import FAQ from "../models/faq.mjs";
import PressRelease from "../models/pressRelease.mjs";
import InfoPage from "../models/infoPage.mjs";

const seedJobs = [
    {
        title: "Senior Product Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        description: "Envision and implement the future of pet product recommendation and custom delivery scheduling workflows.",
        requirements: ["5+ years experience in product design", "Portfolio demonstrating complex user experience designs", "Familiarity with Figma and design systems"]
    },
    {
        title: "Backend Engineer (Node.js)",
        department: "Engineering",
        location: "Austin, TX",
        type: "Full-time",
        description: "Scale our express APIs, design robust MongoDB schemas, and integrate payment services.",
        requirements: ["3+ years Node.js backend experience", "Strong MongoDB and mongoose query optimization skills", "Experience with ES modules in Node.js"]
    },
    {
        title: "Veterinary Content Lead",
        department: "Content",
        location: "Remote",
        type: "Full-time",
        description: "Own the medical accuracy and tone of our personalized pet nutrition recommendations and guidebooks.",
        requirements: ["Licensed DVM or equivalent experience", "Strong background in writing or editing medical/educational content", "Passion for simplifying pet care concepts"]
    },
    {
        title: "Customer Experience Specialist",
        department: "Support",
        location: "Remote",
        type: "Part-time",
        description: "Support our growing customer base via web chat and emails, ensuring pet owners feel supported at every step.",
        requirements: ["1+ years customer support experience", "Outstanding written communication skills", "A deep, innate love for pets and animals"]
    },
    {
        title: "Growth Marketing Manager",
        department: "Marketing",
        location: "Austin, TX",
        type: "Full-time",
        description: "Drive adoption of Zootopia auto-ship subscriptions through structured paid search, display, and email campaigns.",
        requirements: ["4+ years digital marketing experience", "Proven track record with paid social/search ad channels", "Highly data-driven mindset"]
    }
];

const seedFAQs = [
    {
        category: "General",
        question: "What is Zootopia?",
        answer: "Zootopia is a modern pet care e-commerce platform that offers personalized food recommendations, vet-approved toys, health items, and convenient auto-ship subscription options for your furry companions."
    },
    {
        category: "General",
        question: "How does the subscription plan work?",
        answer: "Our auto-ship subscriptions let you select products to be delivered on a custom cadence (e.g. every 2 weeks, monthly). You can pause, skip, or cancel delivery anytime via your personal dashboard."
    },
    {
        category: "Shipping & Returns",
        question: "Do you ship internationally?",
        answer: "Currently, Zootopia ships only within the United States. We hope to expand to international shipping in the near future."
    },
    {
        category: "Shipping & Returns",
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy on unused toys and accessories. For pet food and health items, contact our satisfaction team for support if your pet dislikes the selection."
    },
    {
        category: "Accounts",
        question: "How do I add a new pet profile?",
        answer: "Once logged into your dashboard, navigate to the 'My Pets' tab and click 'Add pet'. Fill out your pet's age, species, weight, and food preferences to receive curated tips."
    }
];

const seedPressReleases = [
    {
        title: "Zootopia Secures $15M Series A to Expand Personalized Nutrition Platform",
        date: "May 10, 2026",
        summary: "Leading venture capital groups back Zootopia to deliver custom, vet-approved pet meal planning packages.",
        content: "Zootopia today announced a $15 million Series A round to accelerate engineering, grow its veterinary nutrition team, and build new distribution facilities. The funding will secure faster shipping and advance recommendation intelligence.",
        source: "Tech News Daily",
        link: "#"
    },
    {
        title: "Why Auto-Ship Subscription is Reshaping Pet E-commerce",
        date: "April 24, 2026",
        summary: "Zootopia CEO outlines how smart reordering saves time and guarantees fresh nutrition for pets.",
        content: "In an editorial feature, Zootopia's leadership discusses how custom delivery scheduling prevents pet nutrition stress and maximizes home ease. Dynamic adjustments allow families to adapt to changing pet sizes and habits on the fly.",
        source: "Pet Retail Digest",
        link: "#"
    }
];

const seedInfoPages = [
    {
        slug: "about",
        title: "About Us",
        sections: [
            {
                title: "Our Mission",
                content: "At Zootopia, our goal is simple: to make pet care easy, personalized, and stress-free. By bringing high-quality products, nutritional insights, and convenient delivery to pet parents, we allow you to focus on what matters most—spending quality time with your pets."
            },
            {
                title: "Vet-Approved Quality",
                content: "Every food brand, accessory, and health product we offer undergoes testing and validation by our internal veterinary content team. We believe your pets deserve nothing but the safest, healthiest products on the market."
            }
        ]
    },
    {
        slug: "sustainability",
        title: "Sustainability at Zootopia",
        sections: [
            {
                title: "Carbon-Neutral Shipping",
                content: "All Zootopia deliveries are shipped carbon-neutral. We partner with vetted offsets to ensure that carbon emissions from courier routes are offset and neutralized."
            },
            {
                title: "Recyclable Packaging",
                content: "Our custom boxes are composed of 100% recycled materials and soy-based inks. We minimize empty box space to limit waste and shipping bulk."
            }
        ]
    },
    {
        slug: "shipping",
        title: "Shipping & Delivery Policy",
        sections: [
            {
                title: "Shipping Cadence",
                content: "Orders are processed within 1-2 business days. Subscriptions dispatch automatically on your set schedules. Standard delivery takes 3-5 business days."
            },
            {
                title: "Shipping Costs",
                content: "Standard shipping is $5.99 on orders under $49, and free for all orders over $49 or orders associated with an active auto-ship subscription."
            }
        ]
    },
    {
        slug: "returns",
        title: "Returns & Exchanges",
        sections: [
            {
                title: "30-Day Returns",
                content: "Unused toys, beds, and clean accessories can be returned within 30 days of purchase for a full refund. Return shipping labels are printable from your account center."
            },
            {
                title: "Pet Product Guarantee",
                content: "If your pet doesn't love their new nutrition plan, let us know. We'll consult our nutrition team to swap products or issue credit for a different food blend."
            }
        ]
    },
    {
        slug: "privacy",
        title: "Privacy Policy",
        sections: [
            {
                title: "Overview",
                content: "Zootopia collects the minimum information needed to personalize recommendations and deliver your orders. We never sell your data to advertisers or data brokers."
            },
            {
                title: "What we collect",
                content: "Account details (name, email, address), pet profile information (species, breed, age, weight, preferences), and order history. With your permission, we may also collect delivery preferences and veterinary notes."
            },
            {
                title: "How we use it",
                content: "To personalize product picks, remind you before refills run out, process orders, prevent fraud, and improve our service. We use aggregated, de-identified data to understand trends."
            },
            {
                title: "Your rights",
                content: "You can export or delete your data anytime from Account → Privacy. We respond to GDPR and CCPA requests within 30 days."
            },
            {
                title: "Contact",
                content: "Questions? Email privacy@petcare.example."
            }
        ]
    },
    {
        slug: "terms",
        title: "Terms of Service",
        sections: [
            {
                title: "Agreement",
                content: "By using Zootopia, you agree to these terms. If you don't agree, please don't use the service."
            },
            {
                title: "Accounts",
                content: "You're responsible for keeping your login secure and for activity under your account. You must be at least 18 to purchase."
            },
            {
                title: "Subscriptions",
                content: "Recurring orders charge on the cadence you set. You can pause, skip, or cancel anytime in your dashboard before the next billing date."
            },
            {
                title: "Shipping and returns",
                content: "See our Shipping and Returns pages for specifics. Refunds follow the policies described there."
            },
            {
                title: "Limitation of liability",
                content: "Zootopia isn't a veterinary service. Always consult a licensed vet about health concerns for your pet."
            },
            {
                title: "Changes",
                content: "We may update these terms occasionally. Material changes will be emailed to you at least 14 days before taking effect."
            }
        ]
    },
    {
        slug: "cookies",
        title: "Cookie Policy",
        sections: [
            {
                title: "What are cookies?",
                content: "Cookies are small text files that websites save to your computer or mobile device when you visit. They allow the website to remember your actions and preferences over a period of time, so you do not have to keep re-entering them whenever you come back to the site or browse from one page to another."
            },
            {
                title: "How Zootopia uses cookies",
                content: "We use cookies and similar tracking technologies to handle critical application functions. This includes keeping you signed into your account, maintaining items in your shopping cart, persisting your theme or preference settings, and ensuring secure payment processing."
            },
            {
                title: "Types of cookies we use",
                content: "We use Essential Cookies for user sessions and security; Functional Cookies to remember your customized preferences; and Performance & Analytics Cookies to gather aggregated information about site traffic and help us improve the overall user experience."
            },
            {
                title: "Your cookie choices",
                content: "Most web browsers allow you to manage cookie settings. You can choose to block or delete cookies through your browser preferences. However, please note that blocking essential cookies may prevent you from using necessary checkout or dashboard features on our platform."
            }
        ]
    }
];

export const seedDatabase = async () => {
    try {
        const jobCount = await Job.countDocuments();
        if (jobCount === 0) {
            await Job.insertMany(seedJobs);
            console.log("Seeded Job listings successfully.");
        }

        const faqCount = await FAQ.countDocuments();
        if (faqCount === 0) {
            await FAQ.insertMany(seedFAQs);
            console.log("Seeded Help Center FAQs successfully.");
        }

        const pressCount = await PressRelease.countDocuments();
        if (pressCount === 0) {
            await PressRelease.insertMany(seedPressReleases);
            console.log("Seeded Press Releases successfully.");
        }

        const infoCount = await InfoPage.countDocuments();
        if (infoCount === 0) {
            await InfoPage.insertMany(seedInfoPages);
            console.log("Seeded Info Pages content successfully.");
        }
    } catch (err) {
        console.error("Error seeding database:", err.message);
    }
};
