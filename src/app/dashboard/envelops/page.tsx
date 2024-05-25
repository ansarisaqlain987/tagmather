import { FC, PropsWithChildren } from "react";
import { EnvelopTable } from "./envelopTable";
import { getEnvelops } from "@/app/actions/getEnvelops";
import { addOrUpdateEnvelop } from "@/app/actions/addOrUpdateEnvelop";


const EnvelopsPage : FC= async ({}) => {
    const data = await getEnvelops();
    return <EnvelopTable data={data} createOrUpdateEnvelopAction={addOrUpdateEnvelop}/>
}

export default EnvelopsPage;