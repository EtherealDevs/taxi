"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <CollapsiblePrimitive.Content
        ref={ref}
        className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden"
        {...props}
    >
        <div className={className}>{children}</div>
    </CollapsiblePrimitive.Content>
))
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

