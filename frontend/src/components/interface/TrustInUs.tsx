"use client"
import { useTranslation } from 'react-i18next';

export default function TrustInUs() {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {t('trustInUs.title')}
        </h2>
        <div className="underline-bar absolute bg-black"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('trustInUs.security.title')}</h3>
            <div className="border border-gray-300 rounded-xl p-6 space-y-4">
              <p className="text-gray-600">
                {t('trustInUs.security.description')}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('trustInUs.experience.title')}</h3>
            <div className="border border-gray-300 rounded-xl p-6 space-y-4">
              <p className="text-gray-600">
                {t('trustInUs.experience.description')}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('trustInUs.attentionToDetail.title')}</h3>
            <div className="border border-gray-300 rounded-xl p-6 space-y-4">
              <p className="text-gray-600">
                {t('trustInUs.attentionToDetail.description')}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('trustInUs.comfort.title')}</h3>
            <div className="border border-gray-300 rounded-xl p-6 space-y-4">
              <p className="text-gray-600">
                {t('trustInUs.comfort.description')}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('trustInUs.professionalism.title')}</h3>
            <div className="border border-gray-300 rounded-xl p-6 space-y-4">
              <p className="text-gray-600">
                {t('trustInUs.professionalism.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
