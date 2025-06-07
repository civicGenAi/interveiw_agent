"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/superbaseClient";
import Image from "next/image";
import React from "react";

function Login() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
        <Image
          src={"/logo1.png"}
          alt='logo'
          width={400}
          height={100}
          className='w-[180px] '
        />

        <div className='flex items-center flex-col'>
          <Image
            src={"/login.webp"}
            alt='login'
            width={600}
            height={400}
            className='w-[400px] h-[250px] rounded-2xl'
          />
          <h2 className='text-2xl font-bold mt-5'>Welcome to AiCruiter</h2>
          <p className='text-gray-500 text-center'>Sign with Google</p>
          <Button className='mt-7 w-full' onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
