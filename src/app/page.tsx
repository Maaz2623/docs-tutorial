import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="bg-green-500">
      Click <Link href={`/documents/546`}>Here</Link> to go to id
    </div>
  );
};

export default HomePage;
