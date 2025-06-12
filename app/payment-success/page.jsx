"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("processing");
  const router = useRouter();

  useEffect(() => {
    const updateCreditsAndRedirect = async () => {
      try {
        if (!email || !amount) {
          throw new Error("Missing payment information");
        }

        // Update credits in database
        const res = await fetch("/api/add-credits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: decodeURIComponent(email),
            amount: Number(amount) * 100, // Convert to subcurrency
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update credits");

        setStatus("success");
        toast.success("Payment successful! Credits added to your account.");

        // Wait 2 seconds then redirect to auth
        setTimeout(() => {
          router.push("/auth");
        }, 2000);
      } catch (err) {
        console.error("Error updating credits:", err);
        setStatus("error");
        toast.error(
          "Payment received but failed to update credits. Please contact support."
        );

        // Still redirect to auth even if credits update fails
        setTimeout(() => {
          router.push("/auth");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    if (amount && email) {
      updateCreditsAndRedirect();
    } else {
      setStatus("error");
      setLoading(false);
      toast.error("Invalid payment information");
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    }
  }, [amount, email, router]);

  return (
    <main className='flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-purple-500 text-white'>
      <Card className='p-6 w-full max-w-md shadow-lg text-center'>
        <CardContent>
          {loading && (
            <>
              <div className='flex items-center justify-center mb-4'>
                <div
                  className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white'
                  role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
              <h1 className='text-2xl font-bold mb-2'>Processing Payment...</h1>
              <p className='text-sm'>
                Please wait while we update your account.
              </p>
            </>
          )}

          {!loading && status === "success" && (
            <>
              <div className='text-green-500 text-6xl mb-4'>✓</div>
              <h1 className='text-3xl font-bold mb-4'>Payment Successful!</h1>
              <p className='text-lg mb-2'>Amount: ${amount}</p>
              <p className='text-sm mb-4'>
                Credits have been added to your account.
              </p>
              <p className='text-sm'>Redirecting to login...</p>
            </>
          )}

          {!loading && status === "error" && (
            <>
              <div className='text-red-500 text-6xl mb-4'>⚠</div>
              <h1 className='text-3xl font-bold mb-4'>Payment Received</h1>
              <p className='text-lg mb-2'>Amount: ${amount || "N/A"}</p>
              <p className='text-sm mb-4'>
                There was an issue updating your credits. Please contact
                support.
              </p>
              <p className='text-sm'>Redirecting to login...</p>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
