import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <div>
      <h2>To dashboard</h2>
      <Link href='/dashboard'>
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
