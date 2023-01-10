import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { APIPropertiesToken } from "src/types";

const handler: NextApiHandler = async (req: NextApiRequest,res: NextApiResponse) => {
    try{

        const response = await fetch("https://api.realt.community/v1/token",
            // {
            //     method: "GET",
            //     headers: {
            //         "X-AUTH-REALT-TOKEN": "2da61f00-preprod-1974-d363-d032fa8edeae"
            //     }
            // }
        );
  
        if(response.ok){
            const responseJson: APIPropertiesToken[] = await response.json();
            res.status(200).json(responseJson);
        }else{
            res.status(500).json({error: "Failed to fetch properties"});
        }   
  
      }catch(err){
        console.log(err);
        res.status(500);
      }
}

export default handler;