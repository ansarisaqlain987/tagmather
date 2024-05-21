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

interface Props {
    open: boolean;
    onOpenChange: (val: boolean) => void;
    onSubmitClick: (data: any) => Promise<void>;
}

const formSchema = z.object({
    amount: z.coerce.number(),
    type: z.enum(['CREDIT', 'DEBIT']),
    description: z.string()
})

export const AddOrUpdateTransaction: FC<PropsWithChildren<Props>> = ({ open, onOpenChange, onSubmitClick }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0.00,
            type: 'DEBIT',
            description: ''
        }
    });
    const onModalStateChange = (val: boolean) => {
        onOpenChange(val);
        form.reset();
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        onSubmitClick(values)
        onModalStateChange(false);
    }
    return (
        <Dialog open={open} onOpenChange={onModalStateChange}>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Add Transaction</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Amount" {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Type" {...field} />
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
                                            <Input placeholder="Type" {...field} />
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