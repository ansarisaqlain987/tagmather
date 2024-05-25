'use client';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FC, PropsWithChildren } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Envelope } from "@/generated/client";
import { addOrUpdateEnvelop } from "@/app/actions/addOrUpdateEnvelop";

interface Props {
    open: boolean;
    onOpenChange: (val: boolean) => void;
    onSubmitClick: (data: any, id?: number) => void;
}

const formSchema = z.object({
    name: z.string(),
    description: z.string()
})

export const AddOrUpdateEnvelopModal: FC<PropsWithChildren<Props>> = ({ open, onOpenChange, onSubmitClick }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    });
    const onModalStateChange = (val: boolean) => {
        onOpenChange(val);
        form.reset();
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        onSubmitClick?.(values)
        onModalStateChange(false);
    }
    return (
        <Dialog open={open} onOpenChange={onModalStateChange}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Add Envelop</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Envelop Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Envelop Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}