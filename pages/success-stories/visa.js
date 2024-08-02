import { Card, CardBody, CardHeader, Spacer } from "@nextui-org/react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { supabase } from "../../utils/supabaseClient";
import "tailwindcss/tailwind.css";

export default function Visa({data}){

    return <DefaultLayout >
        <Spacer y={48}></Spacer>
        <div className="w-full h-auto flex flex-col items-start justify-start ">
<div className="mx-auto max-w-[95%] md:max-w-[85%] w-full">

<div className="text-4xl from-primary font-heading to-red-900 bg-gradient-to-r text-white text-center w-full p-4 py-12 rounded-xl ">Our Visa Approvals</div>
            
            <div className="w-full flex flex-row flex-wrap my-4">
            {data && data?.map((i,d)=>{
                return <div className="flex-[100%] sm:flex-[50%] md:flex-[33.3%] !flex-grow-0 lg:flex-[25%] p-2">
                    <Card 
                      className="font-sans"
                    >
                        <CardHeader className="relative">
                           <img className="rounded-md aspect-video object-cover" src={i.image??'https://static.toiimg.com/photo/62192417.cms'}/> 
                           <div className="text-primary border-2 border-primary bg-white shadow-md rounded-md px-4 absolute right-4 font-sans font-bold -rotate-[15deg] bottom-3">APPROVED</div>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <h2 className="font-sans text-xl font-bold text-primary">{i.title}</h2>
                            <p className="text-gray-500">{i.description}</p>

                        </CardBody>
                    </Card>
                </div>
            })}</div>

            <h2 className="text-gray-500 text-lg font-sans">and many more...</h2>
</div>
        </div>
        <Spacer y={48}></Spacer>
    </DefaultLayout>
}



export async function getServerSideProps(){

    const {data,error} = await supabase.from('content').select('*').eq('type','visa-approval');

    if(error){
        return {notFound:true}
    }
    if(data){

    }

    return {props:{data:data}}
}