"use client";
import React, { useState } from "react";
import Image from "next/image";
import { supabase } from "@/services/superbaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithProvider = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.error(`${provider} login error:`, error.message);
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.error("Login error:", error.message);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#f5f7fa] px-4'>
      <div className='w-full max-w-md bg-white shadow-xl rounded-3xl p-8'>
        <div className='flex justify-center mb-6'>
          <Image
            src='/logo.png'
            alt='AiCruiter Logo'
            width={160}
            height={80}
            className='w-40'
          />
        </div>

        <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>
          Welcome to <span className='#FE047F'>AiCruiter</span>
        </h2>
        <p className='text-sm text-gray-500 text-center mb-6'>
          Sign in to your account
        </p>

        {/* Email/Password Login */}
        <div className='space-y-4 mb-6'>
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className='w-full bg-blue-600 hover:bg-blue-700 text-white'
            onClick={handleLogin}>
            Login with Email
          </Button>
        </div>

        {/* OR separator */}
        <div className='flex items-center gap-4 my-4'>
          <div className='h-px flex-1 bg-gray-300' />
          <span className='text-sm text-gray-400'>OR</span>
          <div className='h-px flex-1 bg-gray-300' />
        </div>

        {/* Social Buttons */}
        <div className='flex justify-center gap-4'>
          <button
            onClick={() => signInWithProvider("google")}
            className='p-2 border rounded-full hover:bg-gray-100'
            title='Sign in with Google'>
            <Image
              src='/icons/google.svg'
              alt='Google'
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={() => signInWithProvider("facebook")}
            className='p-2 border rounded-full hover:bg-gray-100'
            title='Sign in with Facebook'>
            <Image
              src='/icons/facebook.svg'
              alt='Facebook'
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={() => signInWithProvider("linkedin")}
            className='p-2 border rounded-full hover:bg-gray-100'
            title='Sign in with linkedin'>
            <Image
              src='/icons/linkedin.svg'
              alt='LinkedIn'
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
