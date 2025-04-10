
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AnimatedTransition from '@/components/AnimatedTransition';
import Header from '@/components/Header';
import DashboardStats from '@/components/user/dashboard/DashboardStats';
import StatsTab from '@/components/user/dashboard/StatsTab';
import ReferralsTab from '@/components/user/dashboard/ReferralsTab';
import ReferralLinksTab from '@/components/user/dashboard/ReferralLinksTab';
import SharesTab from '@/components/user/dashboard/SharesTab';
import GlobalCTA from '@/components/GlobalCTA';
import WelcomeBanner from '@/components/welcome/WelcomeBanner';
import EmptyState from '@/components/empty-states/EmptyState';
import { MessageSquare, BookOpen, Share2, BarChart2, Link, Users, RefreshCw, Zap } from 'lucide-react';
import { ReferralPlatform } from '@/context/ReferralContext';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import DashboardActivityWidget from '@/components/activity/DashboardActivityWidget';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [isNewUser, setIsNewUser] = useState(false);
  const [showActivityFeed, setShowActivityFeed] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user is new based on registration date or activity
    // This would typically come from user data
    const userJoinDate = user?.createdAt ? new Date(user.createdAt) : user?.joinDate ? new Date(user.joinDate) : null;
    const isRecent = userJoinDate ? 
      (Date.now() - userJoinDate.getTime()) < (7 * 24 * 60 * 60 * 1000) : false;
    
    setIsNewUser(isRecent);
  }, [user]);

  // Mock Data
  const aggregatedStats = {
    clicks: 4567,
    signups: 789,
    sharedContent: 123,
  };

  const reachStats = {
    totalVisitors: 12345,
    countries: 45,
    platforms: 12,
  };

  // Mock platform stats data for StatsTab
  const platformStats = [
    { platform: 'insiderlife' as ReferralPlatform, clicks: 2500, signups: 400, sharedContent: 60 },
    { platform: 'insiderdao' as ReferralPlatform, clicks: 1200, signups: 220, sharedContent: 35 },
    { platform: 'societi' as ReferralPlatform, clicks: 600, signups: 100, sharedContent: 18 },
    { platform: 'aifc' as ReferralPlatform, clicks: 267, signups: 69, sharedContent: 10 }
  ];

  const referrals = [
    { id: "1", name: "Alice Smith", signupDate: "2024-01-15", source: "insiderlife" },
    { id: "2", name: "Bob Johnson", signupDate: "2024-02-01", source: "insiderdao" },
    { id: "3", name: "Charlie Brown", signupDate: "2024-02-10", source: "societi" },
  ];

  // Convert the object format to array format for ReferralLinksTab
  const referralLinks = [
    { platform: 'insiderlife' as ReferralPlatform, url: "insiderlife.com/?ref=your-username", isSet: true },
    { platform: 'insiderdao' as ReferralPlatform, url: "insiderdao.com/?ref=your-username", isSet: true },
    { platform: 'societi' as ReferralPlatform, url: "societi.com/?ref=your-username", isSet: true },
    { platform: 'aifc' as ReferralPlatform, url: "aifc.com/?ref=your-username", isSet: true }
  ];

  // Mock updateReferralLink function
  const updateReferralLink = (platform: ReferralPlatform, url: string) => {
    console.log(`Updating ${platform} referral link to ${url}`);
    toast({
      title: "Link Updated",
      description: `Your ${platform} referral link has been updated.`,
      duration: 3000,
    });
    // In a real app, this would update the state or call an API
  };

  // Convert the format to match what SharesTab expects
  const shares = [
    { id: "1", title: "The Future of AI", date: "March 15, 2024", clicks: 120, signups: 14 },
    { id: "2", title: "Blockchain Explained", date: "March 2, 2024", clicks: 90, signups: 8 },
    { id: "3", title: "Web3 Development", date: "February 20, 2024", clicks: 110, signups: 12 }
  ];

  const hasNoActivity = shares.length === 0 && referrals.length === 0;

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      toast({
        title: "Link Copied",
        description: "Referral link copied to clipboard!",
        duration: 3000,
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <AnimatedTransition>
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Dashboard
              </h1>
              
              {user?.isTopReferrer && (
                <Badge variant="outline" className="ml-0 mt-2 sm:mt-0 sm:ml-4 bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 border-amber-300">
                  <RefreshCw className="h-3 w-3 mr-1 text-amber-700" /> Top Referrer
                </Badge>
              )}
            </div>

            {isNewUser && <WelcomeBanner />}

            {hasNoActivity ? (
              <div className="space-y-8">
                <EmptyState
                  title="Welcome to your Signal Hub!"
                  description="Start by exploring content, participating in SignalBoard discussions, or checking out our Education Hub."
                  icon={<Share2 className="h-8 w-8" />}
                  actionLabel="Explore Content"
                  actionHref="/content"
                  size="lg"
                />
                <DashboardStats 
                  aggregatedStats={aggregatedStats}
                  reachStats={reachStats}
                />
                
                {showActivityFeed && (
                  <DashboardActivityWidget 
                    className="mt-8" 
                    onHide={() => setShowActivityFeed(false)}
                  />
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <DashboardStats 
                      aggregatedStats={aggregatedStats}
                      reachStats={reachStats}
                    />
                  </div>
                  
                  {showActivityFeed && (
                    <div className="lg:col-span-1">
                      <DashboardActivityWidget 
                        onHide={() => setShowActivityFeed(false)}
                      />
                    </div>
                  )}
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
                  <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-row bg-gray-100 dark:bg-gray-800/50 p-1 rounded-lg">
                    <TabsTrigger value="stats" className="flex items-center gap-1.5">
                      <BarChart2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Stats</span>
                    </TabsTrigger>
                    <TabsTrigger value="referrals" className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Referrals</span>
                    </TabsTrigger>
                    <TabsTrigger value="links" className="flex items-center gap-1.5">
                      <Link className="h-4 w-4" />
                      <span className="hidden sm:inline">Referral Links</span>
                    </TabsTrigger>
                    <TabsTrigger value="shares" className="flex items-center gap-1.5">
                      <Share2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Shares</span>
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4" />
                      <span className="hidden sm:inline">Activity</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="stats" className="mt-6">
                    <StatsTab 
                      platformStats={platformStats}
                      reachStats={reachStats}
                    />
                  </TabsContent>
                  
                  <TabsContent value="referrals" className="mt-6">
                    {referrals.length > 0 ? (
                      <ReferralsTab referrals={referrals} />
                    ) : (
                      <EmptyState
                        title="No Referrals Yet"
                        description="Share your referral links with your network to start earning rewards."
                        icon={<Users className="h-8 w-8" />}
                        actionLabel="View Referral Links"
                        onAction={() => setActiveTab('links')}
                        size="md"
                      />
                    )}
                  </TabsContent>
                  
                  <TabsContent value="links" className="mt-6">
                    <TooltipProvider>
                      <ReferralLinksTab
                        referralLinks={referralLinks}
                        updateReferralLink={updateReferralLink}
                        onCopyLink={handleCopyLink}
                      />
                    </TooltipProvider>
                  </TabsContent>
                  
                  <TabsContent value="shares" className="mt-6">
                    {shares.length > 0 ? (
                      <SharesTab shares={shares} />
                    ) : (
                      <EmptyState
                        title="No Shares Yet"
                        description="Start sharing content with your network to track engagement."
                        icon={<Share2 className="h-8 w-8" />}
                        actionLabel="Browse Content"
                        actionHref="/content"
                        size="md"
                      />
                    )}
                  </TabsContent>
                  
                  <TabsContent value="activity" className="mt-6">
                    <DashboardActivityWidget />
                  </TabsContent>
                </Tabs>
              </>
            )}

            <div className="mt-12">
              <GlobalCTA
                id="dashboard-cta"
                title="Unlock Pro Features"
                description="Upgrade to Pro to access advanced analytics and more."
                buttonText="Upgrade Now"
                buttonUrl="/pricing"
                type="card"
                brand="insiderlife"
                theme="primary"
              />
            </div>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default UserDashboard;
