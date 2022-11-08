import { useTranslation } from "react-i18next";

const PortfolioPage = () => {
  const { t } = useTranslation('common', { keyPrefix: 'general' });
  return <div>{t("comingSoon")}</div>;
};

export default PortfolioPage;
