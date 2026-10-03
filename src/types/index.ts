export type MembershipTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  phoneVerified: boolean;
  dob: string;
  avatarId: string;
  membershipTier: MembershipTier;
  points: number;
  pointsToNextTier: number;
  nextTier: MembershipTier;
  tierProgress: number; // 0 to 1
  memberSince: string;
  memberCode: string;
  inAppNotifications: boolean;
  newsletter: boolean;
}

export interface PopIcon {
  id: string;
  name: string;
  character: string;
  color: string;
  bgColor: string;
  accentColor: string;
  emoji: string;
  description: string;
}

export type RewardCategory = 'all' | 'vouchers' | 'blind_box' | 'merch' | 'exclusive';

export interface Reward {
  id: string;
  title: string;
  category: Exclude<RewardCategory, 'all'>;
  pointsCost: number;
  originalValue?: string;
  description: string;
  series?: string;
  stock: number;
  badge?: string;
  isPopular?: boolean;
}

export interface RedeemedReward {
  id: string;
  rewardId: string;
  rewardTitle: string;
  pointsCost: number;
  code: string;
  redeemedAt: string;
  expiresAt: string;
  status: 'active' | 'used' | 'expired';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'reward' | 'points' | 'redemption' | 'system';
  date: string;
  time: string;
  isRead: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  points: number; // positive or negative
  type: 'earned' | 'redeemed' | 'bonus';
  date: string;
  icon: string;
}
