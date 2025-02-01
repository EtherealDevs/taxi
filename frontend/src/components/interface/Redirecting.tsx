'use client';

import { useTranslation } from "react-i18next";

export default function Redirecting()
{
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center">
                <div className="text-red-500 text-4xl font-bold">{t("redirecting")}...</div>
            </div>
    );
}