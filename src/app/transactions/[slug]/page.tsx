import { use } from "react";

const Transactions = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);

  return (
      <section className="container mx-auto px-4 min-h-screen">
         
      </section>
  );
};

export default Transactions;
