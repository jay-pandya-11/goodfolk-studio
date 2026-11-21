/**
 * api-client.ts — Production-Ready API Client for Goodfolk Studio
 *
 * Connects the Next.js frontend to the Express/MongoDB backend REST API.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export interface ServiceItem {
  _id: string;
  number: string;
  slug: string;
  tag?: string;
  title: string;
  icon?: string;
  description: string;
  deliverables: string[];
  isActive: boolean;
  order: number;
}

export interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  category: string;
  description: string;
  coverImage?: string;
  images?: string[];
  technologies?: string[];
  testimonial?: string;
  isPublished: boolean;
  isFeatured: boolean;
  completedAt?: string;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Network request failed',
    };
  }
}

export const api = {
  // Contacts
  submitContact: (payload: ContactPayload) =>
    request<{ contact: any }>('/contacts', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Services
  getServices: () => request<{ services: ServiceItem[] }>('/services'),
  getServiceBySlug: (slug: string) => request<{ service: ServiceItem }>(`/services/${slug}`),

  // Projects
  getProjects: (category?: string) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return request<{ projects: ProjectItem[]; pagination: any }>(`/projects${query}`);
  },
  getFeaturedProjects: () => request<{ projects: ProjectItem[] }>('/projects/featured'),
  getProjectBySlug: (slug: string) => request<{ project: ProjectItem }>(`/projects/${slug}`),

  // Newsletter
  subscribeNewsletter: (email: string, name?: string) =>
    request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    }),

  // Site Settings
  getSiteSettings: (group: string) => request<{ settings: Record<string, any> }>(`/site-settings/${group}`),

  // Health
  checkHealth: () => request('/health'),
};
