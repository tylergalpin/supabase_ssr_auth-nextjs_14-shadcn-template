"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User as UserIcon } from "lucide-react";

type Props = {};

const AccountSettings = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [changedEmail, setChangedEmail] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const initUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setUser(user);
      setChangedEmail(user?.email ?? "");
    };
    initUser();
  }, []);

  const handleResetPassword = () => {
    router.push("/password-reset");
  };

  const handleChangeEmail = async () => {
    // console.log(changedEmail);
    // const { data, error } = await supabase.auth.updateUser({
    //   email: changedEmail,
    // });
    // console.log(data, error);
    router.push("/email-reset");
  };

  return (
    <>
      <h2 className="font-bold text-4xl mb-4 text-white">Account</h2>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
          <CardDescription>Get in touch with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user?.user_metadata.picture ? (
              <Image
                src={user?.user_metadata.picture}
                alt="Beschreibung des Bildinhalts"
                width={200}
                height={200}
              />
            ) : (
              <UserIcon width={200} height={200} />
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">Name</Label>
                <Input
                  disabled
                  id="first-name"
                  placeholder="Enter your first name"
                  value={user?.user_metadata.name}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={changedEmail}
                onChange={(e) => setChangedEmail(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col flex-1 gap-4">
            <Button className="bg-blue-800" onClick={handleChangeEmail}>
              Change Email
            </Button>
            <Button onClick={handleResetPassword} className="bg-blue-800">
              Reset Password Email
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default AccountSettings;
