"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  User, 
  Mail, 
  Save, 
  ShieldCheck, 
  Loader2,
  Camera
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // @ts-ignore
      await authClient.user.update({
        name: formData.name,
        image: formData.image,
      });

      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was a problem updating your profile. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (sessionPending) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="flex-1 p-6 md:p-10 bg-[#FDFDFF] dark:bg-black overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="lg:text-left text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Profile Settings</h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">
            Manage your account information and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
              <div className="h-24 bg-linear-to-br from-indigo-500 -mt-6 to-purple-600" />
              <CardContent className="-mt-12 flex flex-col items-center text-center">
                <div className="relative group">
                  <Avatar className="w-24 h-24 border-4 border-white dark:border-zinc-950 shadow-xl">
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-2xl font-bold">
                      {session.user.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
                  </button>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{session.user.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-zinc-500">{session.user.email}</p>
                </div>

                <div className="mt-6 w-full space-y-3">
                  <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800">
                    <span className="text-slate-500">Status</span>
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800">
                    <span className="text-slate-500">Role</span>
                    <span className="text-slate-900 dark:text-white font-bold uppercase tracking-wider">Developer</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold">GitHub Connection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 -mt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-900/10">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                    <FaGithub className="w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Connected via GitHub</p>
                    <p className="text-[10px] text-slate-500 truncate">Permissions: All Public Repos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and how others see you.</CardDescription>
              </CardHeader>
              <form onSubmit={handleUpdateProfile}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                          id="name"
                          placeholder="John Doe"
                          className="pl-10 h-11 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:ring-indigo-500"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                          id="email"
                          type="email"
                          disabled
                          placeholder="john@example.com"
                          className="pl-10 h-11 bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-800 text-slate-500 opacity-60 cursor-not-allowed"
                          value={formData.email}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">Email is linked to your authentication provider.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar-url">Avatar URL</Label>
                    <Input 
                      id="avatar-url"
                      placeholder="https://github.com/username.png"
                      className="h-11 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:ring-indigo-500"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </div>

                  <Separator className="bg-slate-100 dark:bg-zinc-800" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Security</h3>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Two-Factor Authentication</p>
                          <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                        </div>
                      </div>
                      <Button variant="outline" disabled size="sm" type="button" className="text-xs border-slate-200 dark:border-zinc-800">
                        Enabled
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50/50 dark:bg-zinc-900/30 border-t border-slate-100 dark:border-zinc-800 p-6 flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isUpdating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
