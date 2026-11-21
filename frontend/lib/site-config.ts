function getSocialProfileUrl(value: string | undefined, domain: string) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    const allowedHosts = [domain, `www.${domain}`];
    if (url.protocol !== "https:" || !allowedHosts.includes(url.hostname)) {
      return undefined;
    }
    return url.toString();
  } catch {
    return undefined;
  }
}

export const siteConfig = {
  name: "Goodfolk Studio",
  email: "it.dhavalpandya@gmail.com",
  phoneDisplay: "+91 72019 21439",
  phoneInternational: "+917201921439",
  whatsappNumber: "917201921439",
  location: "Bhavnagar, Gujarat, India",
  businessHours: "10:00 AM–7:00 PM",
  social: {
    linkedin: getSocialProfileUrl(
      process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/dhaval-pandya-a93574276/",
      "linkedin.com",
    ),
    facebook: getSocialProfileUrl(
      process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/share/1CHNEpAM3v/",
      "facebook.com",
    ),
    instagram: getSocialProfileUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL, "instagram.com"),
    youtube: getSocialProfileUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL, "youtube.com"),
  },
};
