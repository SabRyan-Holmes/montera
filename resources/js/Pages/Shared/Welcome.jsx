import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import DashboardContent from "./LandingPage/DashboardContent";
import ProduktivitasContent from "./LandingPage/ProduktivitasContent";
import ReportContent from "./LandingPage/ReportContent";

export default function Welcome(props) {
    const [activeTab, setActiveTab] = useState("dashboard");
    const {
        auth,
        chartSeries,
        chartCategories,
        landingStats,
        reportData,
        productivityData,
    } = props;
    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return (
                    <DashboardContent
                        chartSeries={chartSeries}
                        chartCategories={chartCategories}
                        landingStats={landingStats}
                    />
                );
            case "produktivitas":
                return (
                    <ProduktivitasContent productivityData={productivityData} />
                );
            case "laporan":
                return <ReportContent reportData={reportData} />;
            default:
                return <DashboardContent {...props} />;
        }
    };
    return (
        <GuestLayout
            title="Performance Management"
            auth={auth}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        >
            {}
            <div className="transition-opacity duration-300 ease-in-out">
                {renderContent()}
            </div>
        </GuestLayout>
    );
}
