'use client';

import { useTranslation } from "react-i18next";

export default function Loading()
{
    const { t } = useTranslation();

    return (
        <div className="flex h-full items-center justify-center">
            <div className="text-yellow-500 dark:text-yellow-400 text-4xl font-bold">{t("loading")}...</div>
        </div>
    );
}