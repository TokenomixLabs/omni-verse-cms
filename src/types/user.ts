
export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  role?: 'user' | 'admin' | 'moderator';
  isNewUser?: boolean;
  referredBy?: string; // Track who referred this user
  referralLinks?: {
    insiderlife: string;
    insiderdao: string;
    societi: string;
    aifc: string;
  };
  // New profile fields
  bio?: string;
  externalLink?: string;
  joinDate?: string;
  isPublicProfile?: boolean;
  isFeatured?: boolean;
  isVerified?: boolean;
  isTopReferrer?: boolean;
  // Intelligence fields
  aiSummary?: string;
  guardianTagline?: string;
  signalRank?: number;
  createdAt?: string;
  subscription?: {
    tier: 'free' | 'premium' | 'vip' | 'pro' | 'lifetime' | 'founders';
    expiresAt?: string;
    isInTrial?: boolean;
    trialEndsAt?: string;
    stripeCustId?: string;
    stripeSubId?: string;
    willDowngradeTo?: 'free' | 'premium' | 'vip' | 'pro' | 'lifetime' | 'founders';
    purchasedAt?: string;
    updatedAt?: string;
  };
}

export interface UserStats {
  duplicatedSeries: number;
  totalCtaClicks: number;
  referredUsers: number;
  threadsCreated: number;
  signalStrength: number;
}

export interface UserProfileData {
  user: User;
  stats: UserStats;
  duplicatedSeries: any[]; // Will replace with proper type
  signalboardThreads: any[]; // Will replace with proper type
}
