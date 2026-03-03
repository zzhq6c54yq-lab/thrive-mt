
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar, Book, Phone, Smile } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const GoldenYearsDashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Hello, {user?.email?.split('@')[0] || 'Friend'} 🌅
          </h1>
          <p className="text-amber-200 text-lg">
            Your golden years deserve golden care. You've earned this peace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-amber-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Heart className="h-6 w-6 text-amber-400" />
              <CardTitle className="text-white ml-2">Daily Wellness</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Gentle activities designed for mental and emotional wellness.
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold">
                Today's Activities
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Users className="h-6 w-6 text-blue-400" />
              <CardTitle className="text-white ml-2">Social Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Connect with peers and participate in community activities.
              </p>
              <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10">
                Join Groups
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Book className="h-6 w-6 text-green-400" />
              <CardTitle className="text-white ml-2">Memory & Cognitive Health</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Gentle exercises to keep your mind sharp and engaged.
              </p>
              <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10">
                Brain Games
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Smile className="h-5 w-5 text-purple-400 mr-2" />
                Life Reflection Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Share your wisdom and reflect on your rich life experiences.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Write Memories
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-pink-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Phone className="h-5 w-5 text-pink-400 mr-2" />
                Family Connection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Stay connected with loved ones and share your journey.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full text-pink-400 border-pink-500 hover:bg-pink-500/10">
                  Video Call Family
                </Button>
                <Button variant="outline" className="w-full text-pink-400 border-pink-500 hover:bg-pink-500/10">
                  Share Photos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GoldenYearsDashboard;
