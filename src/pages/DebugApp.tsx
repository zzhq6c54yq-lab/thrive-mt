
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Phone, Headphones } from 'lucide-react';

// Simple Crisis Overlay Component
const CrisisOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 text-white z-50 flex flex-col justify-center items-center p-6">
      <h2 className="text-2xl font-bold mb-4">You're Not Alone</h2>
      <p className="mb-6 text-center max-w-md">
        If you're in distress, take a deep breath. This moment will pass. We're here for you.
      </p>

      <div className="grid gap-4 mb-6">
        <a 
          href="tel:988" 
          className="bg-red-500 px-4 py-2 rounded text-center font-semibold hover:bg-red-400 flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          Call Suicide & Crisis Lifeline (988)
        </a>
        <a 
          href="sms:741741" 
          className="bg-blue-500 px-4 py-2 rounded text-center font-semibold hover:bg-blue-400 flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Text Crisis Line (741741)
        </a>
        <a
          href="/app/breathing-exercise"
          className="bg-green-600 hover:bg-green-500 flex items-center gap-2 px-4 py-2 rounded text-center font-semibold text-white"
        >
          <Heart className="h-4 w-4" />
          Start Breathing Exercise
        </a>
      </div>

      <button onClick={onClose} className="underline text-sm">
        Close this window
      </button>
    </div>
  );
};

// Simple Community Support Wall Component
const CommunitySupportWall: React.FC = () => {
  const [posts, setPosts] = useState([
    { id: '1', content: 'Today I chose to reach out for help instead of staying silent. Small steps matter.', hearts: 12, created_at: '2024-01-15' },
    { id: '2', content: 'Grateful for this community. Your words last week helped me through a tough moment.', hearts: 8, created_at: '2024-01-14' },
    { id: '3', content: 'Three months clean today. The journey continues, one day at a time.', hearts: 25, created_at: '2024-01-13' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newPost = {
        id: String(Date.now()),
        content: newMessage.trim(),
        hearts: 0,
        created_at: new Date().toISOString().split('T')[0]
      };
      setPosts(prev => [newPost, ...prev]);
      setNewMessage('');
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <MessageCircle className="h-6 w-6 text-purple-400" />
          Community Support Wall
        </CardTitle>
        <p className="text-purple-200 mt-2">
          Share encouragement, celebrate wins, and support each other anonymously
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share a word of encouragement, a personal win, or support for others..."
            className="min-h-[100px] bg-white/5 border-purple-500/30 text-white placeholder:text-purple-200"
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-purple-300">
              {newMessage.length}/500 characters
            </span>
            <Button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Post Anonymously
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="bg-slate-800/50 border-l-4 border-purple-500 hover:bg-slate-800/70 transition-colors"
            >
              <CardContent className="p-4">
                <blockquote className="text-white text-lg italic mb-4 leading-relaxed">
                  "{post.content}"
                </blockquote>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {post.hearts}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Simple Binaural Player Component
const BinauralPlayer: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState('focus');
  
  const tracks = [
    { id: 'focus', name: 'Focus (Alpha Waves)', description: 'Enhances concentration and productivity' },
    { id: 'sleep', name: 'Deep Sleep (Delta Waves)', description: 'Encourages restorative sleep' },
    { id: 'calm', name: 'Calm (Theta Waves)', description: 'Reduces anxiety and promotes mindfulness' },
    { id: 'uplift', name: 'Uplift (Beta Waves)', description: 'Boosts motivation and alertness' }
  ];

  const currentTrack = tracks.find(t => t.id === selectedTrack) || tracks[0];

  return (
    <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Headphones className="h-5 w-5 text-green-400" />
          Healing Sound Therapy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <select
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value)}
          className="w-full border rounded p-2 bg-slate-800 text-white border-slate-600"
        >
          {tracks.map(track => (
            <option key={track.id} value={track.id}>
              {track.name}
            </option>
          ))}
        </select>

        <p className="text-sm text-slate-300">{currentTrack.description}</p>

        <div className="bg-slate-800 p-4 rounded">
          <p className="text-white mb-2">🎵 Now Playing: {currentTrack.name}</p>
          <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
            <div className="bg-green-400 h-2 rounded-full w-1/3"></div>
          </div>
          <div className="flex justify-center gap-2">
            <Button size="sm" variant="outline" className="border-green-500 text-green-400">
              ⏮
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              ▶️ Play
            </Button>
            <Button size="sm" variant="outline" className="border-green-500 text-green-400">
              ⏭
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Debug App Component
const DebugApp: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {showOverlay && <CrisisOverlay onClose={() => setShowOverlay(false)} />}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Titan Mental Health Platform</h1>
          <p className="text-purple-200 text-lg mb-6">
            Your comprehensive mental wellness companion
          </p>
          <Button 
            onClick={() => setShowOverlay(true)}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            🆘 Crisis Support
          </Button>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Community Support Wall
          </h2>
          <CommunitySupportWall />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2">
            <Headphones className="h-6 w-6" />
            Binaural Healing Sounds
          </h2>
          <BinauralPlayer />
        </section>
      </div>
    </div>
  );
};

export default DebugApp;
