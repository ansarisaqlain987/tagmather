import { UserEnvelopsWithTotal } from "@/app/actions/getUserEnvelops";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface Props {
    enableViewALlButton?: boolean;
    data: UserEnvelopsWithTotal[];
}
export const EnvelopTable: FC<PropsWithChildren<Props>> = ({enableViewALlButton}) => {
    return <Card x-chunk="dashboard-01-chunk-5" className="h-full">
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Envelops</CardTitle>
            </div>
            <div className="w-[100%] flex justify-end gap-3">
                <Button asChild size="sm" >
                    <div>
                        <Plus className="h-4 w-4" />
                    </div>
                </Button>
                {enableViewALlButton && (<Button asChild size="sm">
                    <Link href="/dashboard/envelops">
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>)}
            </div>
        </CardHeader>
        <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        Olivia Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                        olivia.martin@email.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
        </CardContent>
    </Card>
}