import { FC, PropsWithChildren } from "react";
import { EnvelopTable } from "./envelopTable";
import { addOrUpdateEnvelop } from "@/app/actions/addOrUpdateEnvelop";
import { deleteEnvelop } from "@/app/actions/deleteEnvelop";


const EnvelopsPage : FC= async ({}) => {
    return <EnvelopTable createOrUpdateEnvelopAction={addOrUpdateEnvelop} deleteEnvelop={deleteEnvelop} />
}

export default EnvelopsPage;