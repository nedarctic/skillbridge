import { error } from "console";
import type { Profile, user } from "./types";

export const register = async (
  email: string,
  password1: string,
  password2: string,
  first_name: string,
  last_name: string
) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password1, password2, first_name, last_name }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      // dj-rest-auth sends field-specific errors like { email: ["A user with that email already exists."] }
      throw data;
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, error };
  }
};


export const login = async (email: string, password: string) => {
  const tokenResponse = await fetch("http://127.0.0.1:8000/api/v1/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    console.error("Login failed:", await tokenResponse.text());
    return null;
  }

  return tokenResponse.json();
};

export const resetPassword = async (email: string) => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/dj-rest-auth/password/reset/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Password reset failed:", await res.text());
    return null;
  }

  return res;
};

export const getProfiles = async (token: string) => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/profiles/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Profile fetch failed:", await res.text());
    return [];
  }

  const data = await res.json();
  return data.results || data;
};

export const getRatings = () => {
  const res = fetch("http://127.0.0.1:8000/api/v1/ratings/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
}


export const getReviews = () => {
  const res = fetch("http://127.0.0.1:8000/api/v1/reviews/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
}

// sample login for a profiles fetch
const tokenData = await login("lilianwambui@example.com", "StrongPass123!");
if (!tokenData?.access) {
  console.error("Failed to log in.");
}

// fetching profiles using token
export const profiles: Profile[] = await getProfiles(tokenData.access);
if (profiles.length === 0) {
  console.error("No profiles found or failed to fetch profiles.");
}

// export const fetchProfiles = async (): Promise<user[]> => {
//   const profiles = await getProfiles();
//   return profiles;
// }

// export const users: user[] = [
//   {
//     id: 1,
//     name: "Amina Mwangi",
//     skill: "Graphic Design",
//     experience: "3 years",
//     rating: 4.8,
//     reviews: 32,
//     location: "Nairobi, Kenya",
//     bio: "Passionate about helping brands tell their stories visually. Specialized in logos and brand kits.",
//     profile: "/Amina Mwangi.jpeg",
//     about:
//       "Amina is a Nairobi-based graphic designer with a passion for minimalism and storytelling through visuals. Over the past three years, she has helped startups and established brands create cohesive brand identities that stand out both online and offline.",
//     services: ["Logo Design", "Brand Identity Kits", "Social Media Graphics", "Print Materials"],
//   },
//   {
//     id: 2,
//     name: "David Otieno",
//     skill: "Web Development",
//     experience: "5 years",
//     rating: 4.6,
//     reviews: 44,
//     location: "Kisumu, Kenya",
//     bio: "Full-stack developer building fast, modern web apps with Django and React.",
//     profile: "/David Otieno.jpeg",
//     about:
//       "David is an experienced full-stack developer from Kisumu who crafts high-performing, scalable web applications. He specializes in Python (Django) and React, focusing on performance, clean design, and robust backend logic.",
//     services: ["Frontend Development", "Backend APIs", "Deployment & DevOps", "UI Integration"],
//   },
//   {
//     id: 3,
//     name: "Grace Njeri",
//     skill: "Digital Marketing",
//     experience: "4 years",
//     rating: 4.9,
//     reviews: 51,
//     location: "Nakuru, Kenya",
//     bio: "Helping small businesses grow through content, ads, and social media strategy.",
//     profile: "/Grace Njeri.jpeg",
//     about:
//       "Grace is a creative digital marketer who blends strategy with storytelling. She’s worked with SMEs and influencers to grow their reach through engaging campaigns, targeted ads, and content optimization.",
//     services: ["Social Media Strategy", "Content Marketing", "Ad Campaigns", "Brand Management"],
//   },
//   {
//     id: 4,
//     name: "Brian Kiptoo",
//     skill: "Photography",
//     experience: "6 years",
//     rating: 4.7,
//     reviews: 26,
//     location: "Eldoret, Kenya",
//     bio: "Event and lifestyle photographer capturing moments that matter.",
//     profile: "/Brian Kiptoo.jpeg",
//     about:
//       "Brian is a seasoned photographer from Eldoret who specializes in capturing authentic human moments. His work spans weddings, events, and lifestyle shoots, always focused on storytelling through imagery.",
//     services: ["Event Photography", "Portrait Sessions", "Photo Editing", "Commercial Shoots"],
//   },
//   {
//     id: 5,
//     name: "Fatma Hassan",
//     skill: "Content Writing",
//     experience: "2 years",
//     rating: 4.5,
//     reviews: 19,
//     location: "Mombasa, Kenya",
//     bio: "Creative storyteller crafting SEO-friendly articles and brand blogs.",
//     profile: "/Fatma Hassan.jpeg",
//     about:
//       "Fatma is a talented content writer from Mombasa who specializes in creating SEO-driven articles and blog posts. Her writing helps brands rank higher while connecting emotionally with their audiences.",
//     services: ["SEO Writing", "Blog Posts", "Website Copy", "Product Descriptions"],
//   },
//   {
//     id: 6,
//     name: "George Mworia",
//     skill: "Mobile App Development",
//     experience: "5 years",
//     rating: 4.9,
//     reviews: 62,
//     location: "Thika, Kenya",
//     bio: "Android and iOS developer with a passion for scalable and beautiful apps.",
//     profile: "/George Mworia.jpeg",
//     about:
//       "George is a skilled mobile developer focused on creating seamless Android and iOS apps. His approach combines user-centered design with performance and long-term scalability in mind.",
//     services: ["Android Development", "iOS Development", "UI Implementation", "App Optimization"],
//   },
//   {
//     id: 7,
//     name: "Lilian Wambui",
//     skill: "UI/UX Design",
//     experience: "3 years",
//     rating: 4.8,
//     reviews: 27,
//     location: "Machakos, Kenya",
//     bio: "Designing intuitive digital experiences that users love to interact with.",
//     profile: "/Lilian Wambui.jpeg",
//     about:
//       "Lilian is a UI/UX designer from Machakos dedicated to designing functional and delightful user experiences. She focuses on research, prototyping, and accessible design principles.",
//     services: ["UI Design", "UX Research", "Prototyping", "Wireframing"],
//   },
//   {
//     id: 8,
//     name: "Kevin Ochieng",
//     skill: "Video Editing",
//     experience: "4 years",
//     rating: 4.7,
//     reviews: 38,
//     location: "Kisii, Kenya",
//     bio: "Transforming raw footage into cinematic stories for creators and brands.",
//     profile: "/Kevin Ochieng.jpeg",
//     about:
//       "Kevin is a professional video editor specializing in storytelling through visuals. From documentaries to brand ads, he delivers polished, cinematic edits that capture emotion and detail.",
//     services: ["Video Editing", "Color Grading", "Motion Graphics", "Sound Design"],
//   },
//   {
//     id: 9,
//     name: "Esther Korir",
//     skill: "Data Analysis",
//     experience: "3 years",
//     rating: 4.8,
//     reviews: 40,
//     location: "Kericho, Kenya",
//     bio: "Turning numbers into insights using Python, Power BI, and Excel.",
//     profile: "/Esther Korir.jpeg",
//     about:
//       "Esther is a data analyst who translates complex datasets into meaningful insights. She uses Python, Power BI, and Excel to help businesses make data-driven decisions with confidence.",
//     services: ["Data Visualization", "Statistical Analysis", "Reporting Dashboards", "Data Cleaning"],
//   },
//   {
//     id: 10,
//     name: "Dennis Kimani",
//     skill: "Music Production",
//     experience: "6 years",
//     rating: 4.9,
//     reviews: 29,
//     location: "Nairobi, Kenya",
//     bio: "Producer and sound engineer helping artists bring their sound to life.",
//     profile: "/Dennis Kimani.jpeg",
//     about:
//       "Dennis is a Nairobi-based music producer and sound engineer. He works with emerging and established artists to record, mix, and master tracks that stand out across genres.",
//     services: ["Beat Production", "Mixing & Mastering", "Recording Sessions", "Sound Design"],
//   },
// ];
