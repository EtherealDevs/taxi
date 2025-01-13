import React from 'react'

export const Dialog: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>
}

export const DialogTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => {
    return <>{children}</>
}

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                {children}
            </div>
        </div>
    )
}

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="mb-4">{children}</div>
}

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h2 className="text-lg font-semibold">{children}</h2>
}

