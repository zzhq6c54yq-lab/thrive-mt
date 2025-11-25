import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Monitor, ThumbsUp, Paperclip, Settings, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoSessionControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  isChatOpen: boolean;
  isScreenSharing: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onSwitchCamera: () => void;
  onToggleChat: () => void;
  onToggleScreenShare: () => void;
  onSendReaction: (emoji: string) => void;
  onToggleFiles: () => void;
  onOpenSettings: () => void;
  onEndCall: () => void;
}

export default function VideoSessionControls({
  isMuted,
  isVideoOff,
  isChatOpen,
  isScreenSharing,
  onToggleMute,
  onToggleVideo,
  onSwitchCamera,
  onToggleChat,
  onToggleScreenShare,
  onSendReaction,
  onToggleFiles,
  onOpenSettings,
  onEndCall
}: VideoSessionControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 px-6 py-4">
      <div className="flex items-center justify-center gap-3 max-w-4xl mx-auto">
        {/* Mute Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onToggleMute}
          className={`rounded-full w-14 h-14 p-0 transition-all ${
            isMuted
              ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive'
              : 'bg-background/50 hover:bg-[hsl(var(--primary))]/20 border-border/50'
          }`}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>

        {/* Video Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onToggleVideo}
          className={`rounded-full w-14 h-14 p-0 transition-all ${
            isVideoOff
              ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive'
              : 'bg-background/50 hover:bg-[hsl(var(--primary))]/20 border-border/50'
          }`}
        >
          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </Button>

        {/* Switch Camera */}
        <Button
          variant="outline"
          size="lg"
          onClick={onSwitchCamera}
          className="rounded-full w-14 h-14 p-0 bg-background/50 hover:bg-[hsl(var(--primary))]/20 border-border/50"
        >
          <RefreshCw className="w-5 h-5" />
        </Button>

        {/* Chat Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onToggleChat}
          className={`rounded-full w-14 h-14 p-0 transition-all ${
            isChatOpen
              ? 'bg-[hsl(var(--primary))] text-primary-foreground border-[hsl(var(--primary))]'
              : 'bg-background/50 hover:bg-[hsl(var(--primary))]/20 border-border/50'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
        </Button>

        {/* Screen Share */}
        <Button
          variant="outline"
          size="lg"
          onClick={onToggleScreenShare}
          className={`rounded-full w-14 h-14 p-0 transition-all ${
            isScreenSharing
              ? 'bg-[hsl(var(--primary))] text-primary-foreground border-[hsl(var(--primary))]'
              : 'bg-background/50 hover:bg-[hsl(var(--primary))]/20 border-border/50'
          }`}
        >
          <Monitor className="w-5 h-5" />
        </Button>

        {/* Reactions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 p-0 bg-background/50 hover:bg-[hsl(var(--primary))]/20 border-border/50"
            >
              <ThumbsUp className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-background/95 backdrop-blur-xl border-border/50">
            <DropdownMenuItem onClick={() => onSendReaction('👍')} className="text-2xl cursor-pointer">
              👍
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSendReaction('❤️')} className="text-2xl cursor-pointer">
              ❤️
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSendReaction('✋')} className="text-2xl cursor-pointer">
              ✋
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSendReaction('👏')} className="text-2xl cursor-pointer">
              👏
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Files Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onToggleFiles}
          className="rounded-full w-14 h-14 p-0 bg-background/50 hover:bg-[hsl(var(--primary))]/20 border-border/50"
        >
          <Paperclip className="w-5 h-5" />
        </Button>

        {/* Settings Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onOpenSettings}
          className="rounded-full w-14 h-14 p-0 bg-background/50 hover:bg-[hsl(var(--primary))]/20 border-border/50"
        >
          <Settings className="w-5 h-5" />
        </Button>

        {/* End Call Button */}
        <Button
          size="lg"
          onClick={onEndCall}
          className="rounded-full w-14 h-14 p-0 bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive ml-4"
        >
          <PhoneOff className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
