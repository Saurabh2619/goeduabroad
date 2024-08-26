import "tailwindcss/tailwind.css";
import { supabase } from "../utils/supabaseClient";
import { Button, Card, CardBody, CardFooter, Chip, Link, Spacer } from "@nextui-org/react";
export default function HomepageBlogs({posts}){

    function getDate(data){
        const r = new Date(data);
        return r.toDateString();
    }
    return <div className="flex flex-col items-start justify-center">

<div className="w-full flex flex-row flex-wrap items-stretch justify-center">
    {posts && posts.map((i,d)=>{

        return <div className="flex-grow-0 flex-[100%] md:flex-[50%] lg:flex-[50%] xl:flex-[25%] 2xl:flex-[25%] flex-col flex justify-center items-center font-sans p-2">
            <Card href={`/post/${i.slug}`} as={Link} className="w-full p-2">
                <img className="w-full aspect-video rounded-xl" src={i.img}/>
                <CardBody>
                    <p className="font-bold leading-tight">{i.title}</p>
                </CardBody>
                <CardFooter>
                    <Chip variant="bordered" color="primary">{getDate(i.created_at)}</Chip>
                </CardFooter>
            </Card>
        </div>
    })}
</div>
<Spacer y={4}></Spacer>
<Link href="/blogs">
<Button  className="font-sans " color="primary">View All Blogs</Button></Link>
    </div>
}

