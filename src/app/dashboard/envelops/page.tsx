import { FC, PropsWithChildren } from "react";
import { EnvelopTable } from "./envelopTable";
import { addOrUpdateEnvelop } from "@/app/actions/addOrUpdateEnvelop";


const EnvelopsPage : FC= async ({}) => {
    return <EnvelopTable createOrUpdateEnvelopAction={addOrUpdateEnvelop}/>
}

export default EnvelopsPage;