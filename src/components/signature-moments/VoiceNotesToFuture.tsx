import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Mic, Square, Play, Calendar, Send } from "lucide-react";
import { toast } from "sonner";
import { getEmpatheticCopy } from "@/constants/empatheticCopy";
import { playSound, vibrate } from "@/utils/soundSystem";

interface VoiceNote {
  id: string;
  title: string;
  audio_url: string;
  message: string;
  recording_date: string;
  delivery_date: string;
  delivered: boolean;
}

export const VoiceNotesToFuture = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [playingNote, setPlayingNote] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    loadVoiceNotes();
  }, []);

  const loadVoiceNotes = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('voice_notes_future')
      .select('*')
      .eq('user_id', user.id)
      .order('delivery_date', { ascending: true });

    if (data) {
      setNotes(data);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      vibrate(50); // Quick pulse on start
      playSound('notification');
      
      toast.success(getEmpatheticCopy('voiceNotes', 'recording'));
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error("Couldn't access your microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      vibrate([50, 100, 50]); // Double pulse on stop
      playSound('complete');
    }
  };

  const saveVoiceNote = async () => {
    if (!audioBlob || !title || !deliveryDate) {
      toast.error("Please record a message, add a title, and set a delivery date");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Upload audio to Supabase Storage
    const fileName = `${user.id}/${Date.now()}.webm`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('voice-notes')
      .upload(fileName, audioBlob);

    if (uploadError) {
      toast.error("Failed to upload voice note");
      return;
    }

    const audioUrl = supabase.storage
      .from('voice-notes')
      .getPublicUrl(fileName).data.publicUrl;

    // Save metadata to database
    const { data, error } = await supabase
      .from('voice_notes_future')
      .insert({
        user_id: user.id,
        title,
        message,
        audio_url: audioUrl,
        delivery_date: new Date(deliveryDate).toISOString()
      })
      .select()
      .single();

    if (data) {
      setNotes(prev => [...prev, data]);
      toast.success(getEmpatheticCopy('voiceNotes', 'saved'));
      playSound('achievement');
      
      // Reset form
      setAudioBlob(null);
      setTitle("");
      setMessage("");
      setDeliveryDate("");
    }
  };

  const playNote = (noteId: string, audioUrl: string) => {
    if (playingNote === noteId) {
      audioRef.current?.pause();
      setPlayingNote(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setPlayingNote(noteId);
        playSound('notification');
      }
    }
  };

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <Card className="bg-gray-800/40 backdrop-blur-sm border-bronze-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <Mic className="w-6 h-6 text-bronze-400" />
          {getEmpatheticCopy('voiceNotes', 'title')}
        </CardTitle>
        <p className="text-sm text-gray-400">
          {getEmpatheticCopy('voiceNotes', 'empty')}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recording Section */}
        <div className="p-6 bg-gray-900/50 rounded-lg border border-bronze-400/30 space-y-4">
          <div className="flex justify-center">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                disabled={audioBlob !== null}
                className="bg-gradient-to-r from-bronze-600 to-bronze-500 hover:from-bronze-700 hover:to-bronze-600 text-white rounded-full w-20 h-20"
              >
                <Mic className="w-8 h-8" />
              </Button>
            ) : (
              <Button
                onClick={stopRecording}
                variant="destructive"
                className="rounded-full w-20 h-20 animate-pulse"
              >
                <Square className="w-8 h-8" />
              </Button>
            )}
          </div>

          {audioBlob && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Title for this message</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Dear future me..."
                  className="bg-gray-800 border-bronze-400/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">Written note (optional)</Label>
                <Input
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add context to your voice message"
                  className="bg-gray-800 border-bronze-400/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery" className="text-gray-300">When should this arrive?</Label>
                <Input
                  id="delivery"
                  type="date"
                  min={minDate}
                  max={maxDate}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="bg-gray-800 border-bronze-400/30 text-white"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={saveVoiceNote}
                  className="flex-1 bg-gradient-to-r from-bronze-600 to-bronze-500 hover:from-bronze-700 hover:to-bronze-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to Future
                </Button>
                <Button
                  onClick={() => setAudioBlob(null)}
                  variant="outline"
                  className="border-bronze-400/30"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Saved Notes */}
        {notes.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-medium">Your Messages</h3>
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 bg-gray-900/50 rounded-lg border border-bronze-400/30 hover:border-bronze-400/60 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-medium">{note.title}</h4>
                    {note.message && (
                      <p className="text-sm text-gray-400 mt-1">{note.message}</p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => playNote(note.id, note.audio_url)}
                    className={playingNote === note.id ? "text-bronze-400" : ""}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  Arrives: {new Date(note.delivery_date).toLocaleDateString()}
                  {note.delivered && (
                    <span className="ml-2 text-bronze-400">✓ Delivered</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <audio ref={audioRef} onEnded={() => setPlayingNote(null)} className="hidden" />
      </CardContent>
    </Card>
  );
};
