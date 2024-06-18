"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { FC } from "react";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Moon, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SettingCard: FC = () => {
    const { setTheme, theme } = useTheme();
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            return;
        }
        setTheme("light");
    }
    return <div className="flex items-center gap-4 last:mb-4">
        <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
                UI Theme
            </p>
        </div>
        <div className="ml-auto font-medium"><div className="flex items-center space-x-2">
            <Label><Moon /></Label>
            <Switch id="airplane-mode" checked={theme === "light" ?? false} onCheckedChange={toggleTheme} />
            <Label><Sun /></Label>
        </div></div>
    </div>
}
const SettingsPage: FC = () => {

    return (
        <div className="grid grid-cols-1 gap-4 ">
            <div>Settings <Separator /></div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <SettingCard />
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;