"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
    activeTab: string;
    setActiveTab: (tab: string) => void;
} | undefined>(undefined)

export function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
    const [activeTab, setActiveTab] = React.useState(defaultTab)

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    )
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("flex space-x-1 rounded-xl bg-blue-900/20 p-1", className)}>
            {children}
        </div>
    )
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error('TabsTrigger must be used within a Tabs component')

    const { activeTab, setActiveTab } = context

    return (
        <button
            className={cn(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                activeTab === value
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
            )}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    )
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error('TabsContent must be used within a Tabs component')

    const { activeTab } = context

    if (activeTab !== value) return null

    return <div>{children}</div>
}

