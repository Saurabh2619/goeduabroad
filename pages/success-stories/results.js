import { Spacer, Card, CardHeader, CardBody } from "@nextui-org/react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { supabase } from "../../utils/supabaseClient";
import "tailwindcss/tailwind.css";


export default function Results({ data, clgForms }) {
  return (
    <DefaultLayout>
      <Spacer y={48} />

      <div className="w-full h-auto flex flex-col items-start justify-start">
        <div className="mx-auto max-w-[95%] md:max-w-[85%] w-full">

          {/* Offer Letters Section */}
          <div className="text-4xl from-primary font-heading to-red-900 bg-gradient-to-r text-white text-center w-full p-4 py-12 rounded-xl mb-6">
            Offer Letters Received
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {clgForms && clgForms.map((item) => (
              <img
                key={item.id}
                src={item.imgs}
                alt="College Form"
                className="w-full h-auto object-contain rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              />
            ))}
          </div>

          {/* Results Section */}
          <div className="text-4xl from-primary font-heading to-red-900 bg-gradient-to-r text-white text-center w-full p-4 py-12 rounded-xl">
            Success Stories : Our Results
          </div>

          <div className="w-full flex flex-row flex-wrap my-4">
            {data && data.map((i, d) => (
              <div
                key={d}
                className="flex-[100%] sm:flex-[50%] md:flex-[33.3%] !flex-grow-0 lg:flex-[16.5%] p-2"
              >
                <Card className="font-sans">
                  <CardHeader className="relative">
                    <img
                      className="rounded-md aspect-square object-cover"
                      src={i.image ?? 'https://static.toiimg.com/photo/62192417.cms'}
                    />
                    <div className="w-12 h-12 border-2 flex flex-col justify-center items-center text-xl border-white bg-primary text-white shadow-md shadow-primary rounded-full px-4 absolute right-0 font-sans font-bold -rotate-[15deg] top-0">
                      {parseFloat(i.description)}
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <h2 className="font-sans text-xl font-bold text-primary">{i.title}</h2>
                    <p className="text-gray-700">{i.description}</p>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>

          <h2 className="text-gray-500 text-lg font-sans">and many more...</h2>
        </div>
      </div>

      <Spacer y={48} />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  // Fetch results (content table)
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("type", "results")
    .order("description", { ascending: false })
    .gt("description", 7);

  // Fetch college form images (clg_form table)
  const { data: clgForms, error: clgError } = await supabase
    .from("clg_form")
    .select("id, imgs");

  if (error || clgError) {
    return { notFound: true };
  }

  return { props: { data: data || [], clgForms: clgForms || [] } };
}
