
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Video, FileText, Bell, Users, Share2 } from "lucide-react";
import Page from "@/components/Page";
import VideoMessagesTab from "@/components/connect-share/VideoMessagesTab";
import HolidayMessagesTab from "@/components/connect-share/HolidayMessagesTab";
import ImportantDocumentsTab from "@/components/connect-share/ImportantDocumentsTab";
import SharedWithMeTab from "@/components/connect-share/SharedWithMeTab";

const ConnectAndShare = () => {
  const [activeTab, setActiveTab] = useState("video-messages");

  return (
    <Page title="Connect & Share">
      <div className="container max-w-6xl px-4 py-8 mx-auto">
        {/* Header with animation */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative mr-3">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 blur-sm"></div>
              <div className="relative bg-white/10 rounded-full p-2">
                <Share2 className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-light bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Connect & Share
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with your loved ones by sharing videos, holiday messages, and important documents in a secure environment.
          </p>
        </div>

        <Tabs
          defaultValue="video-messages"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-8 bg-white/5 p-1 rounded-xl backdrop-blur-sm">
            <TabsTrigger
              value="video-messages"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg py-3"
            >
              <Video className="h-4 w-4 mr-2 text-blue-400" />
              Video Messages
            </TabsTrigger>
            <TabsTrigger
              value="holiday-messages"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg py-3"
            >
              <MessageSquare className="h-4 w-4 mr-2 text-pink-400" />
              Holiday Messages
            </TabsTrigger>
            <TabsTrigger
              value="important-documents"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-lg py-3"
            >
              <FileText className="h-4 w-4 mr-2 text-amber-400" />
              Important Documents
            </TabsTrigger>
            <TabsTrigger
              value="shared-with-me"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-lg py-3"
            >
              <Users className="h-4 w-4 mr-2 text-green-400" />
              Shared with Me
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video-messages" className="animate-fade-in focus:outline-none">
            <VideoMessagesTab />
          </TabsContent>

          <TabsContent value="holiday-messages" className="animate-fade-in focus:outline-none">
            <HolidayMessagesTab />
          </TabsContent>

          <TabsContent value="important-documents" className="animate-fade-in focus:outline-none">
            <ImportantDocumentsTab />
          </TabsContent>

          <TabsContent value="shared-with-me" className="animate-fade-in focus:outline-none">
            <SharedWithMeTab />
          </TabsContent>
        </Tabs>
      </div>
    </Page>
  );
};

export default ConnectAndShare;
