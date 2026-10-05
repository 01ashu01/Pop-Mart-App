import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, PopIcon, Reward, RedeemedReward, NotificationItem, Transaction } from '../types';
import { INITIAL_USER, POP_ICONS, REWARDS, NOTIFICATIONS, TRANSACTIONS } from '../constants/mockData';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  popIcons: PopIcon[];
  rewards: Reward[];
  redeemedRewards: RedeemedReward[];
  notifications: NotificationItem[];
  transactions: Transaction[];
  unreadNotifsCount: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
  login: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (email: string, name: string) => Promise<{ success: boolean; error?: string }>;
  loginWithPhoneOtp: (phone: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
  }) => Promise<{ success: boolean; error?: string }>;
  updateUser: (fields: Partial<User>) => Promise<void>;
  selectAvatar: (avatarId: string) => Promise<void>;
  redeemReward: (rewardId: string) => { success: boolean; message: string; voucherCode?: string };
  simulateInStoreScan: () => { success: boolean; pointsEarned: number };
  dailyCheckIn: () => { success: boolean; pointsEarned: number; alreadyClaimed: boolean };
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const STORAGE_KEYS = {
  USER: '@popmart_user_profile',
  AUTH: '@popmart_auth_status',
  NOTIFS: '@popmart_notifications',
  TXS: '@popmart_transactions',
  REDEEMED: '@popmart_redeemed_rewards',
  CHECKIN_DATE: '@popmart_last_checkin',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(INITIAL_USER);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rewards, setRewards] = useState<Reward[]>(REWARDS);
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load persisted state on app start
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const [savedAuth, savedUser, savedNotifs, savedTxs, savedRedeemed] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.AUTH),
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.NOTIFS),
          AsyncStorage.getItem(STORAGE_KEYS.TXS),
          AsyncStorage.getItem(STORAGE_KEYS.REDEEMED),
        ]);

        if (savedAuth !== null) {
          setIsLoggedIn(savedAuth === 'true');
        } else {
          // Default demo user is logged in
          setIsLoggedIn(true);
        }

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(INITIAL_USER);
          await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(INITIAL_USER));
        }

        if (savedNotifs) {
          setNotifications(JSON.parse(savedNotifs));
        }
        if (savedTxs) {
          setTransactions(JSON.parse(savedTxs));
        }
        if (savedRedeemed) {
          setRedeemedRewards(JSON.parse(savedRedeemed));
        }
      } catch (err) {
        console.error('Error loading data from AsyncStorage:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  const login = async (identifier: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!identifier.trim()) {
      return { success: false, error: 'Please enter your email or phone number' };
    }
    if (!pass || pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    try {
      if (user) {
        const isEmail = identifier.includes('@');
        const updated = {
          ...user,
          email: isEmail ? identifier : user.email,
          phone: !isEmail ? identifier : user.phone,
        };
        setUser(updated);
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      }
      setIsLoggedIn(true);
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      showToast('Welcome back to POP MART!');
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to sign in' };
    }
  };

  const loginWithGoogle = async (email: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const parts = name.split(' ');
      const firstName = parts[0] || 'Google';
      const lastName = parts.slice(1).join(' ') || 'User';

      const googleUser: User = {
        id: `usr_g_${Date.now().toString().slice(-6)}`,
        name: name,
        firstName,
        lastName,
        email: email,
        emailVerified: true,
        phone: user?.phone || '+65 9888 8888',
        phoneVerified: true,
        dob: user?.dob || '01 April 2001',
        avatarId: 'molly',
        membershipTier: user?.membershipTier || 'Gold',
        points: user?.points || 2450,
        pointsToNextTier: user?.pointsToNextTier || 550,
        nextTier: user?.nextTier || 'Platinum',
        tierProgress: user?.tierProgress || 0.81,
        memberSince: user?.memberSince || 'October 2026',
        memberCode: user?.memberCode || `PM-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        inAppNotifications: true,
        newsletter: true,
      };

      setUser(googleUser);
      setIsLoggedIn(true);
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(googleUser)),
        AsyncStorage.setItem(STORAGE_KEYS.AUTH, 'true'),
      ]);
      showToast(`Signed in as ${name}`);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Google sign-in failed' };
    }
  };

  const loginWithPhoneOtp = async (phone: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (user) {
        const updated = { ...user, phone, phoneVerified: true };
        setUser(updated);
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
      }
      setIsLoggedIn(true);
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      showToast('Phone number verified successfully!');
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Phone verification failed' };
    }
  };

  const logout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH, 'false');
      showToast('Logged out successfully');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const newUser: User = {
      id: `usr_${Date.now().toString().slice(-6)}`,
      name: `${data.firstName} ${data.lastName}`.trim(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      emailVerified: true,
      phone: data.phone,
      phoneVerified: true,
      dob: data.dob || '01 Jan 2000',
      avatarId: 'molly',
      membershipTier: 'Bronze',
      points: 500, // 500 welcome bonus points
      pointsToNextTier: 500,
      nextTier: 'Silver',
      tierProgress: 0.5,
      memberSince: 'October 2026',
      memberCode: `PM-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      inAppNotifications: true,
      newsletter: true,
    };

    const welcomeNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: '🎉 Welcome Bonus Received!',
      message: '500 bonus points have been added to your account for joining POP MART.',
      type: 'points',
      date: 'Today',
      time: 'Just now',
      isRead: false,
    };

    const welcomeTx: Transaction = {
      id: `tx_${Date.now()}`,
      title: 'Welcome Loyalty Bonus',
      subtitle: 'New Member Registration',
      points: 500,
      type: 'bonus',
      date: 'Today',
      icon: 'sparkles',
    };

    try {
      setUser(newUser);
      setIsLoggedIn(true);
      const newNotifs = [welcomeNotif, ...notifications];
      const newTxs = [welcomeTx, ...transactions];
      setNotifications(newNotifs);
      setTransactions(newTxs);

      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser)),
        AsyncStorage.setItem(STORAGE_KEYS.AUTH, 'true'),
        AsyncStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(newNotifs)),
        AsyncStorage.setItem(STORAGE_KEYS.TXS, JSON.stringify(newTxs)),
      ]);

      return { success: true };
    } catch (err) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const updateUser = async (fields: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...fields };
    if (fields.firstName || fields.lastName) {
      updated.name = `${updated.firstName} ${updated.lastName}`.trim();
    }
    setUser(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    showToast('Profile updated');
  };

  const selectAvatar = async (avatarId: string) => {
    if (!user) return;
    const updated = { ...user, avatarId };
    setUser(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    showToast('Profile updated');
  };

  const redeemReward = (rewardId: string): { success: boolean; message: string; voucherCode?: string } => {
    if (!user) {
      return { success: false, message: 'Please log in first' };
    }

    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) {
      return { success: false, message: 'Reward not found' };
    }

    if (user.points < reward.pointsCost) {
      return {
        success: false,
        message: `You need ${reward.pointsCost - user.points} more points to redeem this reward.`,
      };
    }

    const voucherCode = `PM-${reward.category.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPoints = user.points - reward.pointsCost;

    const updatedUser: User = {
      ...user,
      points: newPoints,
      pointsToNextTier: Math.max(0, user.pointsToNextTier + reward.pointsCost),
    };

    const newRedeemed: RedeemedReward = {
      id: `red_${Date.now()}`,
      rewardId: reward.id,
      rewardTitle: reward.title,
      pointsCost: reward.pointsCost,
      code: voucherCode,
      redeemedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      expiresAt: '31 Dec 2026',
      status: 'active',
    };

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      title: `Redeemed ${reward.title}`,
      subtitle: `Voucher Code: ${voucherCode}`,
      points: -reward.pointsCost,
      type: 'redeemed',
      date: 'Today',
      icon: 'ticket',
    };

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: '🎁 Reward Redeemed Successfully',
      message: `You redeemed ${reward.title} for ${reward.pointsCost} points. Code: ${voucherCode}`,
      type: 'redemption',
      date: 'Today',
      time: 'Just now',
      isRead: false,
    };

    setUser(updatedUser);
    const updatedRedeemed = [newRedeemed, ...redeemedRewards];
    const updatedTxs = [newTx, ...transactions];
    const updatedNotifs = [newNotif, ...notifications];

    setRedeemedRewards(updatedRedeemed);
    setTransactions(updatedTxs);
    setNotifications(updatedNotifs);

    AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    AsyncStorage.setItem(STORAGE_KEYS.REDEEMED, JSON.stringify(updatedRedeemed));
    AsyncStorage.setItem(STORAGE_KEYS.TXS, JSON.stringify(updatedTxs));
    AsyncStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(updatedNotifs));

    showToast(`Redeemed ${reward.title}!`);
    return { success: true, message: 'Reward redeemed successfully!', voucherCode };
  };

  const simulateInStoreScan = (): { success: boolean; pointsEarned: number } => {
    if (!user) return { success: false, pointsEarned: 0 };

    const pointsEarned = 100;
    const newPoints = user.points + pointsEarned;
    const updatedUser: User = {
      ...user,
      points: newPoints,
      pointsToNextTier: Math.max(0, user.pointsToNextTier - pointsEarned),
    };

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      title: 'In-Store QR Code Scan',
      subtitle: 'Pop Mart Store Check-in & Purchase Points',
      points: pointsEarned,
      type: 'earned',
      date: 'Today',
      icon: 'qr-code',
    };

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: '✨ +100 Points Earned!',
      message: 'You scanned your Pop Mart QR Code at store checkout. 100 points have been credited.',
      type: 'points',
      date: 'Today',
      time: 'Just now',
      isRead: false,
    };

    setUser(updatedUser);
    const updatedTxs = [newTx, ...transactions];
    const updatedNotifs = [newNotif, ...notifications];

    setTransactions(updatedTxs);
    setNotifications(updatedNotifs);

    AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    AsyncStorage.setItem(STORAGE_KEYS.TXS, JSON.stringify(updatedTxs));
    AsyncStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(updatedNotifs));

    showToast(`+${pointsEarned} Points Added!`);
    return { success: true, pointsEarned };
  };

  const dailyCheckIn = (): { success: boolean; pointsEarned: number; alreadyClaimed: boolean } => {
    if (!user) return { success: false, pointsEarned: 0, alreadyClaimed: false };

    const pointsEarned = 10;
    const newPoints = user.points + pointsEarned;
    const updatedUser: User = {
      ...user,
      points: newPoints,
    };

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      title: 'Daily Check-in Bonus',
      subtitle: 'Pop Mart Daily Rewards',
      points: pointsEarned,
      type: 'bonus',
      date: 'Today',
      icon: 'calendar',
    };

    setUser(updatedUser);
    const updatedTxs = [newTx, ...transactions];
    setTransactions(updatedTxs);

    AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    AsyncStorage.setItem(STORAGE_KEYS.TXS, JSON.stringify(updatedTxs));

    showToast(`+${pointsEarned} PTS Daily Check-in!`);
    return { success: true, pointsEarned, alreadyClaimed: false };
  };

  const markNotificationAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setNotifications(updated);
    AsyncStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(updated));
  };

  const markAllNotificationsAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    AsyncStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(updated));
    showToast('All notifications marked as read');
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        popIcons: POP_ICONS,
        rewards,
        redeemedRewards,
        notifications,
        transactions,
        unreadNotifsCount,
        toastMessage,
        showToast,
        hideToast,
        login,
        loginWithGoogle,
        loginWithPhoneOtp,
        logout,
        register,
        updateUser,
        selectAvatar,
        redeemReward,
        simulateInStoreScan,
        dailyCheckIn,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
